package com.nishtha.RoomEase.auth.service;

import com.nishtha.RoomEase.auth.dto.*;
import com.nishtha.RoomEase.auth.security.JwtService;
import com.nishtha.RoomEase.common.enums.VerificationMethod;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final OtpService otpService;

    private final EmailService emailService;

    private final SmsService smsService;

    private final JwtService jwtService;


    public void sendOtp(RegisterRequest request) {

        System.out.println("sendOtp() called");

        String otp = otpService.generateOtp();

        if(request.getVerificationMethod() == VerificationMethod.EMAIL) {
            otpService.saveOtp(request.getEmail(), otp);
            emailService.sendOtpEmail(request.getEmail(), otp);
        }
        else {
            otpService.saveOtp(request.getPhone(), otp);
            smsService.sendOtpSms(request.getPhone(), otp);
        }
    }

    public void register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email Already Exists");
        }

        if(userRepository.existsByPhone(request.getPhone())){
            throw new RuntimeException("Phone Already Exists");
        }

        User user =new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setGender(request.getGender());
        user.setStatus(User.UserStatus.ACTIVE);

        user.setVerified(false);

        user.setProfileCompleted(false);

        sendOtp(request);
        userRepository.save(user);
    }

    public void verify(VerifyRequest request){
        boolean valid =otpService.verifyOtp(request.getIdentifier(),request.getOtp());
        if(!valid){
            throw new RuntimeException("Invalid OTP");
        }

        User user;

        if(request.getVerificationMethod()==VerificationMethod.EMAIL){
            user = userRepository.findByEmail(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }else{
            user = userRepository.findByPhone(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        user.setVerified(true);
        userRepository.save(user);

        otpService.deleteOtp(request.getIdentifier());
    }

    public LoginResponse login(LoginRequest request) {

        User user;

        if (request.getIdentifier().contains("@")) {
            user = userRepository.findByEmail(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            user = userRepository.findByPhone(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your account first");
        }

        if (!passwordEncoder.matches(request.getPassword(),
                user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .token(token)
                .userId(user.getUserId())
                .role(user.getRole().name())
                .fullName(user.getFullName())
                .build();
    }

    public UserProfileResponse getProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(UpdateUserRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update full name
        if (request.getFullName() != null &&
                !request.getFullName().isBlank()) {

            user.setFullName(request.getFullName());
        }

        // Update phone
        if (request.getPhone() != null &&
                !request.getPhone().isBlank()) {

            user.setPhone(request.getPhone());
        }

        // Update gender
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }

        // Change password
        if (request.getNewPassword() != null &&
                !request.getNewPassword().isBlank()) {

            if (request.getCurrentPassword() == null ||
                    request.getCurrentPassword().isBlank()) {

                throw new RuntimeException("Current password is required");
            }

            if (!passwordEncoder.matches(
                    request.getCurrentPassword(),
                    user.getPasswordHash())) {

                throw new RuntimeException("Current password is incorrect");
            }

            if (request.getNewPassword().length() < 8) {
                throw new RuntimeException(
                        "Password must be at least 8 characters"
                );
            }

            user.setPasswordHash(
                    passwordEncoder.encode(request.getNewPassword())
            );
        }

        userRepository.save(user);

        return mapToProfileResponse(user);
    }

    private UserProfileResponse mapToProfileResponse(User user) {

        return UserProfileResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .gender(user.getGender())
                .role(user.getRole())
                .build();
    }

}

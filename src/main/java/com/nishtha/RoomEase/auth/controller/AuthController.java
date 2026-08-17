package com.nishtha.RoomEase.auth.controller;

import com.nishtha.RoomEase.auth.dto.*;
import com.nishtha.RoomEase.auth.service.AuthService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        authService.register(request);
        return ResponseEntity.ok("OTP Sent Successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyRequest request){
        authService.verify(request);
        return ResponseEntity.ok("Account verified successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        LoginResponse response=authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    @SecurityRequirement(name="bearerAuth")
    public ResponseEntity<UserProfileResponse> getProfile() {

        return ResponseEntity.ok(authService.getProfile());
    }

    @PutMapping("/profile")
    @SecurityRequirement(name="bearerAuth")
    public ResponseEntity<UserProfileResponse> updateProfile(@Valid @RequestBody UpdateUserRequest request) {

        return ResponseEntity.ok(authService.updateProfile(request));
    }

}

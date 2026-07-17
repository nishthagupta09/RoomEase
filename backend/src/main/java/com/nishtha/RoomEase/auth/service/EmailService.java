package com.nishtha.RoomEase.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtpEmail(String email, String otp){
        SimpleMailMessage message =new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("RoomEase OTP Verification");
        message.setText("Your OTP is "+otp+
                "\nValid for 5 minutes." +
                "\nEnter the verification code to finish signing up.");

        mailSender.send(message);
    }
}

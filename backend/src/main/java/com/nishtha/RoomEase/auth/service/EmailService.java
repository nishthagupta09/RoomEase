package com.nishtha.RoomEase.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

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

    public void sendPaymentRequestNotification(
            String ownerEmail,
            String tenantName,
            BigDecimal amount,
            String propertyName) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(ownerEmail);
        message.setSubject("New Rent Payment Request [RoomEase]");

        message.setText(
                "Hello,\n\n" +
                       "You have a new payment request from "+ tenantName + ".\n\n" +
                        "Property: " + propertyName + "\n" +
                        "Amount: ₹" + amount + "\n\n" +
                        "Please log in to RoomEase to review the payment request.\n\n" +
                        "RoomEase"
        );

        mailSender.send(message);
    }
}

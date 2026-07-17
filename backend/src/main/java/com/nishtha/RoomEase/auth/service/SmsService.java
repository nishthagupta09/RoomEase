package com.nishtha.RoomEase.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmsService {

    public void sendOtpSms(String phone, String otp){
        System.out.println("Your OTP for RoomEase Verification is: "+otp+"\nSent on "+phone);
    }
}

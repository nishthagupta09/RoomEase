package com.nishtha.RoomEase.auth.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final StringRedisTemplate redisTemplate;

    public String generateOtp(){
        String otp= String.valueOf(
                ThreadLocalRandom.current().nextInt(100000,999999)
        );
        return otp;
    }

    public void saveOtp(String identifier,String otp){

        redisTemplate.opsForValue().set(
                "OTP:"+identifier,otp, Duration.ofMinutes(5)
        );

    }

    public String getOtp(String identifier){
        return redisTemplate.opsForValue().get("OTP:"+identifier);
    }

    public boolean verifyOtp(String identifier, String otp){
        String storedOtp=redisTemplate.opsForValue().get("OTP:"+identifier);

        return otp.equals(storedOtp);
    }

    public void deleteOtp(String identifier){
        redisTemplate.delete("OTP:"+identifier);
    }

}

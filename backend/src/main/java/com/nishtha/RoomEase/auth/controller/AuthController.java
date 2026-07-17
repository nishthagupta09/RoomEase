package com.nishtha.RoomEase.auth.controller;

import com.nishtha.RoomEase.auth.dto.LoginRequest;
import com.nishtha.RoomEase.auth.dto.LoginResponse;
import com.nishtha.RoomEase.auth.dto.RegisterRequest;
import com.nishtha.RoomEase.auth.dto.VerifyRequest;
import com.nishtha.RoomEase.auth.service.AuthService;
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

}

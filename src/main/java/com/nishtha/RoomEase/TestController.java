package com.nishtha.RoomEase;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@SecurityRequirement(name="bearerAuth")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "JWT Working";
    }
}
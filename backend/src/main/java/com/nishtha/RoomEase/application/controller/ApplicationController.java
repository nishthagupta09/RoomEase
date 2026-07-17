package com.nishtha.RoomEase.application.controller;

import com.nishtha.RoomEase.application.dto.ApplicationRequest;
import com.nishtha.RoomEase.application.dto.ApplicationResponse;
import com.nishtha.RoomEase.application.service.ApplicationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<ApplicationResponse> applyForProperty(
            @RequestBody ApplicationRequest request
    ) {
        return ResponseEntity.ok(
                applicationService.applyForProperty(request)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {

        return ResponseEntity.ok(applicationService.getMyApplications()
        );
    }
}

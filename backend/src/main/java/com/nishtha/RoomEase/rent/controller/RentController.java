package com.nishtha.RoomEase.rent.controller;

import com.nishtha.RoomEase.rent.dto.RecordPaymentRequest;
import com.nishtha.RoomEase.rent.dto.RentDetailsResponse;
import com.nishtha.RoomEase.rent.dto.RentResponse;
import com.nishtha.RoomEase.rent.dto.RentSummaryResponse;
import com.nishtha.RoomEase.rent.service.RentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rent")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class RentController {

    private final RentService rentService;

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<RentResponse>> getPropertyRents(@PathVariable Long propertyId) {

        return ResponseEntity.ok(rentService.getPropertyRents(propertyId)
        );
    }

    @GetMapping("/{rentId}")
    public ResponseEntity<RentDetailsResponse> getRentDetails(@PathVariable Long rentId) {
        return ResponseEntity.ok(rentService.getRentDetails(rentId));
    }

    @PostMapping("/{rentId}/pay")
    public ResponseEntity<RentResponse> recordPayment(@PathVariable Long rentId, @RequestBody RecordPaymentRequest request) {
        return ResponseEntity.ok(rentService.recordPayment(rentId, request)
        );
    }

    @GetMapping("/property/{propertyId}/summary")
    public ResponseEntity<RentSummaryResponse> getRentSummary(@PathVariable Long propertyId) {
        return ResponseEntity.ok(rentService.getRentSummary(propertyId));
    }

    @GetMapping("/my-rent")
    public ResponseEntity<List<RentDetailsResponse>> getMyRents() {
        return ResponseEntity.ok(rentService.getMyRent());
    }
}

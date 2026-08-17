package com.nishtha.RoomEase.paymentRequest.controller;

import com.nishtha.RoomEase.paymentRequest.dto.CreatePaymentRequest;
import com.nishtha.RoomEase.paymentRequest.dto.PaymentRequestResponse;
import com.nishtha.RoomEase.paymentRequest.service.PaymentRequestService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-requests")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class PaymentRequestController {

    private final PaymentRequestService paymentRequestService;

    @PostMapping
    public ResponseEntity<PaymentRequestResponse> createPaymentRequest(@RequestBody CreatePaymentRequest request) {

        PaymentRequestResponse response = paymentRequestService.createPaymentRequest(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<PaymentRequestResponse>> getMyPaymentRequests() {

        return ResponseEntity.ok(paymentRequestService.getMyPaymentRequests());
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<PaymentRequestResponse>>
    getPaymentRequestsByProperty(@PathVariable Long propertyId) {

        return ResponseEntity.ok(paymentRequestService.getPaymentRequestsByProperty(propertyId));
    }

    @PatchMapping("/{paymentRequestId}/approve")
    public ResponseEntity<PaymentRequestResponse> approvePaymentRequest(@PathVariable Long paymentRequestId) {

        return ResponseEntity.ok(paymentRequestService.approvePaymentRequest(paymentRequestId));
    }

    @PatchMapping("/{paymentRequestId}/reject")
    public ResponseEntity<PaymentRequestResponse> rejectPaymentRequest(@PathVariable Long paymentRequestId) {

        return ResponseEntity.ok(paymentRequestService.rejectPaymentRequest(paymentRequestId));
    }

}
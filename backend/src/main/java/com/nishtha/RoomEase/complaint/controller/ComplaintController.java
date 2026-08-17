package com.nishtha.RoomEase.complaint.controller;


import com.nishtha.RoomEase.complaint.dto.ComplaintResponse;
import com.nishtha.RoomEase.complaint.dto.CreateComplaintRequest;
import com.nishtha.RoomEase.complaint.dto.UpdateComplaintRequest;
import com.nishtha.RoomEase.complaint.service.ComplaintService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class ComplaintController {

    private final ComplaintService complaintService;


    @PostMapping
    public ResponseEntity<ComplaintResponse> createComplaint(@RequestBody CreateComplaintRequest request) {
        ComplaintResponse response = complaintService.createComplaint(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints() {
        List<ComplaintResponse> complaints = complaintService.getMyComplaints();
        return ResponseEntity.ok(complaints);
    }


    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<ComplaintResponse>> getPropertyComplaints(@PathVariable Long propertyId) {
        List<ComplaintResponse> complaints = complaintService.getComplaintsForProperty(propertyId);
        return ResponseEntity.ok(complaints);
    }

    @PatchMapping("/{complaintId}")
    public ResponseEntity<ComplaintResponse> updateComplaint(@PathVariable Long complaintId, @RequestBody UpdateComplaintRequest request) {

        ComplaintResponse response = complaintService.updateComplaint(complaintId, request);
        return ResponseEntity.ok(response);
    }
}
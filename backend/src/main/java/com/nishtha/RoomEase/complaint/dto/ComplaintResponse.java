package com.nishtha.RoomEase.complaint.dto;

import com.nishtha.RoomEase.common.enums.ComplaintStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponse {

    private Long complaintId;

    // Tenant information
    private Long tenantId;
    private String tenantName;

    // Property information
    private Long propertyId;
    private String propertyName;

    // Room information
    private Long roomId;
    private String roomNo;

    // Complaint information
    private String title;
    private String description;

    private ComplaintStatus status;

    private String response;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
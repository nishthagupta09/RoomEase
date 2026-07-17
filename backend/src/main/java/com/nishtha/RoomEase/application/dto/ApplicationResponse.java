package com.nishtha.RoomEase.application.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ApplicationResponse {

    private Long appId;

    private Long propertyId;
    private String propertyName;

    private Long userId;
    private String applicantName;
    private String email;
    private String phoneNumber;

    private String preferredRoomType;
    private LocalDate expectedMoveIn;
    private String message;

    private String ownerRemark;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
}
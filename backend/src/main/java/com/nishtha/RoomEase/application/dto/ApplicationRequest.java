package com.nishtha.RoomEase.application.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ApplicationRequest {

    private Long propertyId;

    private String preferredRoomType;

    private LocalDate expectedMoveIn;

    private String message;
}
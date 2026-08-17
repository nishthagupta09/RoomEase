package com.nishtha.RoomEase.tenant.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AssignTenantRequest {

    @NotNull(message = "Bed is required")
    private Long bedId;

    @NotNull(message = "Move in date is required")
    @FutureOrPresent(message = "Move in date cannot be in the past")
    private LocalDate moveInDate;

}
package com.nishtha.RoomEase.bed.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBedRequest {

    @NotBlank(message = "Bed number is required")
    private String bedLabel;

    @NotNull(message = "Monthly rent is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Rent must be greater than 0")
    private BigDecimal monthlyRent;

}
package com.nishtha.RoomEase.property.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDashboardResponse {

    private Long totalProperties;

    private Long activeTenants;

    private Long totalBeds;

    private Long occupiedBeds;

    private Double occupancyRate;

    private BigDecimal expectedMonthlyRevenue;
}
package com.nishtha.RoomEase.rent.dto;


import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentSummaryResponse {

    private BigDecimal totalCollected;

    private BigDecimal pendingAmount;

    private BigDecimal overdueAmount;

    private Integer totalPaid;

    private Integer totalPending;

    private Integer totalOverdue;

}
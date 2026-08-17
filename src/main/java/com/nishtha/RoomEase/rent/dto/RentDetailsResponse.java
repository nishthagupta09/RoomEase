package com.nishtha.RoomEase.rent.dto;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import com.nishtha.RoomEase.common.enums.PaymentStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentDetailsResponse {

    private Long rentId;

    private Long tenantId;

    private String tenantName;

    private String email;

    private String phoneNo;

    private String roomNo;

    private String bedLabel;

    private LocalDate billingPeriod;

    private BigDecimal amountDue;

    private BigDecimal amountPaid;

    private BigDecimal lateFee;

    private LocalDate dueDate;

    private PaymentStatus paymentStatus;

    private PaymentMode paymentMode;

    private String transactionReference;

    private String remarks;

    private LocalDateTime paidOn;

    private LocalDateTime createdAt;

}
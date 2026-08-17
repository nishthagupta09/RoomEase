package com.nishtha.RoomEase.paymentRequest.dto;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import com.nishtha.RoomEase.common.enums.PaymentRequestStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestResponse {

    private Long paymentRequestId;

    private Long rentId;

    private Long tenantId;

    private String tenantName;

    private String roomNo;

    private String bedLabel;

    private BigDecimal amount;

    private PaymentMode paymentMode;

    private String transactionReference;

    private String remarks;

    private PaymentRequestStatus status;

    private LocalDateTime requestedAt;

    private LocalDateTime reviewedAt;
}
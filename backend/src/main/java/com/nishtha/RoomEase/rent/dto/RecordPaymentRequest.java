package com.nishtha.RoomEase.rent.dto;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecordPaymentRequest {

    private BigDecimal amountPaid;

    private PaymentMode paymentMode;

    private String transactionReference;

    private String remarks;

}
package com.nishtha.RoomEase.paymentRequest.dto;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePaymentRequest {

    @NotNull
    private Long rentId;

    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;

    @NotNull
    private PaymentMode paymentMode;

    private String transactionReference;

    private String remarks;
}
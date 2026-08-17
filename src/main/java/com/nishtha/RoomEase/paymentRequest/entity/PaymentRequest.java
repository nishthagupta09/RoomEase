package com.nishtha.RoomEase.paymentRequest.entity;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import com.nishtha.RoomEase.common.enums.PaymentRequestStatus;
import com.nishtha.RoomEase.rent.entity.Rent;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_requests")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_request_id")
    private Long paymentRequestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_id", nullable = false)
    private Rent rent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = false)
    private PaymentMode paymentMode;

    @Column(name = "transaction_reference")
    private String transactionReference;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentRequestStatus status;

    @Column(name = "requested_at")
    private LocalDateTime requestedAt;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
}
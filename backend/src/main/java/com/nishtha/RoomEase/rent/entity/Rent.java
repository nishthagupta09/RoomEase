package com.nishtha.RoomEase.rent.entity;

import com.nishtha.RoomEase.common.enums.PaymentMode;
import com.nishtha.RoomEase.common.enums.PaymentStatus;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "rent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rent_id")
    private Long rentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false)
    private LocalDate billingPeriod;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amountDue;

    @Column(precision = 10, scale = 2)
    private BigDecimal amountPaid;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal lateFee;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    private String transactionReference;

    private String remarks;

    private LocalDateTime paidOn;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (lateFee == null)
            lateFee = BigDecimal.ZERO;

        if (amountPaid == null)
            amountPaid = BigDecimal.ZERO;

        if (paymentStatus == null)
            paymentStatus = PaymentStatus.PENDING;

    }

    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();

    }

}
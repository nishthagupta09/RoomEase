package com.nishtha.RoomEase.rent.mapper;

import com.nishtha.RoomEase.rent.dto.RentDetailsResponse;
import com.nishtha.RoomEase.rent.dto.RentResponse;
import com.nishtha.RoomEase.rent.dto.RentSummaryResponse;
import com.nishtha.RoomEase.rent.entity.Rent;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class RentMapper {

    public RentResponse toRentResponse(Rent rent) {
        return RentResponse.builder()
                .rentId(rent.getRentId())
                .tenantId(rent.getTenant().getTenantId())
                .tenantName(rent.getTenant().getUser().getFullName())
                .roomNo(rent.getTenant().getRoom().getRoomNo())
                .bedLabel(rent.getTenant().getBed().getBedLabel())
                .billingPeriod(rent.getBillingPeriod())
                .amountDue(rent.getAmountDue())
                .amountPaid(rent.getAmountPaid())
                .lateFee(rent.getLateFee())
                .dueDate(rent.getDueDate())
                .paymentStatus(rent.getPaymentStatus())
                .paymentMode(rent.getPaymentMode())
                .transactionReference(rent.getTransactionReference())
                .remarks(rent.getRemarks())
                .paidOn(rent.getPaidOn())
                .build();
    }

    public RentDetailsResponse toRentDetailsResponse(Rent rent) {
        return RentDetailsResponse.builder()
                .rentId(rent.getRentId())
                .tenantId(rent.getTenant().getTenantId())
                .tenantName(rent.getTenant().getUser().getFullName())
                .email(rent.getTenant().getUser().getEmail())
                .phoneNo(rent.getTenant().getUser().getPhone())
                .roomNo(rent.getTenant().getRoom().getRoomNo())
                .bedLabel(rent.getTenant().getBed().getBedLabel())
                .billingPeriod(rent.getBillingPeriod())
                .amountDue(rent.getAmountDue())
                .amountPaid(rent.getAmountPaid())
                .lateFee(rent.getLateFee())
                .dueDate(rent.getDueDate())
                .paymentStatus(rent.getPaymentStatus())
                .paymentMode(rent.getPaymentMode())
                .transactionReference(rent.getTransactionReference())
                .remarks(rent.getRemarks())
                .paidOn(rent.getPaidOn())
                .createdAt(rent.getCreatedAt())
                .build();
    }

    public RentSummaryResponse toRentSummaryResponse(
            BigDecimal totalCollected,
            BigDecimal pendingAmount,
            BigDecimal overdueAmount,
            Integer totalPaid,
            Integer totalPending,
            Integer totalOverdue) {

        return RentSummaryResponse.builder()
                .totalCollected(totalCollected)
                .pendingAmount(pendingAmount)
                .overdueAmount(overdueAmount)
                .totalPaid(totalPaid)
                .totalPending(totalPending)
                .totalOverdue(totalOverdue)
                .build();
    }
}
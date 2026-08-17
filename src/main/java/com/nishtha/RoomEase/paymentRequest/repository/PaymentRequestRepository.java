package com.nishtha.RoomEase.paymentRequest.repository;

import com.nishtha.RoomEase.common.enums.PaymentRequestStatus;
import com.nishtha.RoomEase.paymentRequest.entity.PaymentRequest;
import com.nishtha.RoomEase.rent.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PaymentRequestRepository
        extends JpaRepository<PaymentRequest, Long> {

    List<PaymentRequest> findByTenant_TenantId(Long tenantId);

    List<PaymentRequest> findByTenant_Property_PropertyIdOrderByRequestedAtDesc(Long propertyId);

    List<PaymentRequest> findByTenant_TenantIdOrderByRequestedAtDesc(Long tenantId);

    Optional<PaymentRequest> findByRentAndStatus(
            Rent rent,
            PaymentRequestStatus status
    );
}
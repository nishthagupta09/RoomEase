package com.nishtha.RoomEase.rent.repository;

import com.nishtha.RoomEase.common.enums.PaymentStatus;
import com.nishtha.RoomEase.rent.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {

    List<Rent> findByTenant_Property_PropertyId(Long propertyId);

    List<Rent> findByTenant_TenantIdOrderByBillingPeriodDesc(Long tenantId);

    Optional<Rent> findByRentId(Long rentId);

    boolean existsByTenant_TenantIdAndBillingPeriod(Long tenantId, LocalDate billingPeriod);

    List<Rent> findByPaymentStatusIn(List<PaymentStatus> statuses);
}
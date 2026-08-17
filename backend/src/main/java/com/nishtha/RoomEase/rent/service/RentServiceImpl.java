package com.nishtha.RoomEase.rent.service;

import com.nishtha.RoomEase.common.enums.PaymentStatus;
import com.nishtha.RoomEase.common.enums.TenantStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.rent.dto.RecordPaymentRequest;
import com.nishtha.RoomEase.rent.dto.RentDetailsResponse;
import com.nishtha.RoomEase.rent.dto.RentResponse;
import com.nishtha.RoomEase.rent.dto.RentSummaryResponse;
import com.nishtha.RoomEase.rent.entity.Rent;
import com.nishtha.RoomEase.rent.mapper.RentMapper;
import com.nishtha.RoomEase.rent.repository.RentRepository;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import com.nishtha.RoomEase.tenant.repository.TenantRepository;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RentServiceImpl implements RentService {

    private final RentRepository rentRepository;
    private final RentMapper rentMapper;
    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;

    @Override
    public List<RentResponse> getPropertyRents(Long propertyId) {

        List<Rent> rents = rentRepository.findByTenant_Property_PropertyId(propertyId);

        return rents.stream()
                .map(rentMapper::toRentResponse)
                .toList();
    }

    @Override
    public RentDetailsResponse getRentDetails(Long rentId) {

        Rent rent = rentRepository.findById(rentId)
                .orElseThrow(() -> new RuntimeException("Rent record not found with id: " + rentId));

        return rentMapper.toRentDetailsResponse(rent);
    }

    @Override
    public RentResponse recordPayment(Long rentId, RecordPaymentRequest request) {

        Rent rent = rentRepository.findById(rentId)
                .orElseThrow(() ->
                        new RuntimeException("Rent record not found with id: " + rentId));

        BigDecimal amountPaid = request.getAmountPaid();

        if (amountPaid == null || amountPaid.compareTo(BigDecimal.ZERO) < 0) {

            throw new IllegalArgumentException("Amount paid cannot be negative.");
        }

        if (amountPaid.compareTo(rent.getAmountDue()) > 0) {

            throw new IllegalArgumentException("Amount paid cannot exceed amount due.");
        }

        rent.setAmountPaid(amountPaid);
        rent.setPaymentMode(request.getPaymentMode());
        rent.setTransactionReference(request.getTransactionReference());
        rent.setRemarks(request.getRemarks());
        rent.setPaidOn(LocalDateTime.now());

        if (amountPaid.compareTo(BigDecimal.ZERO) == 0) {

            rent.setPaymentStatus(PaymentStatus.PENDING);

        } else if (amountPaid.compareTo(rent.getAmountDue()) < 0) {

            rent.setPaymentStatus(PaymentStatus.PARTIAL);

        } else {

            rent.setPaymentStatus(PaymentStatus.PAID);
        }

        Rent savedRent = rentRepository.save(rent);

        return rentMapper.toRentResponse(savedRent);
    }

    @Override
    public RentSummaryResponse getRentSummary(Long propertyId) {

        List<Rent> rents = rentRepository.findByTenant_Property_PropertyId(propertyId);

        BigDecimal totalCollected = BigDecimal.ZERO;
        BigDecimal pendingAmount = BigDecimal.ZERO;
        BigDecimal overdueAmount = BigDecimal.ZERO;

        int totalPaid = 0;
        int totalPending = 0;
        int totalOverdue = 0;

        LocalDate today = LocalDate.now();

        for (Rent rent : rents) {

            switch (rent.getPaymentStatus()) {

                case PAID -> {
                    totalCollected = totalCollected.add(rent.getAmountPaid());
                    totalPaid++;
                }

                case PARTIAL -> {
                    BigDecimal amountPaid = rent.getAmountPaid() != null
                            ? rent.getAmountPaid()
                            : BigDecimal.ZERO;

                    BigDecimal remaining = rent.getAmountDue().subtract(amountPaid);

                    // Money already received
                    totalCollected = totalCollected.add(amountPaid);

                    // Money still due
                    pendingAmount = pendingAmount.add(remaining);
                }

                case PENDING -> {
                    pendingAmount = pendingAmount.add(rent.getAmountDue());
                }

                case OVERDUE -> {
                    BigDecimal amountPaid = rent.getAmountPaid() != null
                            ? rent.getAmountPaid()
                            : BigDecimal.ZERO;

                    BigDecimal remaining = rent.getAmountDue().subtract(amountPaid);

                    // Money already received
                    totalCollected = totalCollected.add(amountPaid);

                    // Remaining unpaid money is overdue
                    overdueAmount = overdueAmount.add(remaining);

                    totalOverdue++;
                }
            }
        }

        return rentMapper.toRentSummaryResponse(
                totalCollected,
                pendingAmount,
                overdueAmount,
                totalPaid,
                totalPending,
                totalOverdue
        );
    }

    @Override
    public void updateOverdueRents() {

        List<Rent> rents = rentRepository.findByPaymentStatusIn(
                List.of(
                        PaymentStatus.PENDING,
                        PaymentStatus.PARTIAL
                )
        );

        LocalDate today = LocalDate.now();

        for (Rent rent : rents) {
            if (today.isAfter(rent.getDueDate())) {
                rent.setPaymentStatus(PaymentStatus.OVERDUE);
            }
        }
        rentRepository.saveAll(rents);
    }

    @Override
    @Transactional
    public void generateMonthlyRent() {

        List<Property> properties = propertyRepository.findAll();

        for (Property property : properties) {
            generateMonthlyRentForProperty(property);
        }

    }

    private void generateMonthlyRentForProperty(Property property) {

        List<Tenant> tenants = tenantRepository.findByPropertyAndStatus(
                        property,
                        TenantStatus.ACTIVE
                );

        LocalDate billingPeriod = LocalDate.now().withDayOfMonth(1);

        List<Rent> rentsToSave = new ArrayList<>();

        for (Tenant tenant : tenants) {

            boolean exists = rentRepository.existsByTenant_TenantIdAndBillingPeriod(
                    tenant.getTenantId(),
                    billingPeriod
            );

            if (exists) {
                continue;
            }

            Rent rent = new Rent();

            rent.setTenant(tenant);

            rent.setBillingPeriod(billingPeriod);

            rent.setAmountDue(tenant.getBed().getMonthlyRent());

            rent.setAmountPaid(BigDecimal.ZERO);

            rent.setLateFee(BigDecimal.ZERO);

            rent.setDueDate(billingPeriod.withDayOfMonth(10));

            rent.setPaymentStatus(PaymentStatus.PENDING);

            rentsToSave.add(rent);

        }

        if (!rentsToSave.isEmpty()) {
            rentRepository.saveAll(rentsToSave);
        }

    }

    @Override
    public List<RentDetailsResponse> getMyRent() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("You are not currently staying in a PG"));

        List<Rent> rents = rentRepository.findByTenant_TenantIdOrderByBillingPeriodDesc(tenant.getTenantId());

        return rents.stream()
                .map(rentMapper::toRentDetailsResponse)
                .toList();
    }

}

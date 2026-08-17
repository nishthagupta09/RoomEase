package com.nishtha.RoomEase.paymentRequest.service;

import com.nishtha.RoomEase.auth.service.EmailService;
import com.nishtha.RoomEase.common.enums.PaymentRequestStatus;
import com.nishtha.RoomEase.common.enums.PaymentStatus;
import com.nishtha.RoomEase.common.enums.TenantStatus;
import com.nishtha.RoomEase.paymentRequest.dto.CreatePaymentRequest;
import com.nishtha.RoomEase.paymentRequest.dto.PaymentRequestResponse;
import com.nishtha.RoomEase.paymentRequest.entity.PaymentRequest;
import com.nishtha.RoomEase.paymentRequest.repository.PaymentRequestRepository;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.rent.entity.Rent;
import com.nishtha.RoomEase.rent.repository.RentRepository;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import com.nishtha.RoomEase.tenant.repository.TenantRepository;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentRequestServiceImpl implements PaymentRequestService {

    private final PaymentRequestRepository paymentRequestRepository;
    private final RentRepository rentRepository;
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public PaymentRequestResponse createPaymentRequest(CreatePaymentRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("You are not currently staying in a PG."));

        Rent rent = rentRepository
                .findById(request.getRentId())
                .orElseThrow(() -> new RuntimeException("Rent record not found"));

        if (!rent.getTenant()
                .getTenantId()
                .equals(tenant.getTenantId())) {
            throw new RuntimeException("You cannot pay another tenant's rent.");
        }

        if (rent.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException("This rent has already been paid.");
        }

        paymentRequestRepository
                .findByRentAndStatus(rent, PaymentRequestStatus.PENDING)
                .ifPresent(existing -> {
                    throw new RuntimeException("A payment request is already pending approval.");
                });

        PaymentRequest paymentRequest = PaymentRequest.builder()
                        .rent(rent)
                        .tenant(tenant)
                        .amount(request.getAmount())
                        .paymentMode(request.getPaymentMode())
                        .transactionReference(request.getTransactionReference())
                        .remarks(request.getRemarks())
                        .status(PaymentRequestStatus.PENDING)

                        .requestedAt(LocalDateTime.now())
                        .build();

        paymentRequest = paymentRequestRepository.save(paymentRequest);

        try {
            User owner = tenant
                    .getProperty()
                    .getOwner();
            emailService.sendPaymentRequestNotification(
                    owner.getEmail(),
                    user.getFullName(),
                    request.getAmount(),
                    tenant.getProperty().getPropertyName()
            );

        }
        catch (Exception e) {
            System.err.println("Failed to send payment request notification: " + e.getMessage());
        }


        return mapToResponse(paymentRequest);
    }

    private PaymentRequestResponse mapToResponse(PaymentRequest paymentRequest) {

        return PaymentRequestResponse.builder()
                .paymentRequestId(paymentRequest.getPaymentRequestId())
                .rentId(paymentRequest.getRent().getRentId())
                .tenantId(paymentRequest.getTenant().getTenantId())
                .tenantName(paymentRequest.getTenant().getUser().getFullName())
                .roomNo(paymentRequest.getTenant().getRoom().getRoomNo())
                .bedLabel(paymentRequest.getTenant().getBed().getBedLabel())
                .amount(paymentRequest.getAmount())
                .paymentMode(paymentRequest.getPaymentMode())
                .transactionReference(paymentRequest.getTransactionReference())
                .remarks(paymentRequest.getRemarks())
                .status(paymentRequest.getStatus())
                .requestedAt(paymentRequest.getRequestedAt())
                .reviewedAt(paymentRequest.getReviewedAt())
                .build();
    }

    @Override
    public List<PaymentRequestResponse> getMyPaymentRequests() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        List<PaymentRequest> requests =
                paymentRequestRepository.findByTenant_TenantIdOrderByRequestedAtDesc(
                        tenant.getTenantId()
                );

        return requests.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<PaymentRequestResponse> getPaymentRequestsByProperty(Long propertyId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getOwner().getUserId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        return paymentRequestRepository
                .findByTenant_Property_PropertyIdOrderByRequestedAtDesc(propertyId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public PaymentRequestResponse approvePaymentRequest(Long paymentRequestId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        PaymentRequest request = paymentRequestRepository.findById(paymentRequestId)
                .orElseThrow(() -> new RuntimeException("Payment request not found"));

        // Check that this payment request belongs to the owner's property
        if (!request.getTenant()
                .getProperty()
                .getOwner()
                .getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException("Unauthorized");
        }

        // Prevent approving the same request twice
        if (request.getStatus() != PaymentRequestStatus.PENDING) {
            throw new RuntimeException("Payment request has already been reviewed");
        }

        Rent rent = request.getRent();

        // Get amount already paid
        BigDecimal currentAmountPaid =
                rent.getAmountPaid() != null
                        ? rent.getAmountPaid()
                        : BigDecimal.ZERO;

        // Add newly approved payment
        BigDecimal newAmountPaid = currentAmountPaid.add(request.getAmount());

        // Safety check
        if (newAmountPaid.compareTo(rent.getAmountDue()) > 0) {
            throw new RuntimeException(
                    "Payment exceeds the remaining rent amount"
            );
        }

        rent.setAmountPaid(newAmountPaid);

        rent.setPaymentMode(request.getPaymentMode());

        rent.setTransactionReference(request.getTransactionReference());

        // Decide whether rent is fully or partially paid
        if (newAmountPaid.compareTo(rent.getAmountDue()) >= 0) {

            rent.setPaymentStatus(PaymentStatus.PAID);

            rent.setPaidOn(LocalDateTime.now());

        } else {

            rent.setPaymentStatus(PaymentStatus.PARTIAL);

            rent.setPaidOn(null);
        }

        rentRepository.save(rent);

        // Mark the request itself as approved
        request.setStatus(PaymentRequestStatus.APPROVED);

        paymentRequestRepository.save(request);

        return mapToResponse(request);
    }
    @Override
    @Transactional
    public PaymentRequestResponse rejectPaymentRequest(Long paymentRequestId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        PaymentRequest request = paymentRequestRepository.findById(paymentRequestId)
                .orElseThrow(() -> new RuntimeException("Payment request not found"));

        if (!request.getTenant()
                .getProperty()
                .getOwner()
                .getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException("Unauthorized");
        }

        request.setStatus(PaymentRequestStatus.REJECTED);

        paymentRequestRepository.save(request);

        return mapToResponse(request);
    }
}
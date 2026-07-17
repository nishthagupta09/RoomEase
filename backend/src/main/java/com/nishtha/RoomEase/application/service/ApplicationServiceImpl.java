package com.nishtha.RoomEase.application.service;

import com.nishtha.RoomEase.application.dto.ApplicationRequest;
import com.nishtha.RoomEase.application.dto.ApplicationResponse;
import com.nishtha.RoomEase.application.entity.Application;
import com.nishtha.RoomEase.application.repository.ApplicationRepository;
import com.nishtha.RoomEase.common.enums.ApplicationStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.property.service.PropertyService;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PropertyService propertyService;

    @Override
    public ApplicationResponse applyForProperty(ApplicationRequest request) {
        User tenant = getCurrentUser();

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));

        if (applicationRepository.existsByUserAndPropertyAndStatus(
                tenant,
                property,ApplicationStatus.PENDING)) {

            throw new RuntimeException("You already have a pending application.");
        }

        Application application = buildApplication(request, tenant, property);

        application = applicationRepository.save(application);

        return mapToResponse(application);
    }

    private User getCurrentUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String userId = authentication.getName();

        return userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Application buildApplication(
            ApplicationRequest request,
            User tenant,
            Property property
    ) {
        return Application.builder()
                .user(tenant)
                .property(property)
                .preferredRoomType(request.getPreferredRoomType())
                .expectedMoveIn(request.getExpectedMoveIn())
                .message(request.getMessage())
                .status(ApplicationStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .reviewedAt(LocalDateTime.now())
                .build();
    }

    private ApplicationResponse mapToResponse(Application application) {

        return ApplicationResponse.builder()
                .appId(application.getAppId())
                .propertyId(application.getProperty().getPropertyId())
                .propertyName(application.getProperty().getPropertyName())
                .preferredRoomType(application.getPreferredRoomType())
                .expectedMoveIn(application.getExpectedMoveIn())
                .message(application.getMessage())
                .status(application.getStatus().toString())
                .ownerRemark(application.getOwnerRemark())
                .createdAt(application.getCreatedAt())
                .reviewedAt(application.getReviewedAt())
                .userId(application.getUser().getUserId())
                .applicantName(application.getUser().getFullName())
                .email(application.getUser().getEmail())
                .phoneNumber(application.getUser().getPhone())
                .build();
    }

    @Override
    public List<ApplicationResponse> getMyApplications() {

        User tenant = getCurrentUser();

        List<Application> applications = applicationRepository.findByUser(tenant);

        return applications.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ApplicationResponse> getApplicationsForProperty(Long propertyId) {

        Property property = propertyService.getOwnerProperty(propertyId);

        List<Application> applications = applicationRepository.findByProperty(property);

        return applications.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ApplicationResponse approveApplication(Long applicationId, String ownerRemark) {
        return null;
    }

    @Override
    public ApplicationResponse rejectApplication(Long applicationId, String ownerRemark) {
        return null;
    }
}
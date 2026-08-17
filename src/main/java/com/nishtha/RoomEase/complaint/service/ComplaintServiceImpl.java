package com.nishtha.RoomEase.complaint.service;


import com.nishtha.RoomEase.common.enums.ComplaintStatus;
import com.nishtha.RoomEase.common.enums.TenantStatus;
import com.nishtha.RoomEase.complaint.dto.ComplaintResponse;
import com.nishtha.RoomEase.complaint.dto.CreateComplaintRequest;
import com.nishtha.RoomEase.complaint.dto.UpdateComplaintRequest;
import com.nishtha.RoomEase.complaint.entity.Complaint;
import com.nishtha.RoomEase.complaint.repository.ComplaintRepository;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import com.nishtha.RoomEase.tenant.repository.TenantRepository;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;


    @Override
    public ComplaintResponse createComplaint(CreateComplaintRequest request) {

        User user = getCurrentUser();

        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() ->
                        new RuntimeException(
                                "You are not currently staying in a PG."
                        )
                );

        Complaint complaint = new Complaint();

        complaint.setTenant(tenant);
        complaint.setRoom(tenant.getRoom());

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());

        complaint.setStatus(ComplaintStatus.OPEN);

        // response remains null until owner responds
        complaint.setResponse(null);

        Complaint savedComplaint = complaintRepository.save(complaint);

        return mapToResponse(savedComplaint);
    }

    @Override
    public List<ComplaintResponse> getMyComplaints() {

        User user = getCurrentUser();

        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() ->
                        new RuntimeException(
                                "You are not currently staying in a PG."
                        )
                );

        List<Complaint> complaints =
                complaintRepository
                        .findByTenant_TenantIdOrderByCreatedAtDesc(
                                tenant.getTenantId()
                        );

        return complaints.stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // OWNER: Get complaints for one property
    // =========================================================

    @Override
    public List<ComplaintResponse> getComplaintsForProperty(
            Long propertyId
    ) {

        User owner = getCurrentUser();

        Property property = propertyRepository
                .findById(propertyId)
                .orElseThrow(() ->
                        new RuntimeException("Property not found.")
                );

        if (!property.getOwner().getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException(
                    "You are not authorized to view complaints for this property."
            );
        }


        List<Complaint> complaints =
                complaintRepository
                        .findByTenant_Property_PropertyIdOrderByCreatedAtDesc(
                                propertyId
                        );

        return complaints.stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // OWNER: Update complaint
    // =========================================================

    @Override
    public ComplaintResponse updateComplaint(
            Long complaintId,
            UpdateComplaintRequest request
    ) {

        User owner = getCurrentUser();

        Complaint complaint = complaintRepository
                .findById(complaintId)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found.")
                );

        Property property =
                complaint.getTenant().getProperty();

        if (!property.getOwner().getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException(
                    "You are not authorized to update this complaint."
            );
        }


        if (request.getStatus() != null) {
            complaint.setStatus(request.getStatus());
        }


        if (request.getResponse() != null) {
            complaint.setResponse(request.getResponse());
        }


        Complaint updatedComplaint =
                complaintRepository.save(complaint);


        return mapToResponse(updatedComplaint);
    }

    private ComplaintResponse mapToResponse(
            Complaint complaint
    ) {

        Tenant tenant = complaint.getTenant();

        Property property = tenant.getProperty();

        Room room = complaint.getRoom();


        return ComplaintResponse.builder()

                .complaintId(
                        complaint.getComplaintId()
                )

                .tenantId(
                        tenant.getTenantId()
                )

                .tenantName(
                        tenant.getUser().getFullName()
                )

                .propertyId(
                        property.getPropertyId()
                )

                .propertyName(
                        property.getPropertyName()
                )

                .roomId(
                        room.getRoomId()
                )

                .roomNo(
                        room.getRoomNo()
                )

                .title(
                        complaint.getTitle()
                )

                .description(
                        complaint.getDescription()
                )

                .status(
                        complaint.getStatus()
                )

                .response(
                        complaint.getResponse()
                )

                .createdAt(
                        complaint.getCreatedAt()
                )

                .updatedAt(
                        complaint.getUpdatedAt()
                )

                .build();
    }


    private User getCurrentUser() {

        Authentication authentication = SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        Long userId = Long.parseLong(authentication.getName());


        return userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );
    }
}
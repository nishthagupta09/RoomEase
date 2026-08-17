package com.nishtha.RoomEase.tenant.service;

import com.nishtha.RoomEase.application.entity.Application;
import com.nishtha.RoomEase.application.repository.ApplicationRepository;
import com.nishtha.RoomEase.bed.entity.Bed;
import com.nishtha.RoomEase.bed.repository.BedRepository;
import com.nishtha.RoomEase.common.enums.ApplicationStatus;
import com.nishtha.RoomEase.common.enums.BedStatus;
import com.nishtha.RoomEase.common.enums.TenantStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.room.repository.RoomRepository;
import com.nishtha.RoomEase.tenant.dto.AssignTenantRequest;
import com.nishtha.RoomEase.tenant.dto.TenantPGResponse;
import com.nishtha.RoomEase.tenant.dto.TenantResponse;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import com.nishtha.RoomEase.tenant.repository.TenantRepository;
import com.nishtha.RoomEase.tenant.service.TenantService;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final ApplicationRepository applicationRepository;
    private final BedRepository bedRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;

    @Override
    @Transactional
    public TenantResponse assignTenant(Long applicationId, AssignTenantRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getProperty()
                .getOwner()
                .getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException("You are not authorized to assign this application."
            );
        }

        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new RuntimeException("Only approved applications can be assigned");
        }


        Bed bed = bedRepository.findById(request.getBedId())
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        Room room = bed.getRoom();

        if (!bed.getRoom()
                .getProperty()
                .getOwner()
                .getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException("You cannot assign a bed from another owner's property."
            );
        }
        if (bed.getStatus() != BedStatus.AVAILABLE) {
            throw new RuntimeException("Bed is already occupied");
        }

        if (room.getCurrOccupancy() >= room.getCapacity()) {
            throw new RuntimeException("Room is already full");
        }

        if (!application.getProperty()
                .getPropertyId()
                .equals(bed.getRoom()
                        .getProperty()
                        .getPropertyId())) {

            throw new RuntimeException(
                    "The selected bed does not belong to this property."
            );
        }

        tenantRepository.findByUserAndStatus(application.getUser(), TenantStatus.ACTIVE).ifPresent(tenant ->
        {throw new RuntimeException("Tenant is already assigned");});

        Tenant tenant = Tenant.builder()
                .user(application.getUser())
                .application(application)
                .property(application.getProperty())
                .room(room)
                .bed(bed)
                .moveInDate(request.getMoveInDate())
                .monthlyRent(bed.getMonthlyRent())
                .status(TenantStatus.ACTIVE)
                .build();

        bed.setStatus(BedStatus.OCCUPIED);
        application.setStatus(ApplicationStatus.ASSIGNED);

        room.setCurrOccupancy(room.getCurrOccupancy() + 1);

        tenantRepository.save(tenant);
        bedRepository.save(bed);
        applicationRepository.save(application);
        roomRepository.save(room);

        return mapToResponse(tenant);
    }

    private TenantResponse mapToResponse(Tenant tenant) {

        return TenantResponse.builder()
                .tenantId(tenant.getTenantId())
                .userId(tenant.getUser().getUserId())
                .tenantName(tenant.getUser().getFullName())
                .applicationId(tenant.getApplication().getAppId())
                .propertyId(tenant.getProperty().getPropertyId())
                .roomId(tenant.getRoom().getRoomId())
                .roomNo(tenant.getRoom().getRoomNo())
                .bedId(tenant.getBed().getBedId())
                .bedLabel(tenant.getBed().getBedLabel())
                .phoneNo(tenant.getUser().getPhone())
                .email(tenant.getUser().getEmail())
                .moveInDate(tenant.getMoveInDate())
                .moveOutDate(tenant.getMoveOutDate())
                .monthlyRent(tenant.getMonthlyRent())
                .status(tenant.getStatus())
                .build();
    }

    @Override
    public List<TenantResponse> getTenantsByProperty(Long propertyId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("You are not authorized to view tenants of this property.");
        }

        List<Tenant> tenants = tenantRepository.findByPropertyAndStatus(property, TenantStatus.ACTIVE);

        return tenants.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public TenantResponse vacateTenant(Long tenantId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long ownerId = Long.parseLong(authentication.getName());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        if (!tenant.getProperty()
                .getOwner()
                .getUserId()
                .equals(owner.getUserId())) {

            throw new RuntimeException("You are not authorized to vacate this tenant.");
        }

        if (tenant.getStatus() != TenantStatus.ACTIVE) {
            throw new RuntimeException("Tenant is already vacated.");
        }

        Bed bed = tenant.getBed();
        Room room = bed.getRoom();

        tenant.setStatus(TenantStatus.VACATED);
        tenant.setMoveOutDate(LocalDate.now());

        bed.setStatus(BedStatus.AVAILABLE);
        room.setCurrOccupancy(room.getCurrOccupancy() + 1);

        bedRepository.save(bed);
        tenantRepository.save(tenant);
        roomRepository.save(room);

        return mapToResponse(tenant);
    }

    @Override
    @Transactional(readOnly = true)
    public TenantPGResponse getMyPg() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = Long.parseLong(authentication.getName());

        // Get logged-in user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Find their ACTIVE tenant record
        Tenant tenant = tenantRepository
                .findByUserAndStatus(user, TenantStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("You are not currently staying in any PG."));

        // 3. Get related entities
        Property property = tenant.getProperty();
        Room room = tenant.getRoom();
        Bed bed = tenant.getBed();

        // 4. Build response
        return TenantPGResponse.builder()

                // Property
                .propertyId(property.getPropertyId())
                .propertyName(property.getPropertyName())
                .address(property.getAddress())
                .city(property.getCity())
                .state(property.getState())

                // Owner
                .ownerName(property.getOwner().getFullName())
                .ownerPhone(property.getOwner().getPhone())
                .ownerEmail(property.getOwner().getEmail())

                // Room / Bed
                .roomNo(room.getRoomNo())
                .bedLabel(bed.getBedLabel())
                .roomType(room.getCapacity())

                // Tenant stay
                .moveInDate(tenant.getMoveInDate())
                .monthlyRent(tenant.getMonthlyRent())

                .build();
    }
}
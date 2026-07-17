package com.nishtha.RoomEase.property.service;

import com.nishtha.RoomEase.auth.security.CustomUserDetailsService;
import com.nishtha.RoomEase.common.enums.PropertyStatus;
import com.nishtha.RoomEase.property.dto.PropertyResponse;
import com.nishtha.RoomEase.property.dto.RegisterPropertyRequest;
import com.nishtha.RoomEase.property.dto.UpdatePropertyRequest;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.user.entity.User;
import com.nishtha.RoomEase.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public PropertyResponse createProperty(RegisterPropertyRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userId = authentication.getName();

        Long ownerId = Long.parseLong(userId);

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = new Property();

        property.setOwner(owner);

        property.setPropertyName(request.getPropertyName());

        property.setDescription(request.getDescription());

        property.setAddress(request.getAddress());

        property.setCity(request.getCity());

        property.setState(request.getState());

        property.setPincode(request.getPincode());

        property.setContactInfo(request.getContactInfo());

        property.setGenderType(request.getGenderType());

        property.setTotalRooms(request.getTotalRooms());

        property.setMinRent(request.getMinRent());

        property.setMaxRent(request.getMaxRent());

        property.setHasWifi(request.getHasWifi());

        property.setHasFood(request.getHasFood());

        property.setHasParking(request.getHasParking());

        property.setPropertyStatus(PropertyStatus.AVAILABLE);

        Property saved = propertyRepository.save(property);

        return mapToResponse(saved);
    }

    private PropertyResponse mapToResponse(Property property) {

        PropertyResponse response = new PropertyResponse();

        response.setPropertyId(property.getPropertyId());

        response.setPropertyName(property.getPropertyName());
        response.setDescription(property.getDescription());

        response.setAddress(property.getAddress());
        response.setCity(property.getCity());
        response.setState(property.getState());
        response.setPincode(property.getPincode());

        response.setContactInfo(property.getContactInfo());
        response.setTotalRooms(property.getTotalRooms());
        response.setMinRent(property.getMinRent());
        response.setMaxRent(property.getMaxRent());

        response.setGenderType(property.getGenderType());
        response.setPropertyStatus(property.getPropertyStatus());

        response.setHasWifi(property.getHasWifi());
        response.setHasFood(property.getHasFood());
        response.setHasParking(property.getHasParking());

        return response;
    }

    private User getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userId = authentication.getName();

        return userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    @Override
    public Property getOwnerProperty(Long propertyId) {

        User owner = getCurrentUser();

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));

        if (!property.getOwner().getUserId().equals(owner.getUserId())) {
            throw new RuntimeException("Access Denied");
        }

        return property;
    }

    @Override
    public List<PropertyResponse> getMyProperties() {

        User owner = getCurrentUser();

        List<Property> properties =propertyRepository.findByOwner(owner);

        return properties.stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<PropertyResponse> getAllAvailableProperties() {

        List<Property> properties = propertyRepository.findByPropertyStatus(PropertyStatus.AVAILABLE);

        return properties.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PropertyResponse getProperty(Long id) {

        Property property = getOwnerProperty(id);
        return mapToResponse(property);
    }

    @Override
    public PropertyResponse getPropertyDetails(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return mapToResponse(property);
    }

    @Override
    public PropertyResponse updateProperty(Long id, UpdatePropertyRequest request) {

        Property property = getOwnerProperty(id);

        if(request.getPropertyName() != null){
            property.setPropertyName(request.getPropertyName());
        }

        if(request.getDescription() != null){
            property.setDescription(request.getDescription());
        }
        if(request.getAddress() != null){
            property.setAddress(request.getAddress());
        }
        if(request.getCity() != null){
            property.setCity(request.getCity());
        }
        if(request.getState() != null){
            property.setState(request.getState());
        }
        if(request.getPincode() != null){
            property.setPincode(request.getPincode());
        }

        if(request.getContactInfo() != null){
            property.setContactInfo(request.getContactInfo());
        }

        if(request.getGenderType() != null){
            property.setGenderType(request.getGenderType());
        }
        if(request.getTotalRooms() != null){
            property.setTotalRooms(request.getTotalRooms());
        }

        if(request.getMinRent() != null){
            property.setMinRent(request.getMinRent());
        }
        if(request.getMaxRent() != null){
            property.setMaxRent(request.getMaxRent());
        }

        if(request.getHasWifi() != null){
            property.setHasWifi(request.getHasWifi());
        }
        if(request.getHasFood() != null){
            property.setHasFood(request.getHasFood());
        }
        if(request.getHasParking() != null){
            property.setHasParking(request.getHasParking());
        }

        if(request.getPropertyStatus() != null){
            property.setPropertyStatus(request.getPropertyStatus());
        }

        Property updated = propertyRepository.save(property);

        return mapToResponse(updated);
    }

    @Override
    public void deleteProperty(Long id) {

        Property property = getOwnerProperty(id);
        propertyRepository.delete(property);
    }
}
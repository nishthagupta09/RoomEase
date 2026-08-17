package com.nishtha.RoomEase.property.service;

import com.nishtha.RoomEase.property.dto.*;
import com.nishtha.RoomEase.property.entity.Property;

import java.util.List;

public interface PropertyService {

    PropertyResponse createProperty(RegisterPropertyRequest request);

    List<PropertyResponse> getMyProperties();

    List<PropertyResponse> getAllAvailableProperties();

    PropertyResponse getProperty(Long id);

    Property getOwnerProperty(Long propertyId);

    PropertyResponse getPropertyDetails(Long id);

    PropertyResponse updateProperty(
            Long id,
            UpdatePropertyRequest request
    );

    void deleteProperty(Long id);

    List<PropertyResponse> searchProperties(PropertySearchRequest request);

    OwnerDashboardResponse getOwnerDashboard();

}
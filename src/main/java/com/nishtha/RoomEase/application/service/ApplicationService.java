package com.nishtha.RoomEase.application.service;

import com.nishtha.RoomEase.application.dto.ApplicationRequest;
import com.nishtha.RoomEase.application.dto.ApplicationResponse;

import java.util.List;

public interface ApplicationService {

    // Tenant
    ApplicationResponse applyForProperty(ApplicationRequest request);

    List<ApplicationResponse> getMyApplications();

    // Owner
    List<ApplicationResponse> getApplicationsForProperty(Long propertyId);

    ApplicationResponse approveApplication(Long applicationId, String ownerRemark);

    ApplicationResponse rejectApplication(Long applicationId, String ownerRemark);

}

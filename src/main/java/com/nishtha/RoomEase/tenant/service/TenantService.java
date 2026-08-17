package com.nishtha.RoomEase.tenant.service;

import com.nishtha.RoomEase.tenant.dto.AssignTenantRequest;
import com.nishtha.RoomEase.tenant.dto.TenantPGResponse;
import com.nishtha.RoomEase.tenant.dto.TenantResponse;

import java.util.List;

public interface TenantService {

    TenantResponse assignTenant(Long applicationId, AssignTenantRequest request);

    List<TenantResponse> getTenantsByProperty(Long propertyId);

    TenantResponse vacateTenant(Long tenantId);

    TenantPGResponse getMyPg();

}
package com.nishtha.RoomEase.tenant.controller;

import com.nishtha.RoomEase.tenant.dto.AssignTenantRequest;
import com.nishtha.RoomEase.tenant.dto.TenantPGResponse;
import com.nishtha.RoomEase.tenant.dto.TenantResponse;
import com.nishtha.RoomEase.tenant.service.TenantService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tenants")
@SecurityRequirement(name="bearerAuth")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    @PostMapping("/applications/{applicationId}/assign")
    @ResponseStatus(HttpStatus.CREATED)
    public TenantResponse assignTenant(
            @PathVariable Long applicationId,
            @Valid @RequestBody AssignTenantRequest request
    ) {
        return tenantService.assignTenant(applicationId, request);
    }

    @GetMapping("/property/{propertyId}")
    public List<TenantResponse> getTenantsByProperty(@PathVariable Long propertyId) {
        return tenantService.getTenantsByProperty(propertyId);
    }

    @PatchMapping("/{tenantId}/vacate")
    public TenantResponse vacateTenant(@PathVariable Long tenantId) {
        return tenantService.vacateTenant(tenantId);
    }

    @GetMapping("/my-pg")
    public ResponseEntity<TenantPGResponse> getMyPg() {
        TenantPGResponse response = tenantService.getMyPg();
        return ResponseEntity.ok(response);
    }

}
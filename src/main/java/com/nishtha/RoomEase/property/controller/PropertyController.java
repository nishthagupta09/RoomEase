package com.nishtha.RoomEase.property.controller;

import com.nishtha.RoomEase.property.dto.*;
import com.nishtha.RoomEase.property.service.PropertyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping("/register-property")
    public ResponseEntity<PropertyResponse> createProperty(@RequestBody RegisterPropertyRequest request) {

        PropertyResponse response = propertyService.createProperty(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getMyProperties() {

        return ResponseEntity.ok(propertyService.getMyProperties());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> getProperty(@PathVariable Long id) {

        return ResponseEntity.ok(propertyService.getProperty(id));
    }

    @GetMapping("/details/{propertyId}")
    public ResponseEntity<PropertyResponse> getPropertyDetails(@PathVariable Long propertyId) {

        return ResponseEntity.ok(propertyService.getPropertyDetails(propertyId)
        );
    }

    @PutMapping("/edit-property/{id}")
    public ResponseEntity<PropertyResponse> updateProperty(@PathVariable Long id, @RequestBody UpdatePropertyRequest request) {

        return ResponseEntity.ok(propertyService.updateProperty(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {

        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<PropertyResponse>> getAllAvailableProperties() {
        return ResponseEntity.ok(propertyService.getAllAvailableProperties());
    }

    @PostMapping("/search")
    public ResponseEntity<List<PropertyResponse>> searchProperties(@RequestBody PropertySearchRequest request) {

        List<PropertyResponse> properties = propertyService.searchProperties(request);

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<OwnerDashboardResponse> getOwnerDashboard() {

        return ResponseEntity.ok(propertyService.getOwnerDashboard());
    }

}

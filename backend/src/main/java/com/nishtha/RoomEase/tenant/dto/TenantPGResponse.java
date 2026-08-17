package com.nishtha.RoomEase.tenant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantPGResponse {

    // Property information

    private Long propertyId;

    private String propertyName;

    private String address;

    private String city;

    private String state;


    // Owner information

    private String ownerName;

    private String ownerPhone;

    private String ownerEmail;


    // Tenant's room information

    private String roomNo;

    private String bedLabel;

    private Integer roomType;

    private LocalDate moveInDate;

    private BigDecimal monthlyRent;

}
package com.nishtha.RoomEase.tenant.dto;

import com.nishtha.RoomEase.common.enums.TenantStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TenantResponse {

    private Long tenantId;

    private Long userId;

    private String tenantName;

    private Long applicationId;

    private Long propertyId;

    private Long roomId;

    private String roomNo;

    private Long bedId;

    private String bedLabel;

    private String phoneNo;

    private String email;

    private LocalDate moveInDate;

    private LocalDate moveOutDate;

    private BigDecimal monthlyRent;

    private TenantStatus status;
}
package com.nishtha.RoomEase.property.dto;

import com.nishtha.RoomEase.common.enums.GenderType;
import com.nishtha.RoomEase.common.enums.PropertyStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RegisterPropertyRequest {

    private String propertyName;

    private String description;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String contactInfo;

    private Integer totalRooms;

    private BigDecimal minRent;

    private BigDecimal maxRent;

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private PropertyStatus propertyStatus;

    private Boolean hasWifi;

    private Boolean hasFood;

    private Boolean hasParking;
}

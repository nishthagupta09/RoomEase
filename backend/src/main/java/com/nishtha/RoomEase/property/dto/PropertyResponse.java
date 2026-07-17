package com.nishtha.RoomEase.property.dto;

import com.nishtha.RoomEase.common.enums.GenderType;
import com.nishtha.RoomEase.common.enums.PropertyStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class PropertyResponse {

    private Long propertyId;

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

    private GenderType genderType;

    private Boolean hasWifi;

    private Boolean hasFood;

    private Boolean hasParking;

    private PropertyStatus propertyStatus;

    private Long ownerId;

    private String ownerName;

    // Images
    private List<String> imageUrls;
}

package com.nishtha.RoomEase.property.dto;

import com.nishtha.RoomEase.common.enums.GenderType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class PropertySearchRequest {

    private String keyword;

    private String city;

    private GenderType genderType;

    private BigDecimal minRent;

    private BigDecimal maxRent;

}
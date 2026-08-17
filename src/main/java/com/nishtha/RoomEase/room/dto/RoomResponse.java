package com.nishtha.RoomEase.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomResponse {

    private Long roomId;

    private Long propertyId;

    private String roomNo;

    private String floorNo;

    private Integer capacity;

    private Integer currOccupancy;

    private Boolean hasAc;

    private Boolean hasAttachedBathroom;

}
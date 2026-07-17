package com.nishtha.RoomEase.room.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoomRequest {

    private String roomNo;

    private String floorNo;

    private Integer capacity;

    private Boolean hasAc;

    private Boolean hasAttachedBathroom;

}

package com.nishtha.RoomEase.room.service;

import com.nishtha.RoomEase.room.dto.AddRoomRequest;
import com.nishtha.RoomEase.room.dto.RoomResponse;
import com.nishtha.RoomEase.room.dto.UpdateRoomRequest;

import java.util.List;

public interface RoomService {

    RoomResponse createRoom(Long propertyId,AddRoomRequest request);

    List<RoomResponse> getRoomsByProperty(Long propertyId);

    RoomResponse getRoom(Long roomId);

    RoomResponse updateRoom(Long roomId, UpdateRoomRequest request);

    void deleteRoom(Long roomId);

}

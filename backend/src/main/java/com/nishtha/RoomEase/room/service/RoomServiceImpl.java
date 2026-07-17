package com.nishtha.RoomEase.room.service;

import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.repository.PropertyRepository;
import com.nishtha.RoomEase.room.dto.AddRoomRequest;
import com.nishtha.RoomEase.room.dto.RoomResponse;
import com.nishtha.RoomEase.room.dto.UpdateRoomRequest;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final PropertyRepository propertyRepository;

    private Long getCurrentOwnerId() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }

    private Property getOwnerProperty(Long propertyId) {

        Long ownerId = getCurrentOwnerId();
        return propertyRepository
                .findByPropertyIdAndOwner_UserId(propertyId, ownerId)
                .orElseThrow(() ->
                        new RuntimeException("Property not found or access denied"));
    }

    private Room getOwnerRoom(Long roomId) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        Long ownerId = getCurrentOwnerId();
        if (!room.getProperty()
                .getOwner()
                .getUserId()
                .equals(ownerId)) {

            throw new RuntimeException("Access denied");
        }

        return room;
    }

    @Override
    public RoomResponse createRoom(Long propertyId,AddRoomRequest request) {

        Property property = getOwnerProperty(propertyId);

        Room room = new Room();

        room.setProperty(property);

        room.setRoomNo(request.getRoomNo());

        room.setFloorNo(request.getFloorNo());

        room.setCapacity(request.getCapacity());

        room.setCurrOccupancy(0);

        room.setHasAc(request.getHasAc());

        room.setHasAttachedBathroom(request.getHasAttachedBathroom());

        roomRepository.save(room);

        return mapToResponse(room);
    }

    private RoomResponse mapToResponse(Room room) {

        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .propertyId(room.getProperty().getPropertyId())
                .roomNo(room.getRoomNo())
                .floorNo(room.getFloorNo())
                .capacity(room.getCapacity())
                .currOccupancy(room.getCurrOccupancy())
                .hasAc(room.getHasAc())
                .hasAttachedBathroom(room.getHasAttachedBathroom())
                .build();
    }

    @Override
    public List<RoomResponse> getRoomsByProperty(Long propertyId) {

        Property property = getOwnerProperty(propertyId);

        List<Room> rooms = roomRepository.findByProperty(property);

        return rooms.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public RoomResponse getRoom(Long roomId) {

        Room room = getOwnerRoom(roomId);
        return mapToResponse(room);
    }

    @Override
    public RoomResponse updateRoom(Long roomId, UpdateRoomRequest request) {

        Room room = getOwnerRoom(roomId);

        if (request.getRoomNo() != null)
            room.setRoomNo(request.getRoomNo());

        if (request.getFloorNo() != null)
            room.setFloorNo(request.getFloorNo());

        if (request.getCapacity() != null)
            room.setCapacity(request.getCapacity());

        if (request.getHasAc() != null)
            room.setHasAc(request.getHasAc());

        if (request.getHasAttachedBathroom() != null)
            room.setHasAttachedBathroom(request.getHasAttachedBathroom());

        Room updated = roomRepository.save(room);

        return mapToResponse(updated);
    }

    @Override
    public void deleteRoom(Long roomId) {

        Room room = getOwnerRoom(roomId);
        roomRepository.delete(room);
    }

}

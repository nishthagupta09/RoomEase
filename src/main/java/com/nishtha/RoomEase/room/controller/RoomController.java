package com.nishtha.RoomEase.room.controller;

import com.nishtha.RoomEase.property.service.PropertyService;
import com.nishtha.RoomEase.room.dto.AddRoomRequest;
import com.nishtha.RoomEase.room.dto.RoomResponse;
import com.nishtha.RoomEase.room.dto.UpdateRoomRequest;
import com.nishtha.RoomEase.room.service.RoomService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/properties/{propertyId}/rooms")
    public ResponseEntity<RoomResponse> createRoom(@PathVariable Long propertyId, @RequestBody AddRoomRequest request) {

        RoomResponse response = roomService.createRoom(propertyId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/properties/{propertyId}/rooms")
    public ResponseEntity<List<RoomResponse>> getRoomsByProperty(@PathVariable Long propertyId) {

        return ResponseEntity.ok(roomService.getRoomsByProperty(propertyId));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable Long roomId) {

        return ResponseEntity.ok(roomService.getRoom(roomId));
    }

    @PutMapping("/rooms/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId, @RequestBody UpdateRoomRequest request) {

        return ResponseEntity.ok(roomService.updateRoom(roomId, request));
    }

    @DeleteMapping("/rooms/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {

        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }
}

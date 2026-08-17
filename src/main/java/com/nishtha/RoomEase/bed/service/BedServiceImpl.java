package com.nishtha.RoomEase.bed.service;

import com.nishtha.RoomEase.bed.dto.AddBedRequest;
import com.nishtha.RoomEase.bed.dto.BedResponse;
import com.nishtha.RoomEase.bed.dto.UpdateBedRequest;
import com.nishtha.RoomEase.bed.entity.Bed;
import com.nishtha.RoomEase.bed.repository.BedRepository;
import com.nishtha.RoomEase.common.enums.BedStatus;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BedServiceImpl implements BedService {

    private final BedRepository bedRepository;
    private final RoomRepository roomRepository;

    private BedResponse mapToResponse(Bed bed) {

        return BedResponse.builder()
                .bedId(bed.getBedId())
                .roomId(bed.getRoom().getRoomId())
                .bedLabel(bed.getBedLabel())
                .monthlyRent(bed.getMonthlyRent())
                .status(bed.getStatus().toString())
                .build();
    }

    @Override
    public BedResponse createBed(Long roomId, AddBedRequest request) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (bedRepository.countByRoom(room) >= room.getCapacity()) {
            throw new RuntimeException("Room capacity reached. Cannot add more beds.");
        }

        if (bedRepository.existsByRoomAndBedLabel(room, request.getBedLabel())) {
            throw new RuntimeException("Bed number already exists in this room");
        }

        Bed bed = Bed.builder()
                .room(room)
                .bedLabel(request.getBedLabel())
                .monthlyRent(request.getMonthlyRent())
                .status(BedStatus.AVAILABLE)
                .build();

        Bed savedBed = bedRepository.save(bed);

        return mapToResponse(savedBed);
    }

    @Override
    public List<BedResponse> getBedsByRoom(Long roomId) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        List<Bed> beds = bedRepository.findByRoom(room);

        return beds.stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public BedResponse getBedById(Long bedId) {

        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        return mapToResponse(bed);

    }

    @Override
    public BedResponse updateBed(Long bedId, UpdateBedRequest request) {

        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        if (!bed.getBedLabel().equals(request.getBedLabel())
                && bedRepository.existsByRoomAndBedLabel(bed.getRoom(), request.getBedLabel())) {

            throw new RuntimeException("Bed number already exists in this room");

        }
        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Cannot modify an occupied bed");
        }

        bed.setBedLabel(request.getBedLabel());
        bed.setMonthlyRent(request.getMonthlyRent());

        Bed updatedBed = bedRepository.save(bed);

        return mapToResponse(updatedBed);

    }

    @Override
    public void deleteBed(Long bedId) {

        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Cannot delete an occupied bed");
        }

        bedRepository.delete(bed);
    }

}
package com.nishtha.RoomEase.bed.service;

import com.nishtha.RoomEase.bed.dto.AddBedRequest;
import com.nishtha.RoomEase.bed.dto.BedResponse;
import com.nishtha.RoomEase.bed.dto.UpdateBedRequest;

import java.util.List;

public interface BedService {

    BedResponse createBed(Long roomId, AddBedRequest request);

    List<BedResponse> getBedsByRoom(Long roomId);

    BedResponse getBedById(Long bedId);

    BedResponse updateBed(Long bedId, UpdateBedRequest request);

    void deleteBed(Long bedId);

}
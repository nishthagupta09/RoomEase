package com.nishtha.RoomEase.bed.controller;


import com.nishtha.RoomEase.bed.dto.AddBedRequest;
import com.nishtha.RoomEase.bed.dto.BedResponse;
import com.nishtha.RoomEase.bed.dto.UpdateBedRequest;
import com.nishtha.RoomEase.bed.service.BedService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class BedController {

    private final BedService bedService;

    @PostMapping("/rooms/{roomId}/beds")
    @ResponseStatus(HttpStatus.CREATED)
    public BedResponse createBed(@PathVariable Long roomId, @Valid @RequestBody AddBedRequest request) {
        System.out.println("CREATE BED CONTROLLER HIT");

        return bedService.createBed(roomId, request);
    }

    @GetMapping("/rooms/{roomId}/beds")
    public List<BedResponse> getBedsByRoom(
            @PathVariable Long roomId
    ) {

        return bedService.getBedsByRoom(roomId);
    }

    @GetMapping("/beds/{bedId}")
    public BedResponse getBedById(
            @PathVariable Long bedId
    ) {

        return bedService.getBedById(bedId);
    }

    @PutMapping("/beds/{bedId}")
    public BedResponse updateBed(@PathVariable Long bedId, @Valid @RequestBody UpdateBedRequest request) {

        return bedService.updateBed(bedId, request);
    }

    @DeleteMapping("/beds/{bedId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBed(@PathVariable Long bedId) {

        bedService.deleteBed(bedId);
    }

}
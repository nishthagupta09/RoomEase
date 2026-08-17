package com.nishtha.RoomEase.complaint.dto;

import com.nishtha.RoomEase.common.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateComplaintRequest {

    private ComplaintStatus status;

    private String response;
}
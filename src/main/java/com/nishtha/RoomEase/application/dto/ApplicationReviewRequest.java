package com.nishtha.RoomEase.application.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationReviewRequest {

    @Size(max = 500, message = "Remark cannot exceed 500 characters")
    private String ownerRemark;
}

package com.nishtha.RoomEase.auth.dto;

import com.nishtha.RoomEase.common.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {


    private String fullName;
    private String phone;

    private String currentPassword;

    @Size(min = 8)
    private String newPassword;

    private Gender gender;
}

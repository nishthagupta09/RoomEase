package com.nishtha.RoomEase.auth.dto;

import com.nishtha.RoomEase.common.enums.Gender;
import com.nishtha.RoomEase.common.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {

    private Long userId;

    private String fullName;

    private String email;

    private String phone;

    private Gender gender;

    private Role role;
}

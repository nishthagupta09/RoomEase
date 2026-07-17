package com.nishtha.RoomEase.auth.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class LoginResponse {

    private String token;

    private Long userId;

    private String role;

    private String fullName;
}

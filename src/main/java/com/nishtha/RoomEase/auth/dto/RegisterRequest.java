package com.nishtha.RoomEase.auth.dto;

import com.nishtha.RoomEase.common.enums.Gender;
import com.nishtha.RoomEase.common.enums.Role;
import com.nishtha.RoomEase.common.enums.VerificationMethod;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String fullName;

    @Email
    private String email;

    @NotBlank
    private String phone;

    @Size(min=8)
    private String password;

    private Gender gender;

    private Role role;

    private VerificationMethod verificationMethod;

}

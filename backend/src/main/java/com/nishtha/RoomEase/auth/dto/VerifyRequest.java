package com.nishtha.RoomEase.auth.dto;

import com.nishtha.RoomEase.common.enums.VerificationMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyRequest {

        private String identifier;

        private String otp;

        private VerificationMethod verificationMethod;
}

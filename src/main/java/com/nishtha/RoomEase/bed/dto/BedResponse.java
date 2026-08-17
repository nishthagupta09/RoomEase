package com.nishtha.RoomEase.bed.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BedResponse {

    private Long bedId;

    private Long roomId;

    private String bedLabel;

    private BigDecimal monthlyRent;

    private String status;

}
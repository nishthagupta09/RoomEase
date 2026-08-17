package com.nishtha.RoomEase.rent.service;

import com.nishtha.RoomEase.rent.dto.RecordPaymentRequest;
import com.nishtha.RoomEase.rent.dto.RentDetailsResponse;
import com.nishtha.RoomEase.rent.dto.RentResponse;
import com.nishtha.RoomEase.rent.dto.RentSummaryResponse;

import java.util.List;

public interface RentService {

    List<RentResponse> getPropertyRents(Long propertyId);

    RentSummaryResponse getRentSummary(Long propertyId);

    RentDetailsResponse getRentDetails(Long rentId);

    RentResponse recordPayment(Long rentId, RecordPaymentRequest request);

    void generateMonthlyRent();

    void updateOverdueRents();

    List<RentDetailsResponse> getMyRent();

}
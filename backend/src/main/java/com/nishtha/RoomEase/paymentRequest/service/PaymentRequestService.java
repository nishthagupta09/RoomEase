package com.nishtha.RoomEase.paymentRequest.service;

import com.nishtha.RoomEase.paymentRequest.dto.CreatePaymentRequest;
import com.nishtha.RoomEase.paymentRequest.dto.PaymentRequestResponse;

import java.util.List;

public interface PaymentRequestService {

    PaymentRequestResponse createPaymentRequest(CreatePaymentRequest request);

    List<PaymentRequestResponse> getMyPaymentRequests();

    List<PaymentRequestResponse> getPaymentRequestsByProperty(Long propertyId);

    PaymentRequestResponse approvePaymentRequest(Long paymentRequestId);

    PaymentRequestResponse rejectPaymentRequest(Long paymentRequestId);

}
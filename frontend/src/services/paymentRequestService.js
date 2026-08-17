import api from "./api";

const paymentRequestService = {

    createPaymentRequest: async (request) => {

        const response = await api.post(
            "/payment-requests",
            request
        );

        return response.data;
    },

    getMyPaymentRequests: async () => {

        const response = await api.get(
            "/payment-requests/my"
        );

        return response.data;
    },

    getPaymentRequestsByProperty: async (propertyId) => {

    const response = await api.get(
        `/payment-requests/property/${propertyId}`
    );

    return response.data;

},

approvePaymentRequest: async (paymentRequestId) => {

    const response = await api.patch(
        `/payment-requests/${paymentRequestId}/approve`
    );

    return response.data;
},

rejectPaymentRequest: async (paymentRequestId) => {

    const response = await api.patch(
        `/payment-requests/${paymentRequestId}/reject`
    );

    return response.data;
},

};

export default paymentRequestService;
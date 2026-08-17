import api from "./api";

const getPropertyRents = async (propertyId) => {
    const response = await api.get(`rent/property/${propertyId}`);
    return response.data;
};

const getRentSummary = async (propertyId) => {
    const response = await api.get(`rent/property/${propertyId}/summary`);
    return response.data;
};

const getRentDetails = async (rentId) => {
    const response = await api.get(`rent/${rentId}`);
    return response.data;
};

const recordPayment = async (rentId, paymentRequest) => {
    const response = await api.post(`rent/${rentId}/pay`,paymentRequest);
    return response.data;
};

const getMyRent = async() => {
    const response = await api.get("rent/my-rent");
    return response.data;
};


const rentService= {
    getPropertyRents,
    getRentSummary,
    getRentDetails,
    recordPayment,
    getMyRent
};

export default rentService;
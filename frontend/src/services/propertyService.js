import api from "./api";

const getMyProperties = () =>
    api.get("/properties");

const createProperty = (data) =>
    api.post("/properties/register-property", data);

const getProperty=(id)=>
    api.get(`/properties/${id}`);

const updateProperty = (id, data) =>
    api.put(`/properties/edit-property/${id}`, data);

const deleteProperty = (id) =>
    api.delete(`/properties/${id}`);

const getAllAvailableProperties = () => {
    return api.get("/properties/all");
};

const getPropertyDetails = (propertyId) => {
    return api.get(`/properties/details/${propertyId}`);
};

const searchProperties = async (searchRequest) => {
    console.log(searchRequest);
    const response = await api.post("/properties/search",searchRequest);
    console.log(response.data);
    return response.data;
};

const getOwnerDashboard=async ()=>{
    return api.get("properties/dashboard");
}

export default {
    getMyProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getAllAvailableProperties,
    getPropertyDetails,
    searchProperties,
    getOwnerDashboard
};
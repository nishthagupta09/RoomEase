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

export default {
    getMyProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getAllAvailableProperties,
    getPropertyDetails
};
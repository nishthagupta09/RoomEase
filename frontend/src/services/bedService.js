import api from "./api";

const createBed = async (roomId, bedData) => {
    const response = await api.post(`/rooms/${roomId}/beds`, bedData);
    return response.data;
};

const getBedsByRoom = async (roomId) => {
    const response = await api.get(`/rooms/${roomId}/beds`);
    return response.data;
};

const getBedById = async (bedId) => {
    const response = await api.get(`/beds/${bedId}`);
    return response.data;
};

const updateBed = async (bedId, bedData) => {
    const response = await api.put(`/beds/${bedId}`, bedData);
    return response.data;
};

const deleteBed = async (bedId) => {
    await api.delete(`/beds/${bedId}`);
};

const bedService = {
    createBed,
    getBedsByRoom,
    getBedById,
    updateBed,
    deleteBed,
};

export default bedService;
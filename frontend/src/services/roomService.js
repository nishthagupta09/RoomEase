import api from "./api";

const createRoom = (propertyId, data) =>
    api.post(`/properties/${propertyId}/rooms`, data);

const getAllRooms = (propertyId) =>
    api.get(`/properties/${propertyId}/rooms`);

const getRoom=(roomId) =>
    api.get(`/rooms/${roomId}`)

const updateRoom = (roomId, data) =>
    api.put(`/rooms/${roomId}`, data);

const deleteRoom = (roomId) =>
    api.delete(`/rooms/${roomId}`);

export default {
    createRoom,
    getAllRooms,
    getRoom,
    updateRoom,
    deleteRoom
};
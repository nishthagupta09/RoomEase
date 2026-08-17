import api from "./api";

const createRoom = (propertyId, data) =>
    api.post(`/properties/${propertyId}/rooms`, data);

const getRoom=(roomId) =>
    api.get(`/rooms/${roomId}`)

const updateRoom = (roomId, data) =>
    api.put(`/rooms/${roomId}`, data);

const deleteRoom = (roomId) =>
    api.delete(`/rooms/${roomId}`);

const getRoomsByProperty= async (propertyId)=>{
     const reponse= await api.get(`properties/${propertyId}/rooms`);
     return reponse.data;
}

export default {
    createRoom,
    getRoomsByProperty,
    getRoom,
    updateRoom,
    deleteRoom
};
import api from "./api";

const complaintService = {

    createComplaint: async (data) => {
        const response = await api.post("/complaints",data);
        return response.data;
    },


    getMyComplaints: async () => {
        const response = await api.get("/complaints/my");
        return response.data;
    },


    getPropertyComplaints: async (propertyId) => {

        const response = await api.get(`/complaints/property/${propertyId}`);
        return response.data;
    },


    updateComplaint: async (complaintId, data) => {
        const response = await api.patch(`/complaints/${complaintId}`,data);
        return response.data;
    }

};

export default complaintService;
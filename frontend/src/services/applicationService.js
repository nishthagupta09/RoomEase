import api from "./api";

const applyForProperty = (applicationData) => {
    return api.post("/applications/apply", applicationData);
};

const getMyApplications = () => {
    return api.get("/applications/my");
};

const getApplicationsForProperty = async (propertyId) => {
    const response = await api.get(`/applications/property/${propertyId}`);
    return response.data;
}

const approveApplication = async (applicationId, ownerRemark = "") => {
    const response = await api.patch(
        `/applications/${applicationId}/approve`,
        null,
        {
            params: {
                ownerRemark,
            },
        }
    );

    return response.data;
};

const rejectApplication = async (applicationId, ownerRemark = "") => {
    const response = await api.patch(
        `/applications/${applicationId}/reject`,
        null,
        {
            params: {
                ownerRemark,
            },
        }
    );

    return response.data;
};

const applicationService = {
    applyForProperty,
    getApplicationsForProperty,
    approveApplication,
    rejectApplication,
    getMyApplications
};

export default applicationService;
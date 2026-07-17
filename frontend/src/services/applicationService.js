import api from "./api";

const applyForProperty = (applicationData) => {
    return api.post("/applications/apply", applicationData);
};

const applicationService = {
    applyForProperty,
};

export default applicationService;
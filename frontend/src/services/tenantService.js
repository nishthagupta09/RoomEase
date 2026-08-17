import api from "./api";

const tenantService = {

    assignTenant: async (applicationId, data) => {
        const response = await api.post(
            `/tenants/applications/${applicationId}/assign`,
            data
        );
        return response.data;
    },

    getTenantsByProperty: async (propertyId) => {
    const response = await api.get(
        `/tenants/property/${propertyId}`
    );

    return response.data;
},

vacateTenant: async (tenantId) => {
    const response = await api.patch(
        `/tenants/${tenantId}/vacate`
    );

    return response.data;
},

getMyPg: async () => {

    const response = await api.get(
        "/tenants/my-pg"
    );

    return response.data;
},

};

export default tenantService;
import api from "./api";

const authService = {

    register(data) {
        return api.post("/auth/register", data);
    },

    verifyOtp(data) {
        return api.post("/auth/verify", data);
    },

    // resendOtp(email) {
    //     return api.post("/auth/resend-otp", {
    //         email
    //     });
    // },

    login(data) {
        return api.post("/auth/login", data);
    }

};

export default authService;
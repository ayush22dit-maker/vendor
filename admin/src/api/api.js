import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const registerUser = (data) => {
    return api.post("/auth/register", data);
};

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const forgotPassword = (data) => {
    return api.post("/auth/forgot-password", data);
};

export const verifyOtp = (data) => {
    return api.post("/auth/verify-otp", data);
};

export const resetPassword = (data) => {
    return api.post("/auth/reset-password", data);
};

export default api;
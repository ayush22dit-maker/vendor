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

export const createCategory = (data) => {
    return api.post("/category", data);
};

export const getAllCategories = () => {
    return api.get("/category");
};

export const getCategoryById = (id) => {
    return api.get(`/category/${id}`);
};

export const updateCategory = (id, data) => {
    return api.put(`/category/${id}`, data);
};

export const deleteCategory = (id) => {
    return api.delete(`/category/${id}`);
};


export const createProduct = (data) => {
    return api.post("/products", data);
};

export const getAllProducts = () => {
    return api.get("/products");
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

export const updateProduct = (id, data) => {
    return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};

export default api;
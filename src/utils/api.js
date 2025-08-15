import { getToken } from "../utils/auth";

import axios from "axios";

import { Navigate } from "react-router-dom";

const api = axios.create({
    baseURL: "https://skillbridgebackend-lx3u.onrender.com",
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = getToken();
    config.headers = config.headers ?? {};
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

// Response Interceptor
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const url = err.config?.url || "";

        if (
            (err.response?.status === 403 || err.response?.status === 401) &&
            !url.includes("/login")
        ) {
            <Navigate to="/" replace />
        }
        return Promise.reject(err);
    }
);

export default api;

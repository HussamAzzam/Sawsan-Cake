// src/api/authService.js
import api from "./axiosInstance";

export const getCurrentUser = (config) => api.get("/auth/me");
export const logout = () => api.post("/auth/logout");
export const googleLoginUrl = `${api.defaults.baseURL}/auth/google`;

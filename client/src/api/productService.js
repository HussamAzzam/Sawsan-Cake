// src/api/productService.js
import api from "./axiosInstance";

export const getProducts = (params, config) => api.get("/products", { params, ...config });
export const getProductById = (id, config) => api.get(`/products/${id}`, config);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.patch(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getLikeStatus = (productId) => api.get(`/products/${productId}/like`);
export const toggleLike = (productId) => api.post(`/products/${productId}/like`);

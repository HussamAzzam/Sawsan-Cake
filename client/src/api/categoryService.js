// src/api/categoryService.js
import api from "./axiosInstance";

export const getCategories = (params, config) => api.get("/categories", { params, ...config });
export const getCategoryBySlug = (slug, config) => api.get(`/categories/${slug}`, config);
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.patch(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

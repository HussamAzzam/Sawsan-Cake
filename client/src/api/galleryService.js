// src/api/galleryService.js
import api from "./axiosInstance";

export const getGalleryImages = (params, config) => api.get("/gallery", { params, ...config });

export const uploadGalleryImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/gallery", formData, { timeout: 60000 });
};

export const deleteGalleryImages = (ids) => api.delete("/gallery", { data: { ids } });

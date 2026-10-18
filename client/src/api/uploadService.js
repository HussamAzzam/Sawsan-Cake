// src/api/uploadService.js
import api from "./axiosInstance";

export const uploadImage = (file, config) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/upload", formData, config);
};

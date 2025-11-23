// src/api.js
import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "https://your-backend.example.com",
});

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export default api;

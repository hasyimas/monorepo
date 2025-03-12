import { store } from "@/store/store";
import axios from "axios";


// Membuat instance Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ganti dengan URL backend kamu
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware untuk menambahkan token dari localStorage jika ada
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

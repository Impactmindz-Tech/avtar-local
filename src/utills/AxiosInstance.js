import axios from "axios";
import { getLocalStorage } from "./LocalStorageUtills";

const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_APP_MAINURL}/`,
 baseURL: `https://backend-avatar-local.onrender.com/`,
  // baseURL: "https://avatarbackend.onrender.com",
  // baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

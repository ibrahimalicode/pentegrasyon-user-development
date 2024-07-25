import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL;
const KEY = import.meta.env.VITE_LOACAL_KEY;

const api = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

const auth = () => {
  const authItemString = localStorage.getItem(KEY);
  const authItem = JSON.parse(authItemString);
  return authItem;
};

const clearAuth = () => {
  localStorage.removeItem(KEY);
};

export const privateApi = () => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth().token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        clearAuth();
        window.location.href = "/login";
        toast.error(error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default api;

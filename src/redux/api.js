import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL;
const KEY = import.meta.env.VITE_LOCAL_KEY;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

export const auth = () => {
  const authItemString = localStorage.getItem(KEY);
  const authItem = JSON.parse(authItemString);
  return authItem;
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
};

export const privateApi = () => {
  const TOKEN = auth()?.token;

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!TOKEN) {
        window.location.href = "/login";
        return Promise.reject("No token!");
      }
      config.headers["Authorization"] = `Bearer ${TOKEN}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error);
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

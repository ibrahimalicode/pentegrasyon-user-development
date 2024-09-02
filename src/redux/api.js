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

export const getAuth = () => {
  const authItemString = localStorage.getItem(KEY);
  const authItem = JSON.parse(authItemString);
  return authItem;
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
};

export const privateApi = () => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${getAuth().token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error, response) => {
      // if (error.response?.status === 401) {
      //   clearAuth();
      //   window.location.href = "/login";
      // }

      if (error.response?.status === 403) {
        toast.dismiss();
        toast.error("Hesabınız aktıf değil");
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default api;

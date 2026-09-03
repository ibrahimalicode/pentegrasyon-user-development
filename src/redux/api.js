import axios from "axios";
import toast from "react-hot-toast";
import { integrationConflictMessage } from "../utils/integrationConflict";

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
  try {
    const authItemString = localStorage.getItem(KEY);
    return authItemString ? JSON.parse(authItemString) : null;
  } catch (err) {
    clearAuth();
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
};

// Interceptors are registered once at module scope; privateApi() must NOT
// register them per call — every slice calls privateApi() at import time.
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getAuth()?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      return Promise.reject({
        response: {
          status: 401,
          message: "No token provided. Unauthorized.",
        },
      });
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject({ ...error });
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    let errorMessage = "";
    toast.dismiss();

    if (error.response?.status === 401) {
      clearAuth();
      errorMessage = "Oturumunuz sona erdi. Lütfen tekrar giriş yapın.";
      // redirect once; parallel 401s and the login page itself don't re-trigger it
      if (!window.location.pathname.startsWith("/login")) {
        window.location.replace("/login");
      }
    }

    if (error.response?.status === 403) {
      errorMessage = "Hesabınız aktif değil";
      toast.error(errorMessage, { id: "403" });
    } else if (error.response) {
      // Integration conflicts carry a detail object; their raw message_TR
      // embeds the conflicting owner's e-mail, so it must not be shown
      // verbatim. integrationConflictMessage returns a privacy-safe text
      // (and null for every other error, falling through unchanged).
      const conflictMessage = integrationConflictMessage(error.response.data);
      const resErr = conflictMessage || error?.response?.data?.message_TR || null;
      if (resErr) {
        errorMessage = resErr;
      } else {
        switch (error.response.status) {
          case 400:
            errorMessage = "İstek başarısız oldu, durum kodu 400";
            break;
          case 404:
            errorMessage = "Kaynak bulunamadı, durum kodu 404";
            break;
          case 500:
            errorMessage = "Sunucu hatası, durum kodu 500";
            break;
          default:
            errorMessage = `Beklenmedik hata, durum kodu ${error.response.status}`;
        }
      }
      toast.error(errorMessage, { id: "api-error" });
    } else if (error.request) {
      errorMessage = "İstek sunucuya ulaşamadı";
      toast.error(errorMessage, { id: "no-server-error" });
    } else {
      if (!error.message.includes("Bir hata oluştu")) {
        errorMessage = "Bir hata oluştu: " + error.message;
      } else {
        errorMessage = error.message; // Prevent duplication
      }
      toast.error(errorMessage, { id: "random-error" });
    }

    return Promise.reject({ ...error, message: errorMessage });
  }
);

export const privateApi = () => axiosPrivate;

export default api;

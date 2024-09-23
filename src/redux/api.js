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
    (error) => {
      Promise.reject(error);
      console.log(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error, response) => {
      let errorMessage = "";
      toast.dismiss();

      if (error.response?.status === 401) {
        clearAuth();
        errorMessage = "Yetkili Değılziniz.";
        window.location.href = "/login";
      }

      if (error.response?.status === 403) {
        errorMessage = "Hesabınız aktif değil";
        toast.error(errorMessage, { id: "403" });
      } else if (error.response) {
        const resErr = error?.response?.data?.message_TR || null;
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
        errorMessage = "Bir hata oluştu: " + error.message;
        toast.error(errorMessage, { id: "random-error" });
      }

      return Promise.reject({ ...error, message: errorMessage });
    }
  );

  return axiosPrivate;
};

export default api;

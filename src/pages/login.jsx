//MODELS
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ICONS
import LoadingI from "../assets/anim/loading";
import TurnstileWidget from "../components/turnstileWidget";

//REDUX
import { getAuth } from "../redux/api";
import { login, resetLoginState } from "../redux/auth/loginSlice";

// COMP
import GlassFrame from "../components/common/glassFrame";
import CustomInput from "../components/common/customInput";
import {
  AuthHeader,
  AuthSubmit,
  AuthFooter,
} from "../components/common/authKit";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getAuth()?.token;
  const { success, loading, error } = useSelector((state) => state.auth.login);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password || loading) return;
    dispatch(login({ emailOrPhone, password }));
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Giriş Yapılıyor...");
    } else if (error) {
      toast.dismiss();
      if (error?.statusCode == 422) navigate("/verify");
      if (error.statusCode == 403) {
        toast.error("Hesabınız aktif değil");
      } else {
        toast.error(error.message);
      }
      dispatch(resetLoginState());
    } else if (success) {
      navigate("/orders");
      toast.dismiss();
      toast.success("Başarıyla Giriş Yapıldı");
      dispatch(resetLoginState());
    }
  }, [loading, success, error, dispatch, navigate]);

  useEffect(() => {
    if (token) {
      navigate("/orders");
    }
  }, [token]);

  return (
    <GlassFrame
      component={
        <form onSubmit={handleLogin}>
          <AuthHeader
            title="Giriş Yap"
            subtitle="Restoran panelinize devam etmek için giriş yapın"
          />
          <CustomInput
            label="E-posta/Telefon"
            type="text"
            placeholder="ornek@mail.com veya 5xx xxx xx xx"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e)}
            required={true}
            className="py-2"
            autoComplete="on"
          />
          <CustomInput
            label="Şifre"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e)}
            letIcon={true}
            className="py-2"
            autoComplete="on"
            minLength={4}
            maxLength={20}
          />
          <div className="text-right text-sm mt-3">
            <a
              href="/forgotPassword"
              className="font-medium text-[--primary-1] hover:underline"
            >
              Şifremi unuttum?
            </a>
          </div>

          <TurnstileWidget setToken={setTurnstileToken} pageName={"login"} />

          <AuthSubmit loading={loading}>Giriş Yap</AuthSubmit>

          <AuthFooter
            question="Hesabınız yok mu?"
            linkText="Kayıt Ol"
            to="/register"
          />
        </form>
      }
    />
  );
}

export default Login;

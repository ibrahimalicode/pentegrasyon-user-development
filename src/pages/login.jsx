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
      className="pt-[4rem]"
      component={
        <form onSubmit={handleLogin} className="text-white light">
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
          <CustomInput
            label="E-posta/Telefon"
            type="text"
            placeholder="E-posta/Telefon"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e)}
            required={true}
            className="py-2 bg-transparent text-[var(--white-1)]"
            className5="text-[white]"
            autoComplete="on"
          />
          <CustomInput
            label="Şifre"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e)}
            letIcon={true}
            className="py-2 bg-transparent text-[var(--white-1)]"
            className5="text-[white]"
            autoComplete="on"
            minLength={4}
            maxLength={20}
          />
          <div className="text-right text-[--link-1] mt-4">
            <a href="/forgotPassword">Şifremi unuttum ?</a>
          </div>

          <TurnstileWidget setToken={setTurnstileToken} pageName={"login"} />

          <button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center px-7 py-2 text-xl rounded-md bg-[--primary-1] text-white mt-10 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingI className="h-7 text-white" /> : "Giriş"}
          </button>

          <div className="flex mt-4 justify-center gap-2">
            <p>Hesabınız yok mu ?</p>
            <a href="/register" className="text-[--link-1]">
              Kayıt ol
            </a>
          </div>
        </form>
      }
    />
  );
}

export default Login;

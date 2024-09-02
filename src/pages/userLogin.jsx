import { useEffect, useRef, useState } from "react";
import CustomInput from "../components/common/customInput";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ICONS
import LoadingI from "../assets/anim/loading";
import { login, resetLoginState } from "../redux/auth/loginSlice";
import TurnstileWidget from "../components/turnstileWidget";

// ASSETS
import imgUrl from "../assets/img/hero-bg.jpg";

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef();

  const { success, loading, error } = useSelector((state) => state.auth.login);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) return;
    dispatch(login({ emailOrPhone, password, role: "user" }));
  };

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Logging in..");
    } else if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      if (error?.statusCode == 422) {
        navigate("/verify");
      }
      dispatch(resetLoginState());
    } else if (success) {
      navigate("/dashboard");
      toast.dismiss(toastId.current);
      toast.success("Successfuly logged in");
      dispatch(resetLoginState());
    }
  }, [loading, success, error, dispatch, navigate]);

  return (
    <section
      className="px-[4%] pt-36 bg-no-repeat"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md mx-auto p-6 pt-10 text-[--white-1] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[--gr-1]">
        <form onSubmit={handleLogin}>
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
          <CustomInput
            label="E-posta/Telefon"
            type="text"
            placeholder="E-posta/Telefon"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e)}
            required={true}
            className="py-2 bg-transparent text-[var(--white-1)]"
            className5="text-[var(--white-1)]"
            autoComplete="on"
          />
          <CustomInput
            label="Şifre"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e)}
            letIcon={true}
            className="py-2 bg-transparent text-[var(--white-1)]"
            className5="text-[var(--white-1)]"
            autoComplete="on"
          />
          <div className="text-right text-[--link-1] mt-4">
            <a href="/forgotPassword">Şifremi unuttum ?</a>
          </div>

          <TurnstileWidget setToken={setTurnstileToken} pageName={"login"} />

          <button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}

export default UserLogin;

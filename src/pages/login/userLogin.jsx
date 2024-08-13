import { useEffect, useRef, useState } from "react";
import CustomInput from "../../components/common/customInput";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ICONS
import LoadingI from "../../assets/anim/loading";
import { login, resetLoginState } from "../../redux/auth/loginSlice";
import TurnstileWidget from "../../components/turnstileWidget";

function UserLogin({ pageName, setPageName }) {
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
        navigate("/userVerifyLogin");
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
    <div className="flex items-center justify-center w-full">
      <form
        className="flex flex-col pb-12 w-full max-w-[38rem] px-12"
        onSubmit={handleLogin}
      >
        <div className="flex justify-center">
          <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
            Giriş
          </h2>
        </div>
        <div className="flex flex-col mt-10 max-w-full">
          <CustomInput
            label="E-posta/Telefon"
            type="text"
            placeholder="E-posta/Telefon"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e)}
            required={true}
            className="py-4"
            autoComplete="on"
          />
          <CustomInput
            label="Şifre"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e)}
            required={true}
            className="py-4"
            autoComplete="on"
            letIcon={true}
          />
          <div className="flex flex-col mt-10 w-full">
            <div className="flex gap-4 text-sm leading-5 max-md:flex-wrap">
              <div className="flex-1 text-right text-[--link-1]">
                <a href="/forgotPassword">Şifremi unuttum ?</a>
              </div>
            </div>

            <div className="w-full">
              {pageName === "login" && (
                <TurnstileWidget
                  setToken={setTurnstileToken}
                  pageName={pageName}
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center px-7 py-2 text-2xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 font-[400] disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingI className="h-7" /> : "Giriş"}
              </button>{" "}
            </div>
            <div className="shrink-0 mt-10 h-px bg-slate-200 w-full" />
          </div>
        </div>
        <div className="flex flex-col mt-10 w-full">
          <div className="text-sm leading-5 text-[--link-1] w-full text-center">
            <p>Hesabınız yok mu ?</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPageName("register");
            }}
            className="px-7 py-2 text-xl rounded-md border border-solid border-[--light-4] mt-10 hover:bg-[--light-3] hover:border-transparent hover:text-[--gr-1] transition-colors text-center cursor-pointer"
          >
            Kayıt ol
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;

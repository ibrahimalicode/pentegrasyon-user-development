import { useEffect, useRef, useState } from "react";
import CustomInput from "../../components/common/customInput";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLoginState } from "../../redux/auth/loginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TurnstileWidget from "../../components/turnstileWidget";

import LoadingI from "../../assets/anim/loading";

function AdminLogin() {
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
    dispatch(login({ emailOrPhone, password, role: "admin" }));
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
      dispatch(resetLoginState());
    } else if (success) {
      navigate("/dashboard");
      toast.dismiss(toastId.current);
      toast.success("Successfuly logged in");
      dispatch(resetLoginState());
    }
  }, [loading, success, error, dispatch, navigate]);

  turnstileToken && console.log(turnstileToken);

  return (
    <div className="flex items-center justify-center w-full">
      <form
        className="flex flex-col w-full max-w-[38rem] px-12 mt-40"
        onSubmit={handleLogin}
      >
        <div className="flex justify-center">
          <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
            Giriş
          </h2>
        </div>
        <div className="flex flex-col max-w-full">
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
            letIcon={true}
            className="py-4"
            autoComplete="on"
          />
          <div className="flex flex-col mt-10 w-full">
            <div className="flex gap-4 text-sm leading-5 max-md:flex-wrap">
              <div className="flex-1 text-right text-[--link-1]">
                <a href="/forgotPassword">Şifremi unuttum ?</a>
              </div>
            </div>
            <div className="w-full">
              <TurnstileWidget
                setToken={setTurnstileToken}
                pageName={"login"}
              />
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center px-7 py-2 text-2xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingI className="h-7 text-white" /> : "Giriş"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;

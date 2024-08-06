import { useEffect, useState } from "react";
import CustomInput from "../../components/common/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLoginState } from "../../redux/auth/loginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ICONS
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";
import TurnstileWidget from "../../components/turnstileWidget";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;
import LoadingI from "../../assets/anim/loading";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector((state) => state.auth.login);

  let toastId;
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(eyeIconInv);
  const [turnstileToken, setTurnstileToken] = useState("");

  const iconClick = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setIcon(eyeIconVis);
    } else {
      setInputType("password");
      setIcon(eyeIconInv);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) return;
    dispatch(login({ emailOrPhone, password, role: "admin" }));
  };

  useEffect(() => {
    if (loading) {
      toastId = toast.loading("Logging in..");
    } else if (error) {
      toast.dismiss(toastId);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetLoginState());
    } else if (success) {
      navigate("/dashboard");
      toast.dismiss(toastId);
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
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required={true}
            className="py-4"
            autoComplete="on"
          />
          <CustomInput
            label="Şifre"
            type={inputType}
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={icon}
            onClick={iconClick}
            required={true}
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

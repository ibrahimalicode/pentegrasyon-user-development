import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLoginState } from "../redux/auth/loginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ICONS
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";

function LoginPage({ setFormName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector((state) => state.auth.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<EyeInv />);

  const iconClick = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setIcon(<EyeI />);
    } else {
      setInputType("password");
      setIcon(<EyeInv />);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Logging in..");
    } else if (error) {
      toast.dismiss();
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } else if (success) {
      navigate("/dashboard");
      toast.dismiss();
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
            label="E-posta"
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={setEmail}
            required={true}
            className="py-4"
          />
          <CustomInput
            label="Şifre"
            type={inputType}
            placeholder="Şifre"
            value={password}
            onChange={setPassword}
            icon={icon}
            onClick={iconClick}
            required={true}
            className="py-4"
          />
          <div className="flex flex-col mt-10 w-full">
            <div className="flex gap-4 text-sm leading-5 max-md:flex-wrap">
              <div className="flex-1 text-right text-[--link-1]">
                <a href="/">Şifremi unuttum ?</a>
              </div>
            </div>
            <button
              type="submit"
              className="px-7 py-2 text-2xl rounded-md bg-[--primary-1] text-[--white-1] mt-10"
            >
              Giriş
            </button>
            <div className="shrink-0 mt-10 h-px bg-slate-200 w-full" />
          </div>
        </div>
        <div className="flex flex-col mt-10 w-full">
          <p className="text-sm leading-5 text-[--link-1] w-full text-center">
            <a href="/">Hesabınız yok mu ?</a>
          </p>
          <span
            onClick={() => setFormName("register")}
            className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-10 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
          >
            Kayıt ol
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

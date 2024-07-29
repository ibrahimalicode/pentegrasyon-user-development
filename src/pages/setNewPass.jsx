import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";
import { useDispatch, useSelector } from "react-redux";
import LoadingI from "../assets/anim/loading";
import {
  changePassword,
  resetChangePassword,
} from "../redux/auth/changePasswordSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, clearAuth } from "../redux/api";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, success, error } = useSelector(
    (state) => state.auth.changePassword
  );

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [icon, setIcon] = useState(eyeIconInv);
  const [icon2, setIcon2] = useState(eyeIconInv);
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [credentials, setCredentials] = useState(null);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }
    dispatch(
      changePassword({ newPassword: password, newPasswordConfirm: password2 })
    );
  };

  // ICON RELATED
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
  const iconClick2 = (e) => {
    e.preventDefault();
    if (inputType2 === "password") {
      setInputType2("text");
      setIcon2(eyeIconVis);
    } else {
      setInputType2("password");
      setIcon2(eyeIconInv);
    }
  };

  useEffect(() => {
    if (success) {
      toast.dismiss();
      dispatch(resetChangePassword());
      toast.success("Password changed successfully");
      clearAuth();
      navigate("/login");
    }
    if (loading) {
      toast.dismiss();
      toast.loading("Loading...");
    }
    if (error) {
      toast.dismiss();
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetChangePassword());
    }
  }, [success, error, loading]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const verificationCode = searchParams.get("verificationCode");
    if (email && verificationCode) {
      setCredentials({ email, verificationCode });
    }
  }, [location]);

  return !credentials ? (
    <div className="flex items-center justify-center w-full">
      <form
        className="flex flex-col w-full max-w-[38rem] px-12 mt-40"
        onSubmit={handleChangePassword}
      >
        <div className="flex justify-center">
          <h2 className="text-[2.3rem] font-bold text-black tracking-tighter">
            Şifre değiştirme
          </h2>
        </div>
        <div className="flex flex-col max-w-full">
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
          <CustomInput
            label="Şifreyi Onayla"
            type={inputType2}
            placeholder="Şifreyi Onayla"
            value={password2}
            onChange={setPassword2}
            icon={icon2}
            onClick={iconClick2}
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
              disabled={loading}
              type="submit"
              className="flex justify-center font-[350] px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 disabled:opacity-90 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingI className="h-7" /> : "Kaydet"}
            </button>
            {/* <div className="shrink-0 mt-10 h-px bg-slate-200 w-full" /> */}
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full">
      <div>
        {credentials.email}
        {credentials.verificationCode}
      </div>
    </div>
  );
};

export default SetNewPassword;

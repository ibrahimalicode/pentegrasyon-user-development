//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//COMP
import NotFound from "./404";
import LoadingI from "../assets/anim/loading";
import CustomInput from "../components/common/customInput";

//FUNC
import { clearAuth } from "../redux/api";

//ASSETS
import imgUrl from "../assets/img/pentegrasyon.png";

//REDUX
import {
  changePassword,
  resetChangePassword,
} from "../redux/auth/changePasswordSlice";
import {
  resetVerifyCodeState,
  codeVerification,
} from "../redux/auth/verifyCodeSlice";
import GlassFrame from "../components/common/glassFrame";

const KEY = import.meta.env.VITE_LOCAL_KEY;

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toastId = useRef();

  const { loading, success, error } = useSelector(
    (state) => state.auth.changePassword
  );
  const {
    loading: verifyL,
    success: verifyS,
    error: verifyE,
  } = useSelector((state) => state.auth.verifyCode);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState(null);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Şifreler aynı değil !");
      return;
    }
    dispatch(
      changePassword({ newPassword: password, newPasswordConfirm: password2 })
    );
  };

  useEffect(() => {
    if (success) {
      toast.dismiss(toastId.current);
      dispatch(resetChangePassword());
      toast.success("Password changed successfully");
      clearAuth();
      navigate("/login");
    }
    if (loading) {
      toastId.current = toast.loading("Loading...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
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
      dispatch(
        codeVerification({
          phoneNumberOrEmail: email,
          verificationCode: verificationCode,
        })
      );
    }
  }, [location]);

  useEffect(() => {
    if (verifyS) {
      setCredentials(null);
      navigate("/setnewpassword");
      toast.success("Code verified");
      dispatch(resetVerifyCodeState());
    }
    if (verifyE) {
      if (verifyE?.message_TR) {
        toast.error(verifyE.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      setIsError(true);
      dispatch(resetVerifyCodeState());
    }
  }, [verifyS, verifyE]);

  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem(KEY))?.token;
      setToken(token);
    } catch (error) {
      console.log("Failed to retrieve token from local storage:", error);
    }
  }, [token, verifyS]);

  return !credentials && token ? (
    <GlassFrame
      component={
        <form className="" onSubmit={handleChangePassword}>
          <div className="flex justify-center">
            <h2 className="text-[2rem] font-bold text-[--white-1] tracking-tighter whitespace-nowrap">
              Yeni şifreniz
            </h2>
          </div>
          <div className="flex flex-col max-w-full">
            <CustomInput
              label="Yeni Şifre"
              placeholder="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e)}
              letIcon={true}
              required={true}
              className="py-2 bg-transparent text-[var(--white-1)]"
              className5="text-[var(--white-1)]"
            />
            <CustomInput
              label="Şifreyi Onayla"
              placeholder="Şifreyi Onayla"
              value={password2}
              onChange={(e) => setPassword2(e)}
              letIcon={true}
              required={true}
              className="py-2 bg-transparent text-[var(--white-1)]"
              className5="text-[var(--white-1)]"
            />
            <div className="flex flex-col w-full mb-8">
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center font-[350] px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingI className="h-7" /> : "Kaydet"}
              </button>
            </div>
          </div>
        </form>
      }
    />
  ) : (
    <NotFound showGoBack={false} />
  );
};

export default SetNewPassword;

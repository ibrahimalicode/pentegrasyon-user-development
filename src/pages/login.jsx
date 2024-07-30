import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLoginState } from "../redux/auth/loginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ICONS
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";
import { GobackI } from "../assets/icon";
import LoadingI from "../assets/anim/loading";
import CustomCheckbox from "../components/common/customCheckbox";
import {
  forgotPassword,
  resetForgotPassword,
} from "../redux/auth/forgotPasswordSlice";
import {
  codeVerification,
  resetVerifyCodeState,
} from "../redux/auth/verifyCodeSlice";
import {
  EmailUserMessage,
  PhoneUserMessage,
} from "../components/common/messages";
import {
  resetUserVerification,
  userVerification,
} from "../redux/auth/userVerificationSlice";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;

function LoginPage({ pageName, setPageName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector((state) => state.auth.login);
  const {
    success: forgotSuccess,
    loading: forgotLoading,
    error: forgotError,
  } = useSelector((state) => state.auth.forgotPassword);
  const {
    success: verifyCodeSuccess,
    loading: verifyCodeLoading,
    error: verifyCodeError,
  } = useSelector((state) => state.auth.verifyCode);

  const {
    success: verifyUserSuccess,
    loading: verifyUserLoading,
    error: verifyUserError,
  } = useSelector((state) => state.auth.verifyUser);

  const [email, setEmail] = useState(""); //Careful!!!! ⚠️⚠️⚠️⚠️⚠️
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(eyeIconInv);

  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [openForget, setOpenForget] = useState(false);

  const [openVerifyCode, setOpenVerifyCode] = useState(false);
  const [openVerifyUser, setOpenVerifyUser] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

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
    if (!email || !password) return;
    dispatch(login({ email, password, role: "user" }));
  };

  const forgotPass = (e) => {
    e.preventDefault();

    if (checked) {
      console.log(phoneNumber);
      dispatch(forgotPassword({ toAddress: phoneNumber, isEmail: false }));
    } else {
      console.log(email);
      dispatch(forgotPassword({ toAddress: email, isEmail: true }));
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (checked) {
      console.log(phoneNumber, verificationCode);
      dispatch(
        codeVerification({ phoneNumberOrEmail: phoneNumber, verificationCode })
      );
    } else {
      console.log(email, verificationCode);
      dispatch(
        codeVerification({ phoneNumberOrEmail: email, verificationCode })
      );
    }
  };

  const verifyUser = (e) => {
    e.preventDefault();
    dispatch(userVerification({ phoneNumber }));
  };

  useEffect(() => {
    if (!pageName) {
      if (loading) {
        toast.dismiss();
        toast.loading("Logging in..");
      } else if (error) {
        toast.dismiss();
        if (error?.message_TR) {
          toast.error(error.message_TR);
        } else {
          toast.error("Something went wrong");
        }
        if (error?.statusCode == 422) {
          setChecked(true);
          setOpenVerifyUser(true);
          console.log("first");
        }
        dispatch(resetLoginState());
      } else if (success) {
        navigate("/dashboard");
        toast.dismiss();
        toast.success("Successfuly logged in");
        dispatch(resetLoginState());
      }
    }
  }, [loading, success, error, dispatch, navigate]);

  useEffect(() => {
    if (!pageName) {
      if (forgotSuccess) {
        setOpenVerifyCode(true);
        dispatch(resetForgotPassword());
      }
      if (forgotError) {
        toast.dismiss();
        if (forgotError?.message) {
          toast.error(forgotError.message);
        } else {
          toast.error("Something went wrong");
        }
        dispatch(resetForgotPassword());
      }
    }
  }, [forgotSuccess, forgotError, pageName]);

  useEffect(() => {
    if (!pageName) {
      if (verifyCodeSuccess) {
        toast.dismiss();
        toast.success("Code Verified");
        setOpenForget(false);
        setOpenVerifyCode(false);
        dispatch(resetVerifyCodeState());
        if (openVerifyUser) {
          setOpenVerifyUser(false);
          navigate("/");
        } else {
          navigate("/setNewPassword");
        }
      }
      if (verifyCodeError) {
        toast.dismiss();
        if (verifyCodeError?.message) {
          toast.error(verifyCodeError.message);
        } else {
          toast.error("Something went wrong");
        }
        dispatch(resetVerifyCodeState());
      }
    }
  }, [verifyCodeSuccess, verifyCodeError, pageName]);

  useEffect(() => {
    if (!pageName) {
      if (verifyUserSuccess) {
        toast.dismiss();
        toast.success("Verification has been sent");
        //setOpenVerifyUser(false);
        setOpenVerifyCode(true);
        dispatch(resetUserVerification());
      }
      if (verifyUserError) {
        toast.dismiss();
        if (verifyUserError?.message_TR) {
          toast.error(verifyCodeError.message_TR);
        } else {
          toast.error("Something went wrong");
        }
        dispatch(resetUserVerification());
      }
    }
  }, [verifyUserSuccess, verifyUserError, pageName]);

  return (
    <div className="flex items-center justify-center w-full">
      {!openForget && !openVerifyCode && !openVerifyUser ? (
        /* Login Page*/
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
              type="text"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              className="py-4"
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
            />
            <div className="flex flex-col mt-10 w-full">
              <div className="flex gap-4 text-sm leading-5 max-md:flex-wrap">
                <div className="flex-1 text-right text-[--link-1]">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenForget(true);
                      setOpenVerifyCode(false);
                    }}
                  >
                    Şifremi unuttum ?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center px-7 py-2 text-2xl rounded-md bg-[--primary-1] text-[--white-1] mt-10 font-[400] disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingI className="h-7" /> : "Giriş"}
              </button>
              <div className="shrink-0 mt-10 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <div className="text-sm leading-5 text-[--link-1] w-full text-center">
              <p>Hesabınız yok mu ?</p>
            </div>
            <button
              type="button"
              onClick={() => setPageName("register")}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--light-4] mt-10 hover:bg-[--light-3] hover:border-transparent hover:text-[--gr-1] transition-colors text-center cursor-pointer"
            >
              Kayıt ol
            </button>
          </div>
        </form>
      ) : openForget && !openVerifyCode ? (
        /* Forget Password Page*/
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={forgotPass}
        >
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center">
              <button
                type="button"
                onClick={() => {
                  setOpenForget(false);
                  setOpenVerifyCode(false);
                }}
                className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white]"
              >
                <GobackI />
                <span>Gri dön</span>
              </button>
            </div>
            <div className="w-max">
              <h2 className="text-[2.3rem] font-bold text-black tracking-tighter">
                Şifre Hatırlatma
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row py-2 mt-16 gap-2 sm:gap-16">
            <CustomCheckbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                setChecked2(checked);
              }}
              label="SMS ile gönder"
            />
            <CustomCheckbox
              checked={checked2}
              onChange={() => {
                setChecked2(!checked2);
                setChecked(checked2);
              }}
              label="E-Posta ile gönder"
            />
          </div>
          <div className="flex flex-col max-w-full">
            <CustomInput
              label={checked ? "Telefone" : "E-Posta"}
              type={checked ? "number" : "email"}
              placeholder={checked ? "Telefone" : "E-Posta"}
              value={checked ? phoneNumber : email}
              onChange={(e) => {
                checked
                  ? setPhoneNumber(e.target.value)
                  : setEmail(e.target.value);
              }}
              required={true}
            />
            <div className="flex flex-col mt-10 w-full">
              <button
                disabled={forgotLoading}
                type="submit"
                className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {forgotLoading ? <LoadingI className="h-7" /> : "Devam"}
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <div className="text-sm leading-5 text-[--link-1] w-full text-center">
              <p>Zaten Hesabınız var mı ?</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenForget(false);
                setOpenVerifyCode(false);
              }}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </button>
          </div>
        </form>
      ) : openVerifyCode ? (
        /* Code Verify Page*/
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={verifyCode}
        >
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center">
              <button
                type="button"
                onClick={() => {
                  setOpenForget(true);
                  setOpenVerifyCode(false);
                }}
                className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white]"
              >
                <GobackI />
                <span>Gri dön</span>
              </button>
            </div>
            <div className="w-max">
              <h2 className="text-[2.3rem] font-bold text-black tracking-tighter">
                Onaylama
              </h2>
            </div>
          </div>
          <div className="flex flex-col max-w-full">
            <CustomInput
              label="Onay Kodu"
              type="text"
              placeholder="Onay Kodu"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required={true}
              className="py-3"
            />
            <div className="mt-10 text-[--gr-1] font-light">
              {checked ? (
                <PhoneUserMessage number={phoneNumber} />
              ) : (
                <EmailUserMessage mail={email} />
              )}
              <br />
              Teşekkür ederiz!
            </div>
            <div className="flex flex-col mt-10 w-full">
              <button
                disabled={verifyCodeLoading}
                type="submit"
                className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {verifyCodeLoading ? <LoadingI className="h-7" /> : "Devam"}
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <div className="text-sm leading-5 text-[--link-1] w-full text-center">
              <p>Zaten Hesabınız var mı ?</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenForget(false);
                setOpenVerifyCode(false);
              }}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </button>
          </div>
        </form>
      ) : (
        openVerifyUser && (
          /* Verify User Login */
          <form
            className="flex flex-col w-full max-w-[38rem] px-12"
            onSubmit={verifyUser}
          >
            <div className="flex justify-center relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setOpenVerifyUser(false);
                  }}
                  className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white]"
                >
                  <GobackI />
                  <span>Gri dön</span>
                </button>
              </div>
              <div className="w-max">
                <h2 className="text-[2.3rem] font-bold text-black tracking-tighter">
                  Onayla
                </h2>
              </div>
            </div>
            <div className="flex flex-col max-w-full">
              <CustomInput
                label="Telefone"
                type="number"
                placeholder="Telefone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={true}
              />
              <div className="flex flex-col mt-10 w-full">
                <button
                  disabled={verifyUserLoading}
                  type="submit"
                  className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
                >
                  {verifyUserLoading ? <LoadingI className="h-7" /> : "Devam"}
                </button>
                <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
              </div>
            </div>
            <div className="flex flex-col mt-10 w-full">
              <div className="text-sm leading-5 text-[--link-1] w-full text-center">
                <p>Zaten Hesabınız var mı ?</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpenVerifyUser(false);
                }}
                className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
              >
                Giriş yap
              </button>
            </div>
          </form>
        )
      )}
    </div>
  );
}

export default LoginPage;

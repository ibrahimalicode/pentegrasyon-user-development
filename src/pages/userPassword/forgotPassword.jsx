import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  forgotPassword,
  resetForgotPassword,
} from "../../redux/auth/forgotPasswordSlice";
import LoadingI from "../../assets/anim/loading";
import { GobackI } from "../../assets/icon";
import CustomCheckbox from "../../components/common/customCheckbox";
import CustomInput from "../../components/common/CustomInput";
import {
  codeVerification,
  resetVerifyCodeState,
} from "../../redux/auth/verifyCodeSlice";
import {
  EmailUserMessage,
  PhoneUserMessage,
} from "../../components/common/messages";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector(
    (state) => state.auth.forgotPassword
  );
  const {
    loading: verifyCodeLoading,
    success: verifyCodeSuccess,
    error: verifyCodeError,
  } = useSelector((state) => state.auth.verifyCode);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [openVerifyCode, setOpenVerifyCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const sendCode = (e) => {
    e.preventDefault();
    if (checked && phoneNumber) {
      console.log(phoneNumber);
      dispatch(
        forgotPassword({ toAddress: phoneNumber.slice(1), isEmail: false })
      );
    } else if (email) {
      console.log(email);
      dispatch(forgotPassword({ toAddress: email, isEmail: true }));
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (checked) {
      dispatch(
        codeVerification({
          phoneNumberOrEmail: phoneNumber,
          verificationCode,
        })
      );
    } else {
      dispatch(
        codeVerification({
          phoneNumberOrEmail: email,
          verificationCode,
        })
      );
    }
  };

  useEffect(() => {
    if (success) {
      setOpenVerifyCode(true); /// here
      dispatch(resetForgotPassword());
    }
    if (error) {
      toast.dismiss();
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetForgotPassword());
    }
  }, [success, error]);

  useEffect(() => {
    if (verifyCodeLoading) {
      toast.loading("Loading...");
    }
    if (verifyCodeSuccess) {
      toast.dismiss();
      toast.success("Code verified");
      navigate("/setNewPassword");
      dispatch(resetVerifyCodeState());
    }
    if (verifyCodeError) {
      toast.dismiss();
      if (verifyCodeError?.message) {
        toast.error(verifyCodeError.message);
      } else {
        toast.error("Couldn't verify");
      }
      dispatch(resetVerifyCodeState());
    }
  }, [verifyCodeLoading, verifyCodeSuccess, verifyCodeError]);

  return (
    <section className="p-0 sm:overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[100dvh] bg-white">
        <div className="flex items-center justify-center w-full">
          {!openVerifyCode ? (
            /* Send code via Email or PhoneNumber */
            <form
              className="flex flex-col w-full max-w-[38rem] px-12"
              onSubmit={sendCode}
            >
              <div className="flex justify-center relative">
                <div className="absolute left-0 top-0 bottom-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      window.history.back();
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
                    disabled={loading}
                    type="submit"
                    className="flex justify-center px-7 py-2 text-lg font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    {loading ? <LoadingI className="h-7" /> : "Devam"}
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
                  className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
                >
                  <a href="/login">Giriş yap</a>
                </button>
              </div>
            </form>
          ) : (
            /* Verify the code */
            <form
              className="flex flex-col w-full max-w-[38rem] px-12"
              onSubmit={verifyCode}
            >
              <div className="flex justify-center relative">
                <div className="absolute left-0 top-0 bottom-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setOpenVerifyCode(false)}
                    className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white] sm:hover:text-[--white-1] sm:hover:bg-[--primary-1]"
                  >
                    <GobackI />
                    <span>Gri dön</span>
                  </button>
                </div>
                <div className="w-max">
                  <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
                    Doğrulama
                  </h2>
                </div>
              </div>
              <div className="flex flex-col max-w-full">
                <CustomInput
                  label="Doğrulama Codu"
                  type="text"
                  placeholder="Doğrulama Codu"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required={true}
                />
                <div className="mt-10 text-[--gr-1] font-light">
                  {checked ? (
                    <PhoneUserMessage number={phoneNumber.slice(1)} />
                  ) : (
                    <EmailUserMessage number={email} />
                  )}
                </div>
                <div className="flex flex-col mt-10 w-full">
                  <button
                    type="submit"
                    className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    {verifyCodeLoading ? <LoadingI className="h-7" /> : "Devam"}
                  </button>
                  <div className="shrink-0 mt-5 h-px bg-slate-200 w-full mb-24" />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

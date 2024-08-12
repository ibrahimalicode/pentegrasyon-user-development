import { useEffect, useState } from "react";
import {
  resetUserVerification,
  sendUserVerificationCode,
} from "../../redux/auth/userVerificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { GobackI } from "../../assets/icon";
import CustomInput from "../../components/common/customInput";
import LoadingI from "../../assets/anim/loading";
import { PhoneUserMessage } from "../../components/common/messages";
import {
  codeVerification,
  resetVerifyCodeState,
} from "../../redux/auth/verifyCodeSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomPhoneInput from "../../components/common/customPhoneInput";

const UserVerifyLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector(
    (state) => state.auth.verifyUser
  );
  const {
    success: verifyCodeSuccess,
    loading: verifyCodeLoading,
    error: verifyCodeError,
  } = useSelector((state) => state.auth.verifyCode);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [openVerifyCode, setOpenVerifyCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const sendCode = (e) => {
    e.preventDefault();
    dispatch(sendUserVerificationCode({ phoneNumber: phoneNumber.slice(1) }));
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      console.log(phoneNumber, verificationCode);
      dispatch(
        codeVerification({
          phoneNumberOrEmail: phoneNumber.slice(1),
          verificationCode,
        })
      );
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Verification has been sent");
      setOpenVerifyCode(true);
      dispatch(resetUserVerification());
    }
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUserVerification());
    }
  }, [success, loading]);

  useEffect(() => {
    if (verifyCodeSuccess) {
      toast.success("Code Verified");
      setOpenVerifyCode(false);
      dispatch(resetVerifyCodeState());
      navigate("/");
    }
    if (verifyCodeError) {
      if (verifyCodeError?.message) {
        toast.error(verifyCodeError.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetVerifyCodeState());
    }
  }, [verifyCodeSuccess, verifyCodeError]);

  return (
    <section className="p-0 sm:overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[100dvh] bg-white">
        <div className="flex items-center justify-center w-full">
          {!openVerifyCode ? (
            /* Take Phone Number */
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
                    Onaylama
                  </h2>
                </div>
              </div>
              <div className="flex flex-col max-w-full">
                <CustomPhoneInput
                  label="Telefone"
                  type="number"
                  placeholder="Telefone"
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  required={true}
                  className="py-3"
                />
                <div className="flex flex-col mt-10 w-full">
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    {loading ? <LoadingI className="h-7" /> : "Devam"}
                  </button>
                  <div className="shrink-0 mt-5 h-px bg-slate-200 w-full mb-24" />
                </div>
              </div>
            </form>
          ) : (
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
                  onChange={(e) => setVerificationCode(e)}
                  required={true}
                  className="py-3"
                />
                <div className="mt-10 text-[--gr-1] font-light">
                  <PhoneUserMessage number={phoneNumber.slice(1)} />
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

export default UserVerifyLogin;

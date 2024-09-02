//MODULES
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { GobackI } from "../../assets/icon";
import { PhoneUserMessage } from "./messages";
import MinuteCountdown from "./minuteCountdown";
import LoadingI from "../../assets/anim/loading";
import VerificationInputs from "./customVerificationInputs";

//FUNC
import { spacePhoneNumber } from "../../utils/utils";

//REDUX
import {
  codeVerification,
  resetVerifyCodeState,
} from "../../redux/auth/verifyCodeSlice";
import {
  resetUserVerification,
  sendUserVerificationCode,
} from "../../redux/auth/userVerificationSlice";

const VerifyCode = ({ setToConfirm, phoneNumber, numInputs = 4 }) => {
  const toastId = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.auth.verifyCode
  );

  const {
    success: sendSuccess,
    loading: sendLoading,
    error: sendError,
  } = useSelector((state) => state.auth.verifyUser);

  const [minutes, setMinutes] = useState(2);
  const [verificationCode, setVerificationCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (minutes === 0) {
      sendCode();
    } else {
      verifyCode();
    }
  }

  function verifyCode() {
    dispatch(
      codeVerification({
        phoneNumberOrEmail: phoneNumber.slice(1),
        verificationCode,
      })
    );
  }

  function sendCode() {
    dispatch(sendUserVerificationCode({ phoneNumber: phoneNumber.slice(1) }));
  }

  // TOAST AND ACTION FOR VERIFY CODE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Loading...");
    }
    if (success) {
      navigate("/login");
      toast.dismiss(toastId.current);
      toast.success("Verified Successfully");
      dispatch(resetVerifyCodeState());
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Couldn't verify");
      }
      dispatch(resetVerifyCodeState());
    }
  }, [loading, success, error]);

  //TOAST AND ACTION FOR SEND CODE
  useEffect(() => {
    if (sendSuccess) {
      toast.success("Verification has been sent");
      setMinutes(2);
      dispatch(resetUserVerification());
    }
    if (sendError) {
      if (sendError?.message_TR) {
        toast.error(sendError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUserVerification());
    }
  }, [sendSuccess, sendLoading]);

  return (
    <form className="px-12" onSubmit={handleSubmit}>
      <div className="flex justify-center relative">
        <div className="absolute left-0 top-0 bottom-0 flex items-center">
          <button
            type="button"
            onClick={() => setToConfirm(false)}
            className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--white-1]"
          >
            <GobackI strokeWidth={2} className="size-[1.7rem]" />
            {/* <span>Geri dön</span> */}
          </button>
        </div>

        <div className="w-max">
          <h2 className="text-[2.7rem] font-bold text-[--white-1] tracking-tighter">
            Onayla
          </h2>
        </div>
      </div>

      <div>
        <MinuteCountdown minutes={minutes} setMinutes={setMinutes} />
      </div>

      <div className="flex flex-col items-center mt-5">
        <VerificationInputs
          numInputs={numInputs}
          onChange={(e) => setVerificationCode(e)}
          label="Doğrulama Kodu"
          required={minutes > 0}
          disabled={minutes <= 0}
        />

        <div className="mt-10 text-[--white-1]">
          <PhoneUserMessage number={spacePhoneNumber(phoneNumber)} />
        </div>

        <div className="flex flex-col mt-10 w-full">
          <button
            type="submit"
            className="flex justify-center px-7 py-2 text-lg rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingI className="h-7" />
            ) : (
              `${minutes === 0 ? "Tekrar Gönder" : "Doğrula"}`
            )}
          </button>
          <div className="shrink-0 h-px bg-slate-200 w-full mt-24" />
        </div>
      </div>
    </form>
  );
};

export default VerifyCode;

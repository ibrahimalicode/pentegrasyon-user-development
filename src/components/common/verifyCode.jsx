//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { GobackI } from "../../assets/icon";
import MinuteCountdown from "./minuteCountdown";
import { AuthHeader, AuthSubmit } from "./authKit";
import VerificationInputs from "./customVerificationInputs";
import { EmailUserMessage, PhoneUserMessage } from "./messages";

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

const VerifyCode = ({
  reSend,
  onSuccess,
  setToConfirm,
  phoneNumber,
  numInputs = 4,
}) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.auth.verifyCode
  );

  const {
    success: sendSuccess,
    loading: sendLoading,
    error: sendError,
  } = useSelector((state) => state.auth.verifyUser);

  const { success: sendForgotSucc } = useSelector(
    (state) => state.auth.forgotPassword
  );

  const isEmail = !/^\d+$/.test(phoneNumber);
  let phoneNumberOrEmail = !isEmail ? phoneNumber.slice(1) : phoneNumber;
  const [minutes, setMinutes] = useState(2);
  const [verificationCode, setVerificationCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (minutes === 0) {
      sendCode(e);
    } else {
      verifyCode(e);
    }
  }

  function verifyCode(e) {
    dispatch(
      codeVerification({
        phoneNumberOrEmail,
        verificationCode,
      })
    );
  }

  function sendCode(e) {
    if (reSend) {
      reSend(e);
      return;
    }
    dispatch(sendUserVerificationCode({ phoneNumber: phoneNumberOrEmail }));
  }

  // TOAST AND ACTION FOR VERIFY CODE
  useEffect(() => {
    if (loading) {
      toast.loading("İşleniyor...");
    }
    if (success) {
      onSuccess();
      toast.dismiss();
      toast.success("Onay Kodu Doğrulandı");
      dispatch(resetVerifyCodeState());
    }
    if (error) {
      toast.dismiss();
      toast.error(error.message);
      dispatch(resetVerifyCodeState());
    }
  }, [loading, success, error]);

  //TOAST AND ACTION FOR SEND VERIFICATION CODE
  useEffect(() => {
    if (sendSuccess) {
      toast.dismiss();
      setMinutes(2);
      toast.success("Onay Kodu Gönderildi");
      dispatch(resetUserVerification());
    }
    if (sendError) {
      toast.dismiss();
      toast.error(sendError.message);
      dispatch(resetUserVerification());
    }
  }, [sendSuccess, sendLoading, sendError]);

  //TOAST AND ACTION FOR SEND FORGOT CODE
  useEffect(() => {
    if (sendForgotSucc) {
      setMinutes(2);
    }
  }, [sendForgotSucc]);

  return (
    <form className="light" onSubmit={handleSubmit}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setToConfirm(false)}
          className="absolute right-0 top-1 flex items-center gap-x-2 text-sm text-[--gr-1] hover:text-[--black-1] transition-colors"
        >
          <GobackI strokeWidth={2} className="size-[1.7rem]" />
        </button>

        <AuthHeader title="Onayla" />
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

        <div className="mt-10 text-[--black-1]">
          {isEmail ? (
            <EmailUserMessage mail={phoneNumber} />
          ) : (
            <PhoneUserMessage number={spacePhoneNumber(phoneNumber)} />
          )}
        </div>

        <AuthSubmit loading={loading}>
          {minutes === 0 ? "Tekrar Gönder" : "Doğrula"}
        </AuthSubmit>
      </div>
    </form>
  );
};

export default VerifyCode;

//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import {
  forgotPassword,
  resetForgotPassword,
} from "../redux/auth/forgotPasswordSlice";

//COMP
import VerifyCode from "../components/common/verifyCode";
import GlassFrame from "../components/common/glassFrame";
import CustomInput from "../components/common/customInput";
import CustomCheckbox from "../components/common/customCheckbox";
import CustomPhoneInput from "../components/common/customPhoneInput";
import { AuthHeader, AuthSubmit } from "../components/common/authKit";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector(
    (state) => state.auth.forgotPassword,
  );

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [toVerify, setToVerify] = useState(false);

  const sendCode = (e) => {
    e?.preventDefault();
    if (checked && phoneNumber) {
      dispatch(
        forgotPassword({ toAddress: phoneNumber.slice(1), isEmail: false }),
      );
    } else if (email) {
      dispatch(forgotPassword({ toAddress: email, isEmail: true }));
    }
  };

  useEffect(() => {
    if (success) {
      setToVerify(true);
      dispatch(resetForgotPassword());
      toast.success("Onay kodu gönderildi");
    }
    if (error) {
      toast.error(error.message);
      dispatch(resetForgotPassword());
    }
  }, [success, error]);

  return (
    <GlassFrame
      component={
        !toVerify ? (
          /* Send code via Email or PhoneNumber */
          <form className="flex flex-col w-full" onSubmit={sendCode}>
            <AuthHeader
              title="Şifre Hatırlatma"
              subtitle="Onay kodu göndermek için sistemde kayıtlı olan telefon numaranızı veya mail adresinizi giriniz."
            />
            <div className="w-full flex gap-4">
              <CustomCheckbox
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                  setChecked2(checked);
                }}
                label="SMS ile gönder"
                className2="whitespace-nowrap"
              />
              <CustomCheckbox
                checked={checked2}
                onChange={() => {
                  setChecked2(!checked2);
                  setChecked(checked2);
                }}
                label="E-Posta ile gönder"
                className2="whitespace-nowrap"
              />
            </div>
            {checked ? (
              <CustomPhoneInput
                label="Telefon"
                placeholder="Telefon"
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                className="py-2"
                className5=""
              />
            ) : (
              <CustomInput
                label="E-Posta"
                type="email"
                placeholder="E-Posta"
                value={email}
                onChange={(e) => setEmail(e)}
                required={true}
                className="py-2"
                className5=""
              />
            )}

            <AuthSubmit loading={loading}>Gönder</AuthSubmit>

            <button
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="w-full h-11 mt-3 text-base font-medium rounded-lg border border-solid border-[--border-1] text-[--black-2] hover:bg-[--light-3] transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        ) : (
          /* Verify the code */
          <VerifyCode
            setToConfirm={setToVerify}
            phoneNumber={checked ? phoneNumber : email}
            onSuccess={() => navigate("/setNewPassword")}
            reSend={() => sendCode()}
          />
        )
      }
    />
  );
};

export default ForgotPassword;

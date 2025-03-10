//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomInput from "../../common/customInput";
import { usePopup } from "../../../context/PopupContext";
import { useProtectPages } from "../../../context/ProtectPagesContext";

//REDUX
import {
  sendSMSUserLockPasswordReset,
  restSendSMSUserLockPasswordReset,
} from "../../../redux/sms/sendSMSUserLockPasswordResetSlice";
import {
  restSendEmailUserLockPasswordReset,
  sendEmailUserLockPasswordReset,
} from "../../../redux/email/sendEmailUserLockPasswordResetSlice";

const AuthorizePopup = ({ setIsAuthorized }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setPopupContent } = usePopup();
  const { protectedPages } = useProtectPages();

  const { user } = useSelector((state) => state.user.getUser);

  const { loading: smsLoading, success: smsSuccess } = useSelector(
    (state) => state.sms.sendLockPass
  );

  const { loading: emailLoading, success: emailSuccess } = useSelector(
    (state) => state.email.sendLockPass
  );

  const [password, setPassword] = useState("");
  const [toPassReset, setToPassReset] = useState(false);

  function close() {
    setPopupContent(null);
    navigate("/orders");
  }

  function handleSubmit() {
    if (protectedPages.password === password) {
      setIsAuthorized(true);
      setPopupContent(null);
    } else {
      toast.error("Yanlış Şifre.");
    }
  }

  function handleForgetPass(type) {
    if (smsLoading || emailLoading) return;
    if (type === 0) {
      dispatch(sendEmailUserLockPasswordReset());
    } else {
      dispatch(sendSMSUserLockPasswordReset());
    }
  }

  useEffect(() => {
    if (smsLoading) toast.loading("İşleniyor");
    else if (smsSuccess) {
      toast.dismiss();
      setToPassReset(false);
      const elmnt = (
        <p>
          Parolanız{" "}
          <span className="text-[--link-1] font-bold">{user.phoneNumber}</span>{" "}
          numaralı telefonunuza gönderildi.
        </p>
      );
      toast.success(elmnt);
    }
    dispatch(restSendSMSUserLockPasswordReset());
  }, [smsSuccess, smsLoading]);

  useEffect(() => {
    if (emailLoading) toast.loading("İşleniyor");
    else if (emailSuccess) {
      toast.dismiss();
      setToPassReset(false);
      const elmnt = (
        <p>
          Parolanız{" "}
          <span className="text-[--link-1] font-bold">{user.email}</span>{" "}
          E-Posta adresinize gönderildi.
        </p>
      );
      toast.success(elmnt);
    }
    dispatch(restSendEmailUserLockPasswordReset());
  }, [emailSuccess, emailLoading]);

  return (
    <main className="flex justify-center text-[--black-1]">
      <div className="w-full bg-[--white-1] p-5 rounded-md max-w-lg">
        {toPassReset ? (
          <h1 className="text-center text-2xl font-bold pt-2">
            Şifrenizi Göndereceğiz
          </h1>
        ) : (
          <h1 className="text-center text-3xl font-bold pt-2">Şifreniz</h1>
        )}

        {toPassReset ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col w-max my-10 gap-4">
              <button
                onClick={() => handleForgetPass(0)}
                disabled={smsLoading || emailLoading}
                className="bg-[--primary-1] text-white py-1.5 px-10 rounded-md border border-[--primary-1]"
              >
                E-Posta ile gönder
              </button>
              <button
                onClick={handleForgetPass}
                disabled={smsLoading || emailLoading}
                className="bg-[--primary-1] text-white py-1.5 px-3 rounded-md border border-[--primary-1]"
              >
                SMS ile gönder
              </button>
            </div>

            <div className="w-full flex gap-3 justify-end pt-6 pb-3">
              <button
                onClick={close}
                className="bg-[--status-red] text-[--red-1] py-1.5 px-3 rounded-sm border border-[--red-1]"
              >
                Kapat
              </button>

              <button
                onClick={() => setToPassReset(false)}
                className="bg-[--status-green] text-[--green-1] py-1.5 px-6 rounded-sm border border-[--green-1]"
              >
                Geri
              </button>
            </div>
          </div>
        ) : (
          <div>
            <CustomInput
              value={password}
              letIcon
              label="Şifrenizi giriniz"
              onChange={(e) => setPassword(e)}
            />
            <p
              className="text-[--link-1] text-end py-2 cursor-pointer"
              onClick={() => setToPassReset(true)}
            >
              Şifremi unuttum?
            </p>

            <div className="flex gap-5 justify-end pt-6 pb-3">
              <button
                onClick={close}
                className="bg-[--status-red] text-[--red-1] py-1.5 px-3 rounded-sm border border-[--red-1]"
              >
                Vazgeç
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[--status-green] text-[--green-1] py-1.5 px-3 rounded-sm border border-[--green-1]"
              >
                Tamam
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AuthorizePopup;

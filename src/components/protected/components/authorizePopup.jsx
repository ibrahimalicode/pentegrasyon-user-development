import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../context/PopupContext";
import CustomInput from "../../common/customInput";
import { useState } from "react";
import { useProtectPages } from "../../../context/ProtectPagesContext";
import toast from "react-hot-toast";

const AuthorizePopup = ({ setIsAuthorized }) => {
  const navigate = useNavigate();
  const { setPopupContent } = usePopup();
  const { protectedPages } = useProtectPages();

  const [password, setPassword] = useState("");

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

  return (
    <main className="bg-[--white-1] p-5 rounded-md">
      <h1 className="text-center text-3xl font-bold pt-2">Şifreniz</h1>
      <CustomInput
        value={password}
        letIcon
        label="Şifrenizi giriniz"
        onChange={(e) => setPassword(e)}
      />
      <p className="text-[--link-1] text-end py-2">Şifremi unuttum?</p>

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
    </main>
  );
};

export default AuthorizePopup;

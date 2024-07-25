import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";

// ICONS
import toast from "react-hot-toast";
import GobackI from "../assets/icon/goback";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../redux/auth/verifyCodeSlice";
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";

const RegisterPage = ({ setFormName }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.auth.code);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [toConfirm, setToConfirm] = useState(false);
  const [smsCode, setSmsCode] = useState("");

  const [icon, setIcon] = useState(<EyeInv />);
  const [icon2, setIcon2] = useState(<EyeInv />);

  const confirmUser = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }
    if ((name, phone, password)) {
      dispatch(verifyCode({ phone: "533 969 57 61", code: "123456" }));
      setToConfirm(true);
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (smsCode === "123456") {
      console.log("register");
      toast.dismiss();
      toast.success("Registered successfully");
    } else {
      toast.dismiss();
      toast.error("Wrong Code");
    }
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else if (success) {
      toast.dismiss();
      toast.success("SMS has beeen sent successfully");
    } else if (error) {
      toast.error("Couldn't send SMS");
    }
  }, [loading, success, error]);

  const iconClick = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setIcon(<EyeI />);
    } else {
      setInputType("password");
      setIcon(<EyeInv />);
    }
  };
  const iconClick2 = (e) => {
    e.preventDefault();
    if (inputType2 === "password") {
      setInputType2("text");
      setIcon2(<EyeI />);
    } else {
      setInputType2("password");
      setIcon2(<EyeInv />);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {!toConfirm ? (
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={confirmUser}
        >
          <div className="flex justify-center">
            <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
              Kayıt ol
            </h2>
          </div>
          <div className="flex flex-col max-w-full">
            <CustomInput
              label="Ad Soyad"
              type="text"
              placeholder="Ad Soyad"
              value={name}
              onChange={setName}
              required={true}
            />
            <CustomInput
              label="Telefon"
              type="tel"
              placeholder="Telefon"
              value={phone}
              onChange={setPhone}
              required={true}
            />
            <CustomInput
              label="Şifre"
              type={inputType}
              placeholder="Şifre"
              value={password}
              onChange={setPassword}
              icon={icon}
              onClick={iconClick}
              required={true}
            />
            <CustomInput
              label="Şifreyi onayla"
              type={inputType2}
              placeholder="Şifre"
              value={password2}
              onChange={setPassword2}
              icon={icon2}
              onClick={iconClick2}
              required={true}
            />
            <div className="flex flex-col mt-10 w-full">
              <button
                type="submit"
                className="px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1]"
              >
                Devam
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <p className="text-sm leading-5 text-[--link-1] w-full text-center">
              <a href="/">Hesabınız var mı ?</a>
            </p>
            <span
              onClick={() => setFormName(null)}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </span>
          </div>
        </form>
      ) : (
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={registerUser}
        >
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center">
              <button
                onClick={() => setToConfirm(false)}
                className="flex items-center justify-center px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white] hover:text-[--white-1] hover:bg-[--primary-1]"
              >
                <GobackI />
                <span>Gri dön</span>
              </button>
            </div>
            <div className="w-max">
              <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
                Onayla
              </h2>
            </div>
          </div>
          <div className="flex flex-col max-w-full">
            <CustomInput
              label="Doğrulama Codu"
              type="number"
              placeholder="Doğrulama Codu"
              value={smsCode}
              onChange={setSmsCode}
              required={true}
            />
            <div className="mt-10 text-[--gr-1] font-light">
              Telefon numaranıza bir onay kodu gönderdik. Lütfen SMS
              mesajlarınızı kontrol edin ve kodu doğrulama işlemi için girin.
              <br />
              Teşekkür ederiz!
            </div>
            <div className="flex flex-col mt-10 w-full">
              <button
                type="submit"
                className="px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1]"
              >
                Devam
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <p className="text-sm leading-5 text-[--link-1] w-full text-center">
              <a href="/">Hesabınız var mı ?</a>
            </p>
            <span
              onClick={() => setFormName(null)}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;

import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";

// ICONS
import toast from "react-hot-toast";
import GobackI from "../assets/icon/goback";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../redux/auth/verifyCodeSlice";
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";
import CustomSelect from "../components/common/CustomSelector";
import cities from "../assets/json/cities";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;

const RegisterPage = ({ setFormName }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.auth.code);

  const [name, setName] = useState("");
  const [sirName, setSirName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [toConfirm, setToConfirm] = useState(false);
  const [smsCode, setSmsCode] = useState("");

  const [icon, setIcon] = useState(eyeIconInv);
  const [icon2, setIcon2] = useState(eyeIconInv);

  const confirmUser = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }
    if (name && sirName && phone && city?.value && password) {
      console.log(name, sirName, phone, city.value, password);
      setToConfirm(true);
    } else {
      console.log("first");
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
      setIcon(eyeIconVis);
    } else {
      setInputType("password");
      setIcon(eyeIconInv);
    }
  };
  const iconClick2 = (e) => {
    e.preventDefault();
    if (inputType2 === "password") {
      setInputType2("text");
      setIcon2(eyeIconVis);
    } else {
      setInputType2("password");
      setIcon2(eyeIconInv);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {!toConfirm ? (
        /* Register Page */
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
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomInput
                label="Ad"
                type="text"
                placeholder="Ad"
                value={name}
                onChange={setName}
                required={true}
              />
              <CustomInput
                label="Soyad"
                type="text"
                placeholder="Ad Soyad"
                value={sirName}
                onChange={setSirName}
                required={true}
              />
            </div>
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomInput
                label="Telefon"
                type="tel"
                placeholder="Telefon"
                value={phone}
                onChange={setPhone}
                required={true}
              />
              <CustomSelect
                label="Il"
                options={cities}
                value={city ? city : { label: "Il" }}
                onChange={setCity}
                className="w-full"
                className2="container-class"
              />
            </div>

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
            <div className="flex flex-col mt-4 sm:mt-10 w-full">
              <button
                type="submit"
                className="px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1]"
              >
                Devam
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-4 sm:mt-10 w-full">
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
        /* Verify Page*/
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={registerUser}
        >
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center">
              <button
                onClick={() => setToConfirm(false)}
                className="flex items-center justify-center sm:px-5 py-2 text-sm transition-colors duration-200 border-0 rounded-lg gap-x-2 text-[--link-1] bg-[--white] sm:hover:text-[--white-1] sm:hover:bg-[--primary-1]"
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
              {phone} telefon numaranıza bir onay kodu gönderdik. Lütfen SMS
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

import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";

// ICONS
import toast from "react-hot-toast";
import GobackI from "../assets/icon/goback";
import { useDispatch, useSelector } from "react-redux";
import EyeI from "../assets/icon/eye";
import EyeInv from "../assets/icon/eyeInv";
import CustomSelect from "../components/common/CustomSelector";
import cities from "../assets/json/cities";
import LoadingI from "../assets/anim/loading";
import { registerUser, resetRgisterState } from "../redux/auth/registerSlice";
import {
  resetVerifyCodeState,
  verifyCode,
} from "../redux/auth/verifyCodeSlice";
import { PhoneUserMessage } from "../components/common/messages";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;

const RegisterPage = ({ pageName, setPageName }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.auth.register
  );
  const {
    loading: verifyL,
    success: verifyS,
    error: verifyE,
  } = useSelector((state) => state.auth.verify);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [toConfirm, setToConfirm] = useState(false);
  const [smsCode, setSmsCode] = useState("");

  const [icon, setIcon] = useState(eyeIconInv);
  const [icon2, setIcon2] = useState(eyeIconInv);

  const register = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }
    if (firstName && lastName && phoneNumber && city?.value && password) {
      console.log(
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        city.value,
        address
      );
      dispatch(
        registerUser({
          email,
          phoneNumber,
          password,
          firstName,
          lastName,
          city: city.value,
          address,
        })
      );
    } else {
      console.log("Fill all the inputs");
      toast("Fill all the inputs");
    }
  };

  const verify = (e) => {
    e.preventDefault();
    dispatch(
      verifyCode({ phoneNumberOrEmail: phoneNumber, verificationCode: smsCode })
    );
  };

  // USE EFFECTS
  useEffect(() => {
    if (success) {
      setToConfirm(true);
    }
  }, [success]);

  useEffect(() => {
    if (pageName) {
      if (loading) {
        toast.loading("Loading...");
      } else if (success) {
        toast.dismiss();
        toast.success("SMS has beeen sent successfully");
        resetRgisterState();
      } else if (error) {
        toast.dismiss();
        if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("Couldn't send SMS");
        }
        resetRgisterState();
      }
    }
  }, [loading, success, error, pageName]);

  useEffect(() => {
    if (pageName) {
      if (verifyL) {
        toast.loading("Loading...");
      } else if (verifyS) {
        toast.dismiss();
        toast.success("Registered Successfully");
        setPageName(null);
        resetVerifyCodeState();
      } else if (verifyE) {
        toast.dismiss();
        if (verifyE?.message) {
          toast.error(verifyE.message);
        } else {
          toast.error("Couldn't register");
        }
        resetVerifyCodeState();
      }
    }
  }, [verifyL, verifyS, verifyE, pageName]);

  // ICON RELATED
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
          onSubmit={register}
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
                value={firstName}
                onChange={setFirstName}
                required={true}
                className="py-2"
              />
              <CustomInput
                label="Soyad"
                type="text"
                placeholder="Ad Soyad"
                value={lastName}
                onChange={setLastName}
                required={true}
                className="py-2"
              />
            </div>
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomInput
                label="Telefon"
                type="tel"
                placeholder="Telefon"
                value={phoneNumber}
                onChange={setPhoneNumber}
                required={true}
                className="py-2"
              />
              <CustomInput
                label="E-Posta"
                type="email"
                placeholder="E-Posta"
                value={email}
                onChange={setEmail}
                required={true}
                className="py-2"
              />
            </div>
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomSelect
                label="Il"
                options={cities}
                value={city ? city : { label: "Il" }}
                onChange={setCity}
                className="w-full"
                className2="container-class"
                style={{ padding: "2px 0px" }}
              />
              <CustomInput
                label="Adres"
                type="address"
                placeholder="Adres"
                value={address}
                onChange={setAddress}
                required={true}
                className="py-2"
              />
            </div>

            <div>
              <CustomInput
                label="Şifre"
                type={inputType}
                placeholder="Şifre"
                value={password}
                onChange={setPassword}
                icon={icon}
                onClick={iconClick}
                required={true}
                className="py-2"
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
                className="py-2"
              />
            </div>
            <div className="flex flex-col mt-4 sm:mt-10 w-full">
              <button
                type="submit"
                className={`flex justify-center px-7 py-2 text-xl font-light rounded-md hover:opacity-90 ${
                  loading
                    ? "border border-solid border-[--light-3]"
                    : "bg-[--primary-1] text-[--white-1]"
                }`}
                disabled={loading}
              >
                {loading ? <LoadingI className="h-7" /> : "Devam"}
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-4 sm:mt-10 w-full">
            <div className="text-sm leading-5 text-[--link-1] w-full text-center">
              <p>Hesabınız var mı ?</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => setPageName(null)}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-1] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </button>
          </div>
        </form>
      ) : (
        /* Verify Page*/
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={verify}
        >
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center">
              <button
                type="button"
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
              type="text"
              placeholder="Doğrulama Codu"
              value={smsCode}
              onChange={setSmsCode}
              required={true}
            />
            <div className="mt-10 text-[--gr-1] font-light">
              <PhoneUserMessage number={phoneNumber} />
            </div>
            <div className="flex flex-col mt-10 w-full">
              <button
                type="submit"
                className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {verifyL ? <LoadingI className="h-7" /> : "Devam"}
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full" />
            </div>
          </div>
          <div className="flex flex-col mt-10 w-full">
            <p className="text-sm leading-5 text-[--link-1] w-full text-center">
              <a href="/">Hesabınız var mı ?</a>
            </p>
            <button
              type="button"
              onClick={() => setPageName(null)}
              className="px-7 py-2 text-xl rounded-md border border-solid border-[--gr-2] mt-5 hover:bg-[--light-4] hover:border-transparent transition-colors text-center cursor-pointer"
            >
              Giriş yap
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;

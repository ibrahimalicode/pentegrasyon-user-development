import { useEffect, useState } from "react";
import CustomInput from "../../components/common/CustomInput";

// ICONS
import toast from "react-hot-toast";
import GobackI from "../../assets/icon/goback";
import { useDispatch, useSelector } from "react-redux";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";
import CustomSelect from "../../components/common/CustomSelector";
import cities from "../../assets/json/cities";
import LoadingI from "../../assets/anim/loading";
import {
  registerUser,
  resetRgisterState,
} from "../../redux/auth/registerSlice";
import {
  codeVerification,
  resetVerifyCodeState,
} from "../../redux/auth/verifyCodeSlice";
import { PhoneUserMessage } from "../../components/common/messages";
import { useNavigate } from "react-router-dom";

const eyeIconVis = <EyeI className="w-5" />;
const eyeIconInv = <EyeInv className="w-5" />;

const UserRegister = ({ setPageName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(
    (state) => state.auth.register
  );
  const {
    loading: verifyCodeLoading,
    success: verifyCodeSuccess,
    error: verifyCodeError,
  } = useSelector((state) => state.auth.verifyCode);

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
  const [verificationCode, setVerificationCode] = useState("");

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

  const verifyCode = (e) => {
    e.preventDefault();
    dispatch(
      codeVerification({
        phoneNumberOrEmail: phoneNumber,
        verificationCode,
      })
    );
  };

  const goToLogin = () => {
    setPageName(null);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setCity(null);
    setAddress("");
    setInputType("password");
    setIcon(eyeIconInv);
    setInputType2("password");
    setIcon2(eyeIconInv);

    setToConfirm(false);
    setVerificationCode("");
  };

  // USE EFFECTS
  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else if (success) {
      toast.dismiss();
      setToConfirm(true);
      toast.success("SMS has beeen sent successfully");
      dispatch(resetRgisterState());
    } else if (error) {
      toast.dismiss();
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Couldn't send SMS");
      }
      dispatch(resetRgisterState());
    }
  }, [loading, success, error]);

  useEffect(() => {
    if (verifyCodeLoading) {
      toast.loading("Loading...");
    }
    if (verifyCodeSuccess) {
      toast.dismiss();
      toast.success("Registered Successfully");
      setPageName(null); // To the UserLogin
      navigate("/");
      dispatch(resetVerifyCodeState());
    }
    if (verifyCodeError) {
      toast.dismiss();
      if (verifyCodeError?.message) {
        toast.error(verifyCodeError.message);
      } else {
        toast.error("Couldn't register");
      }
      dispatch(resetVerifyCodeState());
    }
  }, [verifyCodeLoading, verifyCodeSuccess, verifyCodeError]);

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
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
                className="py-2"
              />
              <CustomInput
                label="Soyad"
                type="text"
                placeholder="Soyad"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
                className="py-2"
              />
            </div>
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomInput
                label="Telefon"
                type="tel"
                placeholder="05"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={true}
                className="py-2"
              />
              <CustomInput
                label="email"
                type="email"
                placeholder="E-Posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="py-2"
              />
            </div>
            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomSelect
                label="Şehir"
                options={cities}
                value={city ? city : { label: "Şehir" }}
                onChange={setCity}
                className="w-full"
                className2="container-class"
                style={{ padding: "2px 0px" }}
              />
              <CustomInput
                label="Adres"
                type="text"
                placeholder="Adres"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setPassword2(e.target.value)}
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
          <div className="flex flex-col mt-4 sm:mt-6 w-full">
            <div className="text-sm leading-5 text-[--link-1] w-full text-center">
              <p>Hesabınız var mı ?</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={goToLogin}
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
          onSubmit={verifyCode}
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
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
                {verifyCodeLoading ? <LoadingI className="h-7" /> : "Devam"}
              </button>
              <div className="shrink-0 mt-5 h-px bg-slate-200 w-full mt-24" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserRegister;

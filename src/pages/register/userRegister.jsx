import { useEffect, useState } from "react";
import CustomInput from "../../components/common/CustomInput";

// ICONS
import toast from "react-hot-toast";
import GobackI from "../../assets/icon/goback";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/common/CustomSelector";
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
import { getCities } from "../../redux/data/getCitiesSlice";
import { formatEmail, spacePhoneNumber } from "../../utils/utils";
import { usePopup } from "../../context/PopupContext";
import CustomCheckbox from "../../components/common/customCheckbox";
import CustomPhoneInput from "../../components/common/customPhoneInput";
import { getDistricts } from "../../redux/data/getDistrictsSlice";

const UserRegister = ({ setPageName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setShowPopup, setPopupContent } = usePopup();

  const { cities, success: citiesSuccess } = useSelector(
    (state) => state.data.getCities
  );

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { loading, success, error } = useSelector(
    (state) => state.auth.register
  );
  const {
    loading: verifyCodeLoading,
    success: verifyCodeSuccess,
    error: verifyCodeError,
  } = useSelector((state) => state.auth.verifyCode);

  let toastId;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checked, setChecked] = useState(false);
  const [toConfirm, setToConfirm] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [citiesData, setCitiesData] = useState(null);
  const [districts, setDistricts] = useState([]);

  const confirmRegister = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }
    if (phoneNumber.length < 12) {
      toast("Telefon numaranızı tamamlayın.");
      return;
    }

    if (!checked) {
      toast.error("Lütfen kullanım şartılarını kabul edin.");
      return;
    }
    setPopupContent(
      <Confirm
        phoneNumber={phoneNumber}
        setShowPopup={setShowPopup}
        onClick={register}
      />
    );
    setShowPopup(true);
  };

  const register = () => {
    setShowPopup(false);
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      city?.value &&
      district?.value &&
      password
    ) {
      dispatch(
        registerUser({
          email,
          phoneNumber: phoneNumber.slice(1),
          password,
          firstName,
          lastName,
          city: city.value,
          district: district.value,
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
        phoneNumberOrEmail: phoneNumber.slice(1),
        verificationCode,
      })
    );
  };

  const goToLogin = () => {
    setPageName("login");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setCity(null);
    setDistrict(null);

    setToConfirm(false);
    setVerificationCode("");
  };

  // USE EFFECTS
  useEffect(() => {
    if (loading) {
      toastId = toast.loading("Loading...");
    } else if (success) {
      toast.dismiss(toastId);
      setToConfirm(true);
      toast.success("SMS has beeen sent successfully");
      dispatch(resetRgisterState());
    } else if (error) {
      toast.dismiss(toastId);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Couldn't send SMS");
      }
      dispatch(resetRgisterState());
    }
  }, [loading, success, error]);

  useEffect(() => {
    if (verifyCodeLoading) {
      toastId = toast.loading("Loading...");
    }
    if (verifyCodeSuccess) {
      toast.dismiss(toastId);
      toast.success("Registered Successfully");
      setPageName("login"); // To the UserLogin
      navigate("/");
      dispatch(resetVerifyCodeState());
    }
    if (verifyCodeError) {
      toast.dismiss(toastId);
      if (verifyCodeError?.message_TR) {
        toast.error(verifyCodeError.message_TR);
      } else {
        toast.error("Couldn't register");
      }
      dispatch(resetVerifyCodeState());
    }
  }, [verifyCodeLoading, verifyCodeSuccess, verifyCodeError]);

  useEffect(() => {
    if (!cities) {
      dispatch(getCities());
    }
    if (citiesSuccess) {
      setCitiesData(cities);
    }
  }, [citiesSuccess, cities]);

  useEffect(() => {
    if (city?.id) {
      dispatch(getDistricts({ cityId: city.id }));
      setDistrict(null);
    }
  }, [city]);

  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);
    }
  }, [districtsSuccess]);

  return (
    <div className="flex items-center justify-center w-full max-sm:py-24">
      {!toConfirm ? (
        /* Register Page */
        <form
          className="flex flex-col w-full max-w-[38rem] px-12"
          onSubmit={confirmRegister}
        >
          <div className="flex justify-center">
            <h2 className="text-[2.7rem] font-bold text-black tracking-tighter">
              Kayıt ol
            </h2>
          </div>
          <div className="flex flex-col max-w-full">
            <div className="flex w-full gap-4">
              <CustomInput
                label="Ad"
                type="text"
                placeholder="Ad"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
                className="py-[.5rem]"
              />
              <CustomInput
                label="Soyad"
                type="text"
                placeholder="Soyad"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
                className="py-[.5rem]"
              />
            </div>

            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomPhoneInput
                label="Cep Telefonu"
                type="tel"
                placeholder="+90"
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                required={true}
                className="py-[.5rem]"
                maxLength={14}
              />
              <CustomInput
                label="E-Posta"
                type="E-Posta"
                placeholder="E-Posta"
                value={email}
                onChange={(e) => setEmail(formatEmail(e.target.value))}
                required={true}
                className="py-[.5rem]"
              />
            </div>

            <div className="flex w-full sm:gap-4 max-sm:flex-col">
              <CustomSelect
                label="Şehir"
                options={citiesData}
                value={city ? city : { value: null, label: "Şehir" }}
                onChange={setCity}
                style={{ padding: "1px 0px", fontSize: ".8rem" }}
                className="text-sm"
                className2="container-class"
              />
              <CustomSelect
                required={true}
                label="İlçe"
                style={{ padding: "1px 0px", fontSize: ".8rem" }}
                className="text-sm"
                value={district ? district : { value: null, label: "İlçe seç" }}
                options={[{ value: null, label: "İlçe seç" }, ...districts]}
                onChange={setDistrict}
              />
            </div>

            <div>
              <CustomInput
                label="Şifre"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                className="py-[.5rem]"
                letIcon={true}
              />
              <CustomInput
                label="Şifreyi onayla"
                placeholder="Şifre"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required={true}
                className="py-[.5rem]"
                letIcon={true}
              />
            </div>

            <div className="flex w-full mt-4">
              <CustomCheckbox
                label="<a href='/privacyPolicy' target='_blank' rel='noopener noreferrer' class='text-[--link-1]' >Kullanım Şartları</a>nı okudum ve onaylıyorum."
                className="text-sm"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>

            <div className="flex flex-col mt-4 sm:mt-10 w-full">
              <button
                type="submit"
                className={`flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 `}
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
                <span>Geri dön</span>
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
              label="Doğrulama Kodu"
              type="text"
              placeholder="Doğrulama Kodu"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required={true}
              className="py-3"
            />
            <div className="mt-10 text-[--gr-1] font-light">
              <PhoneUserMessage number={spacePhoneNumber(phoneNumber)} />
            </div>
            <div className="flex flex-col mt-10 w-full">
              <button
                type="submit"
                className="flex justify-center px-7 py-2 text-xl font-light rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {verifyCodeLoading ? <LoadingI className="h-7" /> : "Doğrula"}
              </button>
              <div className="shrink-0 h-px bg-slate-200 w-full mt-24" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserRegister;

const Confirm = ({ phoneNumber, setShowPopup, onClick }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[35rem] bg-[--white-1] shadow-lg py-10 px-5 rounded-md">
        <div className="text-center">
          <div className="w-full flex justify-center mb-8">
            <p className="text-[--primary-2] text-4xl">
              {spacePhoneNumber(phoneNumber)}
            </p>
          </div>
          <p className="font-[350]">
            Telefon numaranıza onay kodu gönderilecektir.
            <br />
            Numaranızın doğru olduğundan emin misiniz ?
          </p>
        </div>
        <div className="mt-10 w-full flex gap-4 justify-center">
          <button
            className="py-2 px-5 rounded-lg bg-[--light-3] text-[--black-1] hover:opacity-90"
            onClick={() => setShowPopup(false)}
          >
            Düzelt
          </button>
          <button
            className="py-2 px-6 rounded-lg bg-[--primary-1] text-[--white-1] hover:opacity-90"
            onClick={onClick}
          >
            Evet
          </button>
        </div>
      </div>
    </div>
  );
};

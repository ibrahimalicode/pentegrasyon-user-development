// MODULES
import toast from "react-hot-toast";
import { usePopup } from "../context/PopupContext";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import LoadingI from "../assets/anim/loading";
import CustomInput from "../components/common/customInput";
import CustomSelect from "../components/common/customSelector";
import CustomCheckbox from "../components/common/customCheckbox";
import CustomPhoneInput from "../components/common/customPhoneInput";

//FUNC
import { formatEmail, spacePhoneNumber } from "../utils/utils";

// REDUX
import { getCities } from "../redux/data/getCitiesSlice";
import { getDistricts } from "../redux/data/getDistrictsSlice";
import { registerUser, resetRgisterState } from "../redux/auth/registerSlice";

// ASSETS
import imgUrl from "../assets/img/pentegrasyon.png";
import VerifyCode from "../components/common/verifyCode";
import GlassFrame from "../components/common/glassFrame";

const Register = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
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

  // USE EFFECTS
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Loading...");
    } else if (success) {
      toast.dismiss(toastId.current);
      setToConfirm(true);
      toast.success("SMS has beeen sent successfully");
      dispatch(resetRgisterState());
    } else if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Couldn't send SMS");
      }
      dispatch(resetRgisterState());
    }
  }, [loading, success, error]);

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
    <GlassFrame
      className="pt-[2.5rem]"
      component={
        !toConfirm ? (
          /* Register Page */
          <form onSubmit={confirmRegister}>
            <div className="flex justify-center">
              <h2 className="text-[2.7rem] font-bold text-[--white-1] tracking-tighter">
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
                  onChange={(e) => setFirstName(e)}
                  required={true}
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
                />
                <CustomInput
                  label="Soyad"
                  type="text"
                  placeholder="Soyad"
                  value={lastName}
                  onChange={(e) => setLastName(e)}
                  required={true}
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
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
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
                  maxLength={14}
                />
                <CustomInput
                  label="E-Posta"
                  type="email"
                  placeholder="E-Posta"
                  value={email}
                  onChange={(e) => setEmail(formatEmail(e))}
                  required={true}
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
                />
              </div>

              <div className="flex w-full sm:gap-4 max-sm:flex-col">
                <CustomSelect
                  label="Şehir"
                  options={citiesData}
                  value={city ? city : { value: null, label: "Şehir" }}
                  onChange={setCity}
                  style={{
                    padding: "1px 0px",
                    fontSize: ".8rem",
                    backgroundColor: "transparent",
                  }}
                  inputStyle={{ color: "var(--white-1)" }}
                  singleValueStyle={{ color: "white" }}
                  className="text-sm"
                  className2="container-class"
                />
                <CustomSelect
                  required={true}
                  label="İlçe"
                  value={
                    district ? district : { value: null, label: "İlçe seç" }
                  }
                  options={[{ value: null, label: "İlçe seç" }, ...districts]}
                  onChange={setDistrict}
                  style={{
                    padding: "1px 0px",
                    fontSize: ".8rem",
                    backgroundColor: "transparent",
                  }}
                  inputStyle={{ color: "var(--white-1)" }}
                  singleValueStyle={{ color: "white" }}
                  className="text-sm"
                  className2="container-class"
                />
              </div>

              <div>
                <CustomInput
                  label="Şifre"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e)}
                  required={true}
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
                  letIcon={true}
                />
                <CustomInput
                  label="Şifreyi onayla"
                  placeholder="Şifre"
                  value={password2}
                  onChange={(e) => setPassword2(e)}
                  required={true}
                  className="py-[.5rem] bg-transparent text-[var(--white-1)]"
                  className5="text-[var(--white-1)]"
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
                  className={`flex justify-center px-7 py-2 text-xl rounded-md bg-[--primary-1] text-[--white-1] hover:opacity-90 `}
                  disabled={loading}
                >
                  {loading ? <LoadingI className="h-7" /> : "Devam"}
                </button>
              </div>
            </div>

            <div className="flex flex-col mt-4 sm:mt-6 w-full">
              <div className="flex justify-center gap-2">
                <p>Hesabınız var mı ?</p>
                <a href="/login" className="text-[--link-1]">
                  Login
                </a>
              </div>
            </div>
          </form>
        ) : (
          /* Verify Page*/
          <VerifyCode phoneNumber={phoneNumber} setToConfirm={setToConfirm} />
        )
      }
    />
  );
};

export default Register;

const Confirm = ({ phoneNumber, setShowPopup, onClick }) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full max-w-[35rem] bg-[--white-1] shadow-lg py-10 px-5 rounded-md bg-gray-400
bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[--gr-1] text-[--white-1]"
      >
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

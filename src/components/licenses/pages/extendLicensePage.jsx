// MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import BackButton from "../actions/assets/backButton";
import StepBar from "../../common/stepBar";
import ThirdStep from "../steps/thirdStep";
import FirstStep from "../steps/firstStep";
import SecondStep from "../steps/secondStep";
import StepFrame from "../../common/stepFrame";
import CancelButton from "../actions/assets/cancelButton";
import ForwardButton from "../actions/assets/forwardButton";
import PayTRForm from "../../payment/form/PayTRForm";
import { usePopup } from "../../../context/PopupContext";

//FUNC
import { formatLisansPackages, getDateRange } from "../../../utils/utils";

//REDUX
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
} from "../../../redux/licenses/updateLicenseDateSlice";
import {
  extendByOnlinePay,
  resetExtendByOnlinePay,
} from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";
import { useLocation } from "react-router-dom";

const ExtendLicensePage = ({ onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, restaurant } = location.state || {};

  const { loading, success, error } = useSelector(
    (state) => state.licenses.updateLicenseDate
  );
  const { loading: extendLoading, success: extendSuccess } = useSelector(
    (state) => state.licenses.extendByPay
  );

  const { setShowPopup, setPopupContent } = usePopup();
  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [userInData, setuserInData] = useState(user);

  const steps = 3;
  const [step, setStep] = useState(1);
  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const [licensePackageData, setLicensePackageData] = useState({
    value: null,
    label: "Lisans Paketi Seç",
    id: null,
    time: null,
  });
  const [paymentMethod, setPaymentMethod] = useState({
    selectedOption: { label: "Ödeme Yöntemi Seç", value: null },
    options: [
      { label: "Banka Havale", value: "bankPayment" },
      { label: "Online Ödeme", value: "onlinePayment" },
      { label: "Açık Hesap", value: "creditPayment" },
    ],
  });
  const selectedMethod = paymentMethod.selectedOption.value || "";
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState({
    userName: "PAYTR TEST",
    cardNumber: "4355084355084358",
    month: "12",
    year: "24",
    cvv: "000",
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  function handleStep() {
    setStep(step === 1 ? 2 : step === 2 ? 3 : 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (step !== 2) {
      handleStep();
      return;
    }
    if (selectedMethod === "bankPayment" && !document) {
      toast.error("Lütfen seçimleri tamamlayınız 😟");
      return;
    }

    if (selectedMethod === "onlinePayment") {
      const formData = new FormData(e.target);
      dispatch(extendByOnlinePay({ formData }));
    }
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateLicenseDate());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      handleStep();
      setTimeout(() => closeForm(), 4000);
      toast.success("Lisans başarıyla uzatıldı 🥳🥳");
      dispatch(resetUpdateLicenseDate());
    }
  }, [loading, success, error]);

  // EXTEND SUCCESS
  useEffect(() => {
    if (extendSuccess) {
      setStep(3);
    }
  }, [extendSuccess]);

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-max flex gap-1 text-[--gr-1] pt-4 text-sm font-[300] cursor-pointer">
        <div
          className="flex items-center gap-1"
          onClick={() => window.history.back()}
        >
          {location.pathname.includes("users") &&
            (userInData ? (
              <>
                {userInData.fullName} <DoubleArrowRI />
              </>
            ) : (
              <>
                "Kullanıcılar <DoubleArrowRI /> "
              </>
            ))}
          {location.pathname.includes("restaurants") &&
            (restaurantData ? (
              <>
                {restaurantData.name} <DoubleArrowRI />
              </>
            ) : (
              <>
                Restoranlar <DoubleArrowRI />
              </>
            ))}
          Lisanslar
          <DoubleArrowRI />
          Lisansı Uzat
        </div>
      </div>

      <div className="flex flex-col items-center w-full text-base">
        <form
          className="flex flex-col w-full pt-4 pb-4 text-[--black-2] relative max-w-xl"
          onSubmit={handleSubmit}
        >
          <StepBar step={step} steps={steps} />

          <div className="w-full self-center">
            <div
              className={`w-full h-[31rem] border-2 border-dashed border-[--light-3] rounded-sm relative ${
                selectedMethod === "onlinePayment" && step === 2 && "h-[31rem]"
              }`}
              style={{
                clipPath: "inset(-200px 0px)",
              }}
            >
              <div className="w-full h-full">
                <StepFrame
                  step={step}
                  steps={steps}
                  component={[
                    <FirstStep
                      licensePackageData={licensePackageData}
                      setLicensePackageData={setLicensePackageData}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />,
                    <SecondStep
                      step={step}
                      paymentMethod={paymentMethod}
                      licensePackageData={licensePackageData}
                      explanation={explanation}
                      setExplanation={setExplanation}
                      document={document}
                      setDocument={setDocument}
                      cardData={cardData}
                      setCardData={setCardData}
                      userData={userData}
                      setUserData={setUserData}
                    />,
                    <ThirdStep step={step} />,
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-2 mt-8">
            <BackButton step={step} setStep={setStep} />
            {step !== 3 && (
              <ForwardButton
                step={step}
                selectedMethod={selectedMethod}
                disabled={extendLoading}
              />
            )}
          </div>
          {selectedMethod === "onlinePayment" && step === 2 && (
            <PayTRForm cardData={cardData} setStep={setStep} />
          )}
        </form>
      </div>
    </section>
  );
};

export default ExtendLicensePage;

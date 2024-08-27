// MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import BackButton from "../assets/backButton";
import StepBar from "../../../common/stepBar";
import ThirdStep from "../../steps/thirdStep";
import FirstStep from "../../steps/firstStep";
import SecondStep from "../../steps/secondStep";
import StepFrame from "../../../common/stepFrame";
import CancelButton from "../assets/cancelButton";
import ForwardButton from "../assets/forwardButton";
import PayTRForm from "../../../payment/form/PayTRForm";
import { usePopup } from "../../../../context/PopupContext";

//FUNC
import { formatLisansPackages, getDateRange } from "../../../../utils/utils";

//REDUX
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
} from "../../../../redux/licenses/updateLicenseDateSlice";
import { extendByOnlinePay } from "../../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const ExtendLicensePopup = ({ onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.extendByPay
  );

  const { setShowPopup, setPopupContent } = usePopup();

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
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      handleStep();
      // setTimeout(() => closeForm(), 4000);
    }
  }, [loading, success, error]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <form
        className="flex flex-col w-full pt-12 pb-4 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl"
        onSubmit={handleSubmit}
        // onSubmit={selectedMethod === "onlinePayment" ? undefined : handleSubmit}
        // action={
        //   selectedMethod === "onlinePayment"
        //     ? "https://www.paytr.com/odeme"
        //     : undefined
        // }
        // method="post"
      >
        <CancelButton closeForm={closeForm} />

        <h1 className="self-center text-xl font-bold">Lisans paketi uzat</h1>
        <StepBar step={step} steps={steps} />

        <div className="w-full max-w-lg self-center">
          <div
            className={`w-full h-80 border-2 border-dashed border-[--light-3] rounded-sm relative ${
              selectedMethod === "onlinePayment" && step === 2 && "h-[31rem]"
            }`}
            style={{
              clipPath: "inset(-200px 0px)",
            }}
          >
            <div className="w-full h-full bg-slate-50">
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
        <div className="w-full flex justify-end gap-2 pr-8 mt-8">
          <BackButton step={step} setStep={setStep} />
          <ForwardButton step={step} />
        </div>
        {selectedMethod === "onlinePayment" && step === 2 && (
          <PayTRForm cardData={cardData} />
        )}
      </form>
    </div>
  );
};

export default ExtendLicensePopup;

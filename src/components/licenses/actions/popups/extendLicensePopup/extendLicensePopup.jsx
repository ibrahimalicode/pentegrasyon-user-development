// MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import StepBar from "../../../../common/stepBar";
import StepFrame from "../../../../common/stepFrame";
import ThirdStep from "../../paymentTypes/steps/thirdStep";
import FirstStep from "../../paymentTypes/steps/firstStep";
import SecondStep from "../../paymentTypes/steps/secondStep";
import { usePopup } from "../../../../../context/PopupContext";
import { formatLisansPackages, getDateRange } from "../../../../../utils/utils";

//REDUX
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
} from "../../../../../redux/licenses/updateLicenseDateSlice";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../../../redux/licensePackages/getLicensePackagesSlice";
import BackButton from "./backButton";
import ForwardButton from "./forwardButton";
import CancelButton from "./cancelButton";
import PayTRForm from "../../../../payment/form/PayTRForm";

const ExtendLicensePopup = ({ currentLicense, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.updateLicenseDate
  );
  const {
    success: licensePackagesSuccess,
    error: licensePackagesError,
    licensePackages,
  } = useSelector((state) => state.licensePackages.getLicensePackages);
  const { setShowPopup, setPopupContent } = usePopup();

  const steps = 3;
  const [step, setStep] = useState(1);
  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const [licensePackagesData, setLicensePackagesData] = useState([]);
  const [licenseData, setLicenseData] = useState({
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

  function handleSubmit(e) {
    e.preventDefault();

    if (step !== 2) {
      handleStep();
      return;
    }
    if (selectedMethod === "bankPayment" && !document) {
      toast.error("Lütfen seçimleri tamamlayınız 😟");
      return;
    }
    return;
    const formData = new FormData(e.target);
    const action = "https://www.paytr.com/odeme";
    fetch(action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Payment Success:", data))
      .catch((error) => console.error("Payment Error:", error));

    // MAKE THE PAMENT OR CHECK THE DOCUMENT
    // dispatch(
    //   updateLicenseDate({
    //     licenseId: currentLicense.id,
    //     startDateTime: getDateRange(licenseData.time).startDateTime,
    //     endDateTime: getDateRange(licenseData.time).endDateTime,
    //   })
    // );
  }

  function handleStep() {
    setStep(step === 1 ? 2 : step === 2 ? 3 : 1);
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
      toast.success("Lisans barıyla uzatıldı 🥳🥳");
      dispatch(resetUpdateLicenseDate());
    }
  }, [loading, success, error]);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackages) {
      dispatch(getLicensePackages());
    }
    return () => {
      if (licensePackages) {
        dispatch(resetGetLicensePackages());
      }
    };
  }, [licensePackages]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (licensePackagesError) {
      if (licensePackagesError?.message_TR) {
        toast.error(licensePackagesError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (licensePackagesSuccess) {
      const currentMarketplace = licensePackages.data.filter(
        (pack) => pack.marketplaceId === currentLicense.marketplaceId
      );
      setLicensePackagesData(formatLisansPackages(currentMarketplace));
    }
  }, [licensePackagesSuccess, licensePackagesError, licensePackages]);

  const [inp, setInp] = useState("");

  return (
    <div className="flex flex-col items-center w-full text-base">
      <form
        className="flex flex-col w-full pt-12 pb-4 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl"
        onSubmit={selectedMethod === "onlinePayment" ? undefined : handleSubmit}
        action={
          selectedMethod === "onlinePayment"
            ? "https://www.paytr.com/odeme"
            : undefined
        }
        method="post"
      >
        <CancelButton closeForm={closeForm} />

        <h1 className="self-center text-xl font-bold">Lisans paketi uzat</h1>
        <StepBar step={step} steps={steps} />

        <div className="w-full max-w-lg self-center">
          <div
            className={`w-full h-80 border-2 border-dashed border-[--light-3] rounded-sm relative ${
              paymentMethod.selectedOption.value === "onlinePayment" &&
              step === 2 &&
              "h-[31rem]"
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
                    licenseData={licenseData}
                    setLicenseData={setLicenseData}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    licensePackagesData={licensePackagesData}
                  />,
                  <SecondStep
                    step={step}
                    paymentMethod={paymentMethod}
                    licenseData={licenseData}
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
        <PayTRForm cardData={cardData} />
      </form>
    </div>
  );
};

export default ExtendLicensePopup;

// MODULES
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//COMP
import StepBar from "../../common/stepBar";
import StepFrame from "../../common/stepFrame";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";

//STEPS
import FirstStep from "../steps/firstStep";
import SecondStep from "../steps/secondStep";
import ThirdStep from "../steps/thirdStep";
import FourthStep from "../steps/fourthStep";

const ExtendLicensePage = () => {
  const location = useLocation();
  const { user, restaurant } = location.state || {};

  const { success: extendSuccess } = useSelector(
    (state) => state.licenses.extendByPay
  );

  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [userInData, setuserInData] = useState(user);

  const steps = 4;
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");

  const [licensePackageData, setLicensePackageData] = useState({
    value: null,
    label: "Lisans Paketi Seç",
    id: null,
    time: null,
  });
  const [paymentMethod, setPaymentMethod] = useState({
    selectedOption: { label: "Online Ödeme", value: "onlinePayment" },
    options: [
      { label: "Banka Havale", value: "bankPayment" },
      { label: "Online Ödeme", value: "onlinePayment" },
      { label: "Açık Hesap", value: "creditPayment" },
    ],
  });
  const selectedMethod = paymentMethod.selectedOption.value || "";

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
                Kullanıcılar <DoubleArrowRI />
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
        <div className="flex flex-col w-full pt-4 pb-4 text-[--black-2] relative max-w-xl">
          <StepBar step={step} steps={steps} className="px-10" />

          <div className="w-full self-center">
            <div
              className={`w-full h-[32rem] border-2 border-dashed border-[--light-3] rounded-sm relative overflow-x-clip ${
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
                      setStep={setStep}
                    />,
                    <SecondStep
                      step={step}
                      setStep={setStep}
                      paymentMethod={paymentMethod}
                      licensePackageData={licensePackageData}
                      explanation={explanation}
                      setExplanation={setExplanation}
                      document={document}
                      setDocument={setDocument}
                    />,
                    <ThirdStep
                      setStep={setStep}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <FourthStep step={step} paymentStatus={paymentStatus} />,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtendLicensePage;

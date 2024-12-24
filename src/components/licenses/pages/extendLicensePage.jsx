// MODULES
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//COMP
import StepBar from "../../common/stepBar";
import StepFrame from "../../common/stepFrame";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";

//STEPS
import FirstStep from "../extendLicenseSteps/1stStep";
import SecondStep from "../extendLicenseSteps/2ndStep";
import ThirdStep from "../extendLicenseSteps/3rdStep";
import FourthStep from "../extendLicenseSteps/4thStep";
import toast from "react-hot-toast";
import { clearCart } from "../../../redux/cart/cartSlice";
import { resetExtendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const ExtendLicensePage = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, restaurant } = location.state || {};
  const currentPath = location.pathname;
  const pathArray = currentPath.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const { success, loading, error } = useSelector(
    (state) => state.licenses.extendByPay
  );
  const cartItems = useSelector((state) => state.cart.items);

  const steps = 4;
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [restaurantData, setRestaurantData] = useState({
    label: "Restoran Seç",
  });
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
    ],
  });
  const selectedMethod = paymentMethod.selectedOption.value || "";

  // EXTEND SUCCESS
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    } else if (success) {
      setStep(3);
      toast.dismiss(toastId.current);
      dispatch(resetExtendByOnlinePay());
    } else if (error) {
      toast.dismiss(toastId.current);
      setStep(4);
      window.parent.postMessage({ status: "failed" }, "*");
      dispatch(resetExtendByOnlinePay());
    }

    return () => {
      if (cartItems) {
        dispatch(clearCart());
      }
    };
  }, [loading, success, error]);

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-max flex gap-1 text-[--gr-1] pt-4 text-sm font-[300] cursor-pointer">
        <div
          className="flex items-center gap-1"
          // onClick={() => navigate(currentPath.replace("/extend-license", ""))}
          onClick={() => window.history.back()}
        >
          {currentPath.includes("users") &&
            (user ? (
              <>
                {user.fullName} <DoubleArrowRI />
              </>
            ) : (
              <>
                Kullanıcılar <DoubleArrowRI />
              </>
            ))}
          {currentPath.includes("restaurants") &&
            (restaurant ? (
              <>
                {restaurant.name} <DoubleArrowRI />
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
              className={`w-full h-[32rem] border-2 border-dashed border-[--light-3] rounded-sm relative ${
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
                  percent={40}
                  measure="rem"
                  component={[
                    <FirstStep
                      key={0}
                      restaurantData={restaurantData}
                      setRestaurantData={setRestaurantData}
                      licensePackageData={licensePackageData}
                      setLicensePackageData={setLicensePackageData}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      setStep={setStep}
                      actionType={actionType}
                    />,
                    <SecondStep
                      key={1}
                      step={step}
                      setStep={setStep}
                      restaurantData={restaurantData}
                      paymentMethod={paymentMethod}
                      licenseData={licensePackageData}
                    />,
                    <ThirdStep
                      key={2}
                      setStep={setStep}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <FourthStep
                      key={3}
                      step={step}
                      paymentStatus={paymentStatus}
                    />,
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

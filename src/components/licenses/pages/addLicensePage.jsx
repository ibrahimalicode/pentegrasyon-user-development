// MODULES
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import StepBar from "../../common/stepBar";
import StepFrame from "../../common/stepFrame";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";

//STEPS
import FirstStep from "../addLicenseSteps/1stStep";
import SecondStep from "../addLicenseSteps/2ndStep";
import ThirdStep from "../addLicenseSteps/3rdStep";
import FourthStep from "../addLicenseSteps/4thStep";
import FifthStep from "../addLicenseSteps/5thStep";

//REDUX
import { clearCart } from "../../../redux/cart/cartSlice";
import { resetAddByOnlinePay } from "../../../redux/licenses/addLicense/addByOnlinePaySlice";

const AddLicensePage = () => {
  const toastId = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, restaurant } = location.state || {};
  const currentPath = location.pathname;
  const pathArray = currentPath.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const cartItems = useSelector((state) => state.cart.items);
  const { success, loading, error } = useSelector(
    (state) => state.licenses.addByPay
  );

  const steps = 5;
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

  //SET RESTAURANT DATA
  useEffect(() => {
    if (restaurant) {
      setRestaurantData({
        label: restaurant?.name,
        value: restaurant?.id,
        userId: restaurant?.userId,
        id: restaurant.id,
      });
    }
  }, [restaurant]);

  // ADD SUCCESS
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Loading...");
    } else if (success) {
      toast.remove(toastId.current);
      if (success) {
        setStep(4);
      }
      dispatch(resetAddByOnlinePay());
    } else if (error) {
      toast.remove(toastId.current);
      setStep(5);
      window.parent.postMessage({ status: "failed" }, "*");
      dispatch(resetAddByOnlinePay());
    }

    return () => {
      if (cartItems) {
        dispatch(clearCart());
      }
    };
  }, [loading, success, error, dispatch]);

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-max flex gap-1 text-[--gr-1] pt-4 text-sm font-[300] cursor-pointer">
        <div
          className="flex items-center gap-1"
          // onClick={() => navigate(currentPath.replace("/add-license", ""))}
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
          Lisans Ekle
        </div>
      </div>

      <div className="flex flex-col items-center w-full text-base">
        <div className="flex flex-col items-center w-full pt-4 pb-4 text-[--black-2] relative ">
          <StepBar step={step} steps={steps} className="max-w-2xl" />

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
                  percent={101}
                  measure="%"
                  component={[
                    <FirstStep
                      restaurantData={restaurantData}
                      setRestaurantData={setRestaurantData}
                      licensePackageData={licensePackageData}
                      setLicensePackageData={setLicensePackageData}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      setStep={setStep}
                      actionType={actionType}
                      restaurant={restaurant}
                    />,
                    <SecondStep
                      step={step}
                      setStep={setStep}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      restaurantData={restaurantData}
                    />,
                    <ThirdStep
                      step={step}
                      setStep={setStep}
                      restaurantData={restaurantData}
                      paymentMethod={paymentMethod}
                      licenseData={licensePackageData}
                    />,
                    <FourthStep
                      setStep={setStep}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <FifthStep step={step} paymentStatus={paymentStatus} />,
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

export default AddLicensePage;

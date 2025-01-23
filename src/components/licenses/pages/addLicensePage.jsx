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
import SixthStep from "../addLicenseSteps/6thStep";

//REDUX
import { clearCart } from "../../../redux/cart/cartSlice";
import { resetAddByOnlinePay } from "../../../redux/licenses/addLicense/addByOnlinePaySlice";

const AddLicensePage = () => {
  const toastId = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, restaurant, licenses } = location.state || {};
  const currentPath = location.pathname;
  const pathArray = currentPath.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const cartItems = useSelector((state) => state.cart.items);
  const { success, loading, error } = useSelector(
    (state) => state.licenses.addByPay
  );

  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState(4);
  const [userData, setUserData] = useState(null);
  const [userInvData, setUserInvData] = useState(null);
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
    selectedOption: { label: "Online Ödeme", value: "onlinePayment", id: 0 },
    options: [
      { label: "Online Ödeme", value: "onlinePayment", id: 0 },
      { label: "Banka Havale", value: "bankPayment", id: 1 },
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
      toastId.current = toast.loading("İşleniyor...");
    } else if (success) {
      toast.remove(toastId.current);
      if (success) {
        setStep(5);
      }
      dispatch(resetAddByOnlinePay());
    } else if (error) {
      setStep(6);
      toast.dismiss(toastId.current);
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

          <div className="w-full self-center overflow-x-clip">
            <div
              className={`w-full h-[32rem] border-0 border-dashed border-[--light-3] rounded-sm relative ${
                selectedMethod === "onlinePayment" && step === 2 && "h-[31rem]"
              }`}
              // style={{
              //   clipPath: "inset(-200px 0px)",
              // }}
            >
              <div className="w-full h-full">
                <StepFrame
                  step={step}
                  steps={steps}
                  percent={101}
                  measure="%"
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
                      restaurant={restaurant}
                      licenses={licenses}
                    />,
                    <SecondStep
                      key={1}
                      step={step}
                      setSteps={setSteps}
                      setStep={setStep}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      restaurantData={restaurantData}
                    />,
                    <ThirdStep
                      key={2}
                      step={step}
                      setStep={setStep}
                      userData={userData}
                      userInvData={userInvData}
                      setUserData={setUserData}
                      licenseData={licensePackageData}
                      paymentMethod={paymentMethod}
                      restaurantData={restaurantData}
                      setUserInvData={setUserInvData}
                    />,
                    <FourthStep
                      key={3}
                      step={step}
                      setStep={setStep}
                      userData={userData}
                      userInvData={userInvData}
                      licenseData={licensePackageData}
                      paymentMethod={paymentMethod}
                      restaurantData={restaurantData}
                    />,
                    <FifthStep
                      key={4}
                      setStep={setStep}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <SixthStep
                      key={4}
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

export default AddLicensePage;

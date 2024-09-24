// MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import CustomSelect from "../../../common/customSelector";
import { usePopup } from "../../../../context/PopupContext";

//FUNC
import {
  formatLisansPackages,
  formatSelectorData,
  getDateRange,
} from "../../../../utils/utils";

//REDUX
import {
  addLicense,
  resetAddLicenseState,
} from "../../../../redux/licenses/addLicenseSlice";
import {
  getRestaurants,
  resetGetRestaurantsState,
} from "../../../../redux/restaurants/getRestaurantsSlice";
import { useLocation } from "react-router-dom";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../../redux/licensePackages/getLicensePackagesSlice";
import StepBar from "../../../common/stepBar";
import CancelButton from "../assets/cancelButton";
import StepFrame from "../../../common/stepFrame";
import FirstStep from "../../steps/firstStep";
import SecondStep from "../../steps/secondStep";
import ThirdStep from "../../steps/thirdStep";
import BackButton from "../assets/backButton";
import ForwardButton from "../assets/forwardButton";
import PayTRForm from "../../../payment/form/PayTRForm";

// ADD LICENSE POPUP
function AddLicensesPopup({ onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, restaurant } = location.state || {};

  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.addLicense
  );

  const {
    success: licensePackagesSuccess,
    error: licensePackagesError,
    licensePackages,
  } = useSelector((state) => state.licensePackages.getLicensePackages);

  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
  } = useSelector((state) => state.restaurants.getRestaurants);

  const [restaurantData, setRestaurantData] = useState({
    label: "Restoran Seç",
  });
  const [licensePackageData, setLicensePackageData] = useState({
    label: "Lisans Paketi Seç",
  });

  const steps = 3;
  const [step, setStep] = useState(1);
  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [licensePackagesData, setLicensePackagesData] = useState(null);
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
  };

  function handleStep() {
    setStep(step === 1 ? 2 : step === 2 ? 3 : 1);
  }

  const handleSubmit = (e) => {
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
    dispatch(
      addLicense({
        restaurantId: restaurantData.id,
        userId: restaurantData.userId,
        marketplaceId: licensePackageData.id,
        startDateTime: getDateRange(licensePackageData.time).startDateTime,
        endDateTime: getDateRange(licensePackageData.time).endDateTime,
        isActive: true,
        licensePackageTime: licensePackageData.time,
        licensePackageTotalPrice: licensePackageData.price,
        licensePackageId: licensePackageData.licensePackageId,
      })
    );
  };

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      toast.error(error.message);
      dispatch(resetAddLicenseState());
    }
    if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      setPopupContent(null);
      toast.success("Lisans bşarıyla eklendi");
      dispatch(resetAddLicenseState());
    }
  }, [loading, success, error]);

  // GET RESTAURANTS
  useEffect(() => {
    if (!restaurant) {
      dispatch(
        getRestaurants({
          pageNumber: 0,
          pageSize: 0,
          searchKey: null,
          active: null,
          city: null,
          district: null,
          neighbourhood: null,
        })
      );
    } else {
      const { id, name, userId } = restaurant;
      setRestaurantData({ value: id, label: name, id, userId });
    }
  }, [restaurant]);

  // TOAST AND SET RESTAURANTS
  useEffect(() => {
    if (restaurantsError) {
      toast.error(restaurantsError.message);
      dispatch(resetGetRestaurantsState());
    }

    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
      const rest = restaurants.data.filter(
        (data) => data.id === restaurant?.id
      )[0];
      if (rest) {
        const { id, name, userId } = rest;
        setRestaurantData({ value: id, label: name, id, userId });
      }
      dispatch(resetGetRestaurantsState());
    }
  }, [restaurants, restaurantsError]);

  //GET LISANS PACKAGES
  useEffect(() => {
    if (!licensePackagesData) {
      dispatch(getLicensePackages());
    }
  }, [licensePackagesData]);

  // SET LICENSE PACKAGES
  useEffect(() => {
    if (licensePackagesError) {
      toast.error(licensePackagesError.message);
      dispatch(resetGetLicensePackages());
    }
    if (licensePackagesSuccess) {
      setLicensePackagesData(formatLisansPackages(licensePackages.data));
      dispatch(resetGetLicensePackages());
    }
  }, [licensePackagesError, licensePackagesSuccess]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <form
        className="flex flex-col w-full pt-12 pb-4 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl"
        // onSubmit={handleSubmit}
        // onSubmit={selectedMethod === "onlinePayment" ? undefined : handleSubmit}
        action="https://www.paytr.com/odeme"
        method="post"
      >
        <CancelButton closeForm={closeForm} />

        <h1 className="self-center text-xl font-bold">Lisans paket ekle</h1>
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
                    actionType="addLicense"
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
}

export default AddLicensesPopup;

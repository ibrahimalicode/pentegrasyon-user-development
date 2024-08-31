//MOD
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomSelect from "../../common/customSelector";
import ForwardButton from "../stepsAssets/forwardButton";

// IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import DefaultMarketplace from "../../../assets/img/packages/Default-Marketplace.png";

//FUNC
import {
  formatLisansPackages,
  formatSelectorData,
  groupedLicensePackages,
} from "../../../utils/utils";

// REDUX
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";

const imageSRCs = [
  { src: Getiryemek, name: "Getiryemek" },
  { src: MigrosYemek, name: "MigrosYemek" },
  { src: TrendyolYemek, name: "TrendyolYemek" },
  { src: Yemeksepeti, name: "Yemeksepeti" },
  { src: GoFody, name: "GoFody" },
  { src: Siparisim, name: "Siparisim" },
];

const FirstStep = ({
  restaurantData,
  setRestaurantData,
  licensePackageData,
  setLicensePackageData,
  paymentMethod,
  setPaymentMethod,
  setStep,
  actionType,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLicense, restaurant } = location?.state || {};
  const { restaurantName, restaurantId, userId } = currentLicense || {};

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  if ((restaurantId || restaurant) && !restaurantData?.value) {
    if (restaurant) {
      setRestaurantData({
        label: restaurant.name,
        value: restaurant.id,
        userId: restaurant.userId,
      });
    } else {
      setRestaurantData({ label: restaurantName, value: restaurantId, userId });
    }
  }
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [licensePackagesData, setLicensePackagesData] = useState(null);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackagesData) {
      dispatch(getLicensePackages());
    }
  }, [licensePackagesData]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (success) {
      if (actionType === "add-license") {
        setLicensePackagesData(groupedLicensePackages(licensePackages.data));
      } else {
        const currentLicensePackage = licensePackages.data.filter(
          (pack) => pack?.marketplaceId === currentLicense?.marketplaceId
        );

        if (currentLicensePackage.length) {
          setLicensePackagesData(formatLisansPackages(currentLicensePackage));
        } else setLicensePackagesData(currentLicensePackage);
      }
      dispatch(resetGetLicensePackages());
    }
  }, [success, error, licensePackages, actionType]);

  // GET RESTAURANTS
  useEffect(() => {
    if (!currentLicense && !restaurantsData) {
      dispatch(getRestaurants({}));
    }
  }, [currentLicense, restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
    }
  }, [restaurants]);

  function handleSubmit(e) {
    e.preventDefault();
    setStep(2);
  }
  return (
    <form className="size-full flex flex-col" onSubmit={handleSubmit}>
      <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        {licensePackageData?.id !== null ? (
          <img
            src={imageSRCs[licensePackageData?.id]?.src}
            alt="Pazaryeri"
            className="w-32 h-10 rounded-sm"
          />
        ) : (
          <div className="relative">
            <img
              src={DefaultMarketplace}
              alt="Pazaryeri"
              className="w-32 h-10 rounded-sm"
            />
            <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              Pazaryeri
            </span>
          </div>
        )}

        <p className="">
          {licensePackageData.time ? licensePackageData.time : "0"} Yıllık
        </p>
        <p className="">
          {licensePackageData.price ? licensePackageData.price : "00.00"}
        </p>
      </div>

      <div className="flex flex-col pt-2 gap-4 md:px-4">
        <div className="flex justify-between gap-4">
          <CustomSelect
            required={true}
            className="text-sm"
            className2="mt-[0] sm:mt-[0] max-w-80"
            value={restaurantData}
            disabled={restaurantId}
            options={restaurantsData}
            onChange={(selectedOption) => {
              setRestaurantData(selectedOption);
            }}
          />
          <CustomSelect
            required={true}
            className="text-sm"
            className2="mt-[0] sm:mt-[0] max-w-80"
            value={licensePackageData}
            options={licensePackagesData}
            onChange={(selectedOption) => {
              setLicensePackageData(selectedOption);
            }}
          />
        </div>

        <div className="w-1/2 pr-2">
          <CustomSelect
            required={true}
            className="text-sm"
            className2="mt-[0] sm:mt-[0]"
            value={paymentMethod.selectedOption}
            options={paymentMethod.options}
            onChange={(selectedOption) => {
              setPaymentMethod((prev) => {
                return {
                  ...prev,
                  selectedOption,
                };
              });
            }}
          />
        </div>
      </div>

      <div className="h-full flex justify-end items-end relative">
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          className="absolute -bottom-16 -right-1"
        />
      </div>
    </form>
  );
};

export default FirstStep;

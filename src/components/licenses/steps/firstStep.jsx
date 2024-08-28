import { useLocation } from "react-router-dom";
import CustomSelect from "../../common/customSelector";

// IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import { useEffect, useState } from "react";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import toast from "react-hot-toast";
import { formatLisansPackages, formatSelectorData } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";

const imageSRCs = [
  Getiryemek,
  MigrosYemek,
  TrendyolYemek,
  Yemeksepeti,
  GoFody,
  Siparisim,
];

const FirstStep = ({
  licensePackageData,
  setLicensePackageData,
  paymentMethod,
  setPaymentMethod,
  actionType,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLicense, restaurant } = location?.state || {};

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const restData = restaurant
    ? { label: restaurant.name, value: restaurant.id }
    : { label: "Restoran Seç" };
  const [restaurantData, setRestaurantData] = useState(restData);
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
      if (actionType === "addLicense") {
        setLicensePackagesData(formatLisansPackages(licensePackages.data));
      } else {
        const currentLicensePackage = licensePackages.data.filter(
          (pack) => pack?.marketplaceId === currentLicense?.marketplaceId
        );
        if (currentLicensePackage.length) {
          setLicensePackagesData(formatLisansPackages(currentLicensePackage));
        }
      }
      dispatch(resetGetLicensePackages());
    }
  }, [success, error, licensePackages]);

  // GET RESTAURANTS
  useEffect(() => {
    if (!restaurant && !restaurantsData) {
      dispatch(getRestaurants({}));
    }
  }, [restaurant, restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
    }
  }, [restaurants]);

  return (
    <div className="size-full flex flex-col">
      <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        <img
          src={imageSRCs[licensePackageData?.id]}
          alt="Pazaryeri"
          className="w-32 h-10 rounded-sm"
        />

        <p className="">
          {licensePackageData.time ? licensePackageData.time : "0"} Yıllık
        </p>
        <p className="">
          {licensePackageData.price ? licensePackageData.price : "00.00"}
        </p>
      </div>

      <div className="px-0 grid grid-cols-2 justify-between items-center pt-2 gap-4">
        <CustomSelect
          required={true}
          className="text-sm"
          className2="mt-[0] sm:mt-[0] min-w-52"
          value={restaurantData}
          disabled={restData.value}
          options={restaurantsData}
          onChange={(selectedOption) => {
            setRestaurantData(selectedOption);
          }}
        />
        <CustomSelect
          required={true}
          className="text-sm"
          className2="mt-[0] sm:mt-[0] min-w-52"
          value={licensePackageData}
          options={licensePackagesData}
          onChange={(selectedOption) => {
            setLicensePackageData(selectedOption);
          }}
        />
        <CustomSelect
          required={true}
          className="text-sm"
          className2="mt-[0] sm:mt-[0] w-1/2"
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
  );
};

export default FirstStep;

//MOD
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  getPriceWithKDV,
  groupedLicensePackages,
} from "../../../utils/utils";

// REDUX
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../../redux/cart/cartSlice";
import {
  getKDVParameters,
  resetGetKDVParameters,
} from "../../../redux/generalVars/KDVParameters/getKDVParametersSlice";

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

  const cartItems = useSelector((state) => state.cart.items);

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { KDVParameters, error: kdvError } = useSelector(
    (state) => state.generalVars.getKDVParams
  );

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
      dispatch(getKDVParameters());
    }
  }, [success, error]);

  //GET KDV VALUE
  useEffect(() => {
    if (kdvError) {
      if (kdvError?.message_TR) {
        toast.error(kdvError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetKDVParameters());
    }

    if (KDVParameters && success) {
      const updatedData = licensePackages.data.map((pkg) => {
        return { ...pkg, price: getPriceWithKDV(pkg.price, KDVParameters) };
      });

      const sameMarketplacePKGS = updatedData.filter(
        (pack) => pack?.marketplaceId === currentLicense?.marketplaceId
      );

      if (sameMarketplacePKGS.length) {
        setLicensePackagesData(formatLisansPackages(sameMarketplacePKGS));
      } else setLicensePackagesData(sameMarketplacePKGS);

      dispatch(resetGetKDVParameters());
      dispatch(resetGetLicensePackages());
    }
  }, [kdvError, KDVParameters]);

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

  //SET RESTAURANT DATA
  useEffect(() => {
    if ((restaurantId || restaurant) && !restaurantData?.value) {
      if (restaurant) {
        setRestaurantData({
          label: restaurant.name,
          value: restaurant.id,
          userId: restaurant.userId,
        });
      } else {
        setRestaurantData({
          label: restaurantName,
          value: restaurantId,
          userId,
        });
      }
    }
  }, [restaurantId, restaurant, restaurantData]);

  function handleSubmit(e) {
    e.preventDefault();
    setStep(2);
  }

  const handleAddToCart = (pkg) => {
    if (!pkg.restaurantId) {
      toast.error("Lütfen restoran seçın 😊", { id: "choose_restaurant" });
      return;
    }
    const existingPackage = cartItems.find(
      (item) =>
        item.marketplaceId === pkg.marketplaceId &&
        item.restaurantId === pkg.restaurantId
    );

    if (existingPackage) {
      dispatch(
        removeItemFromCart({
          id: existingPackage.id,
          restaurantId: pkg.restaurantId,
        })
      );
      if (
        existingPackage.id === pkg.id &&
        existingPackage.restaurantId == pkg.restaurantId
      )
        return;
    }
    dispatch(addItemToCart(pkg));
  };

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
              if (
                selectedOption?.licensePackageId !==
                licensePackageData?.licensePackageId
              ) {
                handleAddToCart({
                  ...selectedOption,
                  marketplaceId: selectedOption.id,
                  restaurantId: restaurantData.value,
                  restaurantName: restaurantData.label,
                });
              }
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

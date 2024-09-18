//MOD
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
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

//FUNC
import {
  formatSelectorData,
  getPriceWithKDV,
  groupedLicensePackages,
  sumCartPrices,
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
  setStep,
  licenses,
  restaurant,
  restaurantData,
  setRestaurantData,
}) => {
  const dispatch = useDispatch();

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { KDVParameters, error: kdvError } = useSelector(
    (state) => state.generalVars.getKDVParams
  );

  const cartItems = useSelector((state) => state.cart.items);

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
      dispatch(resetGetLicensePackages());
    }

    if (success) {
      dispatch(getKDVParameters());
    }
  }, [success, error]);

  //GET KDV AND SET VALUE
  useEffect(() => {
    if (kdvError) {
      dispatch(resetGetKDVParameters());
    }

    if (KDVParameters && success) {
      const updatedData = licensePackages.data.map((pkg) => {
        return { ...pkg, price: getPriceWithKDV(pkg.price, KDVParameters) };
      });
      setLicensePackagesData(groupedLicensePackages(updatedData));
      dispatch(resetGetLicensePackages());
      dispatch(resetGetKDVParameters());
    }
  }, [kdvError, KDVParameters]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!cartItems?.length) {
      toast.error("Lütfen en az bir tane lisans paketi seçin");
      return;
    }
    setStep(2);
  }

  const handleAddToCart = (pkg) => {
    if (!pkg.restaurantId) {
      toast.error("Lütfen restoran seçın 😊", { id: "choose_restaurant" });
      return;
    }
    if (!licenses) return;
    const existingLicenses = licenses.filter(
      (license) => license.restaurantId === pkg.restaurantId
    );
    const marketPlaceExistes = existingLicenses.some(
      (license) => license.marketplaceId === pkg.marketplaceId
    );
    if (marketPlaceExistes) {
      toast(
        `${pkg.restaurantName} restoranına ${
          imageSRCs[pkg.marketplaceId].name
        } lisansı var. Uzatmak isterseniz uzatma sayfasından uzatabılırsınız.`
      );
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
    toast.success(`${pkg.time} Yıllık lısans sepete eklendi`);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full overflow-y-auto">
      <div className="w-full sm:px-4">
        <div className="w-full flex justify-center pt-2">
          <CustomSelect
            required={true}
            className="text-sm mt-[0] sm:mt-[0]"
            className2="mt-[0] sm:mt-[0] max-w-2xl"
            value={restaurantData}
            disabled={restaurant}
            options={restaurantsData}
            onChange={(selectedOption) => {
              setRestaurantData(selectedOption);
            }}
          />
          <div className=" flex flex-col justify-cente px-6">
            <p className="text-sm">Toplam</p>
            <p>{sumCartPrices(cartItems)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          {licensePackagesData &&
            licensePackagesData.map((licensePkg, i) => (
              <div
                key={i}
                className="flex max-sm:flex-col sm:items-center gap-2 sm:gap-8 max-sm:mb-6 even:bg-[--white-1] odd:bg-[--table-odd]"
              >
                <img
                  src={imageSRCs[licensePkg[0].marketplaceId]?.src}
                  alt="Pazaryeri"
                  className="w-36 h-full rounded-sm"
                />
                <div className="max-sm:w-full flex gap-4 py-1 overflow-x-auto">
                  {licensePkg.map((pkg) => {
                    const isSelected = cartItems.some(
                      (item) =>
                        item.id === pkg.id &&
                        item.restaurantId === restaurantData?.id
                    );

                    return (
                      <div key={pkg.id} className="flex items-center">
                        <div
                          className={`py-1 px-6 rounded cursor-pointer ${
                            isSelected
                              ? "bg-[--primary-1] text-[--white-1]"
                              : "bg-gray-200"
                          }`}
                          onClick={() =>
                            handleAddToCart({
                              ...pkg,
                              restaurantId: restaurantData.id,
                              restaurantName: restaurantData.label,
                            })
                          }
                        >
                          <p className="whitespace-nowrap">{pkg.time} Yıllık</p>
                          <p
                            className={`text-sm whitespace-nowrap ${
                              isSelected ? "text-[--white-1]" : "text-[--gr-1]"
                            }`}
                          >
                            {pkg.price} tl
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="absolute -bottom-16 -right-1">
        <ForwardButton text="Devam" letIcon={true} type="submit" />
      </div>
    </form>
  );
};

export default FirstStep;

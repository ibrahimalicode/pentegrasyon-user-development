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
import Autoronics from "../../../assets/img/packages/Autoronics.png";
import Vigo from "../../../assets/img/packages/Vigo.png";

//UTILS
import {
  formatSelectorData,
  getPriceWithKDV,
  groupedLicensePackages,
  formatToPrice,
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
  { src: Autoronics, name: "Autoronics" },
  { src: Vigo, name: "Vigo" },
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

  const [kdvData, setKdvData] = useState(null);
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [licensePackagesData, setLicensePackagesData] = useState(null);

  function getTotalPrice() {
    const result = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    const kdv = cartItems.reduce(
      (acc, item) => acc + (parseFloat(item.price) / 100) * item.kdvPercentage,
      0
    );
    const kdvTotal = formatToPrice(kdv);
    const total = formatToPrice(result);
    return { total, kdvTotal };
  }

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackagesData) {
      dispatch(getLicensePackages());
    }
  }, [licensePackagesData]);

  // TOAST AND GET KDV PARAMS
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
        return {
          ...pkg,
          price: pkg.userPrice,
          kdvPrice: getPriceWithKDV(pkg.userPrice, KDVParameters).replace(
            ".00",
            ""
          ),
        };
      });
      setKdvData(KDVParameters);
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
      (license) => license.licenseTypeId === pkg.licenseTypeId
    );
    if (marketPlaceExistes) {
      toast(
        `${pkg.restaurantName} restoranına ${
          imageSRCs[pkg.licenseTypeId].name
        } lisansı var. Uzatmak isterseniz uzatma sayfasından uzatabılırsınız.`
      );
      return;
    }

    const existingPackage = cartItems.find(
      (item) =>
        item.licenseTypeId === pkg.licenseTypeId &&
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
    const data = kdvData ? kdvData : {};
    dispatch(addItemToCart({ ...pkg, ...data }));
    toast.success(`${pkg.time} Yıllık lısans sepete eklendi`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-full flex flex-col justify-between mb-7"
    >
      <div className="w-full h-full sm:px-4">
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
          <div className="flex px-6 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Toplam</p>
              <p>{getTotalPrice().total}</p>
            </div>
          </div>
        </div>

        <div className="h-[85%] flex flex-col gap-1 mt-5 overflow-y-visible">
          {licensePackagesData &&
            licensePackagesData.map((licensePkg, i) => (
              <div
                key={i}
                className="flex max-sm:flex-col sm:items-center gap-2 sm:gap-8 max-sm:mb-6 even:bg-[--white-1] odd:bg-[--table-odd]"
              >
                <img
                  src={imageSRCs[licensePkg[0].licenseTypeId]?.src}
                  alt="Pazaryeri"
                  className="w-36 rounded-sm"
                />
                <div className="max-sm:w-full flex gap-4 py-1 overflow-x-auto">
                  {licensePkg.map((pkg) => {
                    const isSelected = cartItems.some(
                      (item) =>
                        item.id === pkg.id &&
                        item.restaurantId === restaurantData?.id
                    );

                    return (
                      <div
                        key={pkg.id}
                        className="flex items-center text-[12px] leading-snug"
                      >
                        <div
                          className={`flex flex-col justify-center py-1.5 px-6 rounded cursor-pointer ${
                            isSelected
                              ? "bg-[--primary-1] text-[--white-1]"
                              : "bg-gray-200"
                          }`}
                          onClick={() =>
                            handleAddToCart({
                              ...pkg,
                              restaurantId: restaurantData.id,
                              restaurantName: restaurantData.label,
                              marketPlaceName:
                                imageSRCs[licensePkg[0]?.licenseTypeId]?.name,
                            })
                          }
                        >
                          <div>
                            <span className="whitespace-nowrap">
                              {pkg.time} Yıllık{" "}
                            </span>
                            <span
                              className={`whitespace-nowrap ${
                                isSelected && "text-[--white-1]"
                              }`}
                            >
                              {pkg.price} tl
                            </span>
                          </div>
                          <div>
                            <span className="font-normal whitespace-nowrap">
                              {pkg.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end items-end h-full">
        <ForwardButton text="Devam" letIcon={true} type="submit" />
      </div>
    </form>
  );
};

export default FirstStep;

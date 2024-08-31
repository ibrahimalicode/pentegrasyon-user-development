import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../common/customSelector";
import ForwardButton from "../stepsAssets/forwardButton";
import { groupedLicensePackages, sumCartPrices } from "../../../utils/utils";
import { useEffect, useState } from "react";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../../redux/cart/cartSlice";
import toast from "react-hot-toast";
import BackButton from "../stepsAssets/backButton";

const imageSRCs = [
  { src: Getiryemek, name: "Getiryemek" },
  { src: MigrosYemek, name: "MigrosYemek" },
  { src: TrendyolYemek, name: "TrendyolYemek" },
  { src: Yemeksepeti, name: "Yemeksepeti" },
  { src: GoFody, name: "GoFody" },
  { src: Siparisim, name: "Siparisim" },
];

const SecondStep = ({
  paymentMethod,
  setPaymentMethod,
  restaurantData,
  step,
  setStep,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [licensePackagesData, setLicensePackagesData] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setStep(3);
  }

  const handleAddToCart = (pkg) => {
    if (!pkg.restaurantId) {
      toast.error("Lütfen restoran seçın 😊", { id: "choose_restaurant" });
      return;
    }
    if (cartItems.length <= 1) {
      toast.error("En az bir tane lisans paketi kalması lazım", {
        id: "remove_item",
      });
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
    }
  };

  useEffect(() => {
    if (cartItems) {
      setLicensePackagesData(groupedLicensePackages(cartItems));
    }
  }, [cartItems]);

  return (
    step === 2 && (
      <form onSubmit={handleSubmit}>
        <div className="w-full px-4 ">
          <div className="w-full flex justify-center pt-2">
            <CustomSelect
              required={true}
              className="text-sm mt-[0] sm:mt-[0]"
              className2="mt-[0] sm:mt-[0] max-w-2xl"
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
            <div className=" flex flex-col justify-cente px-6">
              <p className="text-sm">Toplam</p>
              <p>{sumCartPrices(cartItems)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-1">
            {licensePackagesData &&
              licensePackagesData.map((licensePkg, i) => (
                <div
                  key={i}
                  className="flex items-center gap-8 even:bg-[--white-1] odd:bg-[--table-odd]"
                >
                  <img
                    src={imageSRCs[licensePkg[0].marketplaceId]?.src}
                    alt="Pazaryeri"
                    className="w-36 h-full rounded-sm"
                  />
                  <div className="flex gap-4 py-1">
                    {licensePkg.map((pkg) => {
                      const isSelected = true;

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
                            <p className="">{pkg.time} Yıllık</p>
                            <p
                              className={`text-sm ${
                                isSelected
                                  ? "text-[--white-1]"
                                  : "text-[--gr-1]"
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

        {/* BTNS */}
        <div className="flex gap-3 absolute -bottom-16 -right-0">
          <BackButton
            text="Geri"
            letIcon={true}
            onClick={() => setStep(1)}
            // disabled={loading}
          />
          <ForwardButton
            text="Devam"
            letIcon={true}
            type="submit"
            // disabled={loading}
          />
        </div>
      </form>
    )
  );
};

export default SecondStep;

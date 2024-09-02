//MODULES
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//COMP
import BackButton from "../stepsAssets/backButton";
import CustomSelect from "../../common/customSelector";
import ForwardButton from "../stepsAssets/forwardButton";

//IMG
import GoFody from "../../../assets/img/packages/GoFody.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";

//FUNC
import { groupedLicensePackages, sumCartPrices } from "../../../utils/utils";

const imageSRCs = [
  { src: Getiryemek, name: "Getiryemek" },
  { src: MigrosYemek, name: "MigrosYemek" },
  { src: TrendyolYemek, name: "TrendyolYemek" },
  { src: Yemeksepeti, name: "Yemeksepeti" },
  { src: GoFody, name: "GoFody" },
  { src: Siparisim, name: "Siparisim" },
];

const SecondStep = ({ paymentMethod, setPaymentMethod, step, setStep }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [licensePackagesData, setLicensePackagesData] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setStep(3);
  }

  useEffect(() => {
    if (cartItems) {
      setLicensePackagesData(groupedLicensePackages(cartItems));
    }
  }, [cartItems]);

  return (
    step === 2 && (
      <form onSubmit={handleSubmit}>
        <div className="w-full px-4 font-normal">
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
                        <div key={pkg.restaurantId} className="flex flex-col">
                          <p className="text-xs">{pkg.restaurantName}</p>
                          <div
                            className={`py-1 px-6 rounded w-28 ${
                              isSelected
                                ? "bg-[--primary-1] text-[--white-1]"
                                : "bg-gray-200"
                            }`}
                          >
                            <p className="whitespace-nowrap">
                              {pkg.time} Yıllık
                            </p>
                            <p
                              className={`text-sm whitespace-nowrap ${
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

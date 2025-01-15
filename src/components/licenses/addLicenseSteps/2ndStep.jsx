//MODULES
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

//COMP
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";

//IMG
import GoFody from "../../../assets/img/packages/GoFody.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";

//FUNC
import { groupedLicensePackages } from "../../../utils/utils";

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
      <form
        onSubmit={handleSubmit}
        className="min-h-full flex flex-col justify-between overflow-y-autoo"
      >
        <div className="w-full px-4 min-h-max">
          <div className="w-full flex justify-center pt-2">
            <div>
              <p className="text-center py-2">Ödeme Yontemı Seç</p>
              <div className="flex gap-2">
                {paymentMethod.options.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => {
                      setPaymentMethod((prev) => {
                        return {
                          ...prev,
                          selectedOption: option,
                        };
                      });
                    }}
                    className={`py-2.5 px-2  text-[--white-1] text-sm rounded-md ${
                      option.value === paymentMethod.selectedOption.value
                        ? "bg-[--green-1]"
                        : "bg-[--status-primary-1]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <main className="w-max mt-16 flex flex-col gap-1">
            {licensePackagesData &&
              licensePackagesData.map((licensePkg, i) => (
                <div
                  key={i}
                  className="flex items-center gap-8 even:bg-[--white-1] odd:bg-[--table-odd] relative"
                >
                  <img
                    src={imageSRCs[licensePkg[0].licenseTypeId]?.src}
                    alt="Pazaryeri"
                    className="w-36 h-full rounded-sm"
                  />
                  {i === 0 && (
                    <p className="absolute -top-6 left-0 right-0 text-sm w-36">
                      Pazaryeri
                    </p>
                  )}
                  <div className="flex gap-4 py-1">
                    {licensePkg.map((pkg) => {
                      const isSelected = true;

                      return (
                        <React.Fragment key={pkg.restaurantId}>
                          <div className="flex flex-col items-center text-center text-[12px] leading-snug relative">
                            {i === 0 && (
                              <p className="absolute -top-6 left-0 right-0 text-sm">
                                Restoran Adı
                              </p>
                            )}
                            <p className="text-[8px] whitespace-nowrap">
                              {pkg.restaurantName}
                            </p>
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
                                {pkg.price} ₺
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-8 py-1">
                            <div className="text-center text-sm flex flex-col justify-center px-3 relative">
                              {i === 0 && (
                                <p className="absolute -top-8 left-0 right-0">
                                  KDV%{pkg.kdvPercentage}
                                </p>
                              )}
                              <p className="font-normal">
                                {(pkg.price / 100) * pkg.kdvPercentage} ₺
                              </p>
                            </div>
                            <div className="text-center flex flex-col justify-center px-3 relative">
                              {i === 0 && (
                                <p className="absolute -top-8 left-0 right-0">
                                  Toplam
                                </p>
                              )}
                              <p className="font-normal">{pkg.kdvPrice} ₺</p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              ))}
          </main>
        </div>

        {/* BTNS */}
        <div
          className={`w-full flex justify-end gap-4 ${
            cartItems.length > 5 && "py-6"
          }`}
        >
          <div className="w-max flex gap-3 self-en">
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
        </div>
      </form>
    )
  );
};

export default SecondStep;

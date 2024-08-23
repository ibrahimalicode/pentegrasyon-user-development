import { DownArrowI } from "../../../../../assets/icon";
import CustomSelect from "../../../../common/customSelector";

// IMAGES
import Getiryemek from "../../../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../../../assets/img/packages/Yemeksepeti.png";
import { useLocation } from "react-router-dom";

const imageSRCs = [
  Getiryemek,
  MigrosYemek,
  TrendyolYemek,
  Yemeksepeti,
  GoFody,
  Siparisim,
];

const FirstStep = ({
  licenseData,
  setLicenseData,
  paymentMethod,
  setPaymentMethod,
  licensePackagesData,
}) => {
  const location = useLocation();
  const { currentLicense } = location?.state;
  return (
    <div className="size-full flex flex-col">
      <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        <img
          src={imageSRCs[currentLicense.marketplaceId]}
          alt="MarketPlacePhoto"
          className="w-32 rounded-sm"
        />

        <p className="">{licenseData.time ? licenseData.time : "0"} Yıllık</p>
        <p className="">{licenseData.price ? licenseData.price : "00.00"}</p>
      </div>

      <div className="px-0 flex justify-between items-center pt-2 gap-4">
        <CustomSelect
          required={true}
          className="text-sm"
          className2="mt-[0] sm:mt-[0] min-w-52"
          value={licenseData}
          options={licensePackagesData}
          onChange={(selectedOption) => {
            setLicenseData(selectedOption);
          }}
        />
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
  );
};

export default FirstStep;

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
import { formatLisansPackages } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

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
  const { currentLicense } = location?.state || {};

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );

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

  return (
    <div className="size-full flex flex-col">
      <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        <img
          src={imageSRCs[licensePackageData?.id]}
          alt="Pazaryeri"
          className="w-32 rounded-sm"
        />

        <p className="">
          {licensePackageData.time ? licensePackageData.time : "0"} Yıllık
        </p>
        <p className="">
          {licensePackageData.price ? licensePackageData.price : "00.00"}
        </p>
      </div>

      <div className="px-0 flex justify-between items-center pt-2 gap-4">
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

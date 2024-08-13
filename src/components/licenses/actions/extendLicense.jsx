import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, ExtendI } from "../../../assets/icon";
import CustomCheckbox from "../../common/customCheckbox";
import Button from "../../common/button";

// IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../../common/customSelector";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { formatLisansPackages, getDateRange } from "../../../utils/utils";
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
  updateLicenseDay,
} from "../../../redux/licenses/updateLicenseDateSlice";
import toast from "react-hot-toast";

const imageSRCs = [
  Getiryemek,
  MigrosYemek,
  TrendyolYemek,
  Yemeksepeti,
  GoFody,
  Siparisim,
];

const ExtendLicense = ({ licenseData, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <ExtendLicensePopup data={licenseData} onSuccess={onSuccess} />
    );
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left text-[--gr-1] cursor-pointer border-b border-solid border-[--border-1]"
      onClick={handlePopup}
    >
      <ExtendI className="w-[1.1rem]" />
      Extend
    </button>
  );
};

export default ExtendLicense;

const ExtendLicensePopup = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.updateLicenseDate
  );
  const {
    success: licensePackagesSuccess,
    error: licensePackagesError,
    licensePackages,
  } = useSelector((state) => state.licensePackages.getLicensePackages);
  const { setShowPopup, setPopupContent } = usePopup();

  const [checked, setChecked] = useState(false);
  const [licensePackagesData, setLicensePackagesData] = useState([]);
  const [licenseData, setLicenseData] = useState({
    value: null,
    label: "Lisans Paketi Seç",
    id: null,
    time: null,
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateLicenseDate({
        licenseId: data.id,
        startDateTime: getDateRange(licenseData.time).startDateTime,
        endDateTime: getDateRange(licenseData.time).endDateTime,
      })
    );
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateLicenseDate());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans barıyla uzatıldı 🥳🥳");
      dispatch(resetUpdateLicenseDate());
    }
  }, [loading, success, error]);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackages) {
      dispatch(getLicensePackages());
    }
    return () => {
      if (licensePackages) {
        dispatch(resetGetLicensePackages());
      }
    };
  }, [licensePackages]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (licensePackagesError) {
      if (licensePackagesError?.message_TR) {
        toast.error(licensePackagesError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (licensePackagesSuccess) {
      const currentMarketplace = licensePackages.data.filter(
        (pack) => pack.marketplaceId === data.marketplaceId
      );
      setLicensePackagesData(formatLisansPackages(currentMarketplace));
    }
  }, [licensePackagesSuccess, licensePackagesError, licensePackages]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <form
        className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="absolute top-4 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-xl font-bold">Lisans paketi uzat</h1>

        <div className="w-full max-w-lg self-center px-1 sm:px-14">
          <div className="w-full mt-7 text-[--gr-1] max-sm:text-center">
            <p>Mevcüt lisans</p>
          </div>

          <div className="flex justify-between max-sm:justify-center gap-2 sm:gap-10 mt-2 w-full text-center text-sm">
            <div className="flex flex-col justify-center gap-3 items-between">
              <p className="text-start">Pazaryeri</p>
              <img
                src={imageSRCs[data.marketplaceId]}
                alt="MarketPlacePhoto"
                className="w-32"
              />
            </div>

            <div className="w-full flex flex-col justify-between whitespace-nowrap max-w-56">
              <p>Lisans Süresi </p>
              <p className="py-3 text-sm">{data.time} Yıllık</p>
            </div>
          </div>

          <div className="w-full mt-7 text-[--gr-1] max-sm:text-center">
            <p>Alınacak lisans</p>
          </div>

          <div className="flex justify-between max-sm:justify-center  gap-2 mt-2 w-full text-center text-sm">
            <div className="flex flex-col justify-center gap-3 items-center">
              <p className="w-full text-start">Pazaryeri</p>
              <img
                src={imageSRCs[data.marketplaceId]}
                alt="MarketPlacePhoto"
                className="w-32"
              />
            </div>

            <div className="w-full flex flex-col justify-between max-w-56">
              <p>Lisans Paketi </p>
              <CustomSelect
                required={true}
                className="text-sm"
                className2="mt-[0] sm:mt-[0]"
                value={licenseData}
                options={licensePackagesData}
                onChange={(selectedOption) => {
                  setLicenseData(selectedOption);
                }}
              />
            </div>
          </div>

          <div className="w-full flex max-sm:justify-center mt-8 max-sm:px-3">
            <div className="">
              <p className="text-[--red-1]">
                Lisanı uzatmak istediğinizden emin misiniz ?
              </p>

              <div className="flex justify-start gap-4 mt-4">
                <CustomCheckbox
                  label="Eminim uzat"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end pr-8">
          <Button
            text="Öde"
            type="submit"
            className="px-7 text-[--white-1] bg-[--primary-1] border-[--primary-1]"
            disabled={!checked}
          />
        </div>
      </form>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { usePopup } from "../../context/PopupContext";
import {
  resetUpdateLicensePackage,
  updateLicensePackage,
} from "../../redux/licensePackages/updateLicensePackageSlice";
import { CancelI } from "../../assets/icon";
import CustomCheckbox from "../common/customCheckbox";
import CustomToggle from "../common/customToggle";

const EditPackageIsActive = ({ packageData, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handleClick = () => {
    setPopupContent(
      <EditPackageIsActivesPopup onSuccess={onSuccess} package_={packageData} />
    );
    setShowPopup(true);
  };

  return (
    <span
      className={`text-xs font-normal cursor-pointer ${
        packageData.isActive
          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
          : "text-[--red-1] bg-[--status-red] border-[--red-1]"
      } px-3 py-1 border border-solid rounded-full`}
      onClick={handleClick}
    >
      ● {packageData.isActive ? "Aktif" : "Pasif"}
    </span>
  );
};

export default EditPackageIsActive;

///*** */////
/////////////
// EDIT packageData POPUP
function EditPackageIsActivesPopup({ onSuccess, package_ }) {
  const dispatch = useDispatch();
  const toastId = useRef();
  const packageDataIsActiveRef = useRef();

  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licensePackages.updateLicensePackage
  );

  const { id, marketplaceId, time, price, description, isActive } = package_;

  const [packageData, setpackageData] = useState({
    checked: false,
    licensePackageId: id,
    marketplaceId,
    time,
    price,
    description,
    isActive,
  });
  console.log(packageData);

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLicensePackage({ ...packageData }));
  };

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
      dispatch(resetUpdateLicensePackage());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success(
        `Lisans Paketi başarıyla ${
          package_.isActive ? "Pasifleştirildi" : "Aktifleştirildi"
        } 🥳🥳`
      );
      dispatch(resetUpdateLicensePackage());
    }
  }, [loading, success, error]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl"
        ref={packageDataIsActiveRef}
      >
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeForm}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">
            Lisans Paketinin Durumu
          </h1>
          <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left gap-8">
            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">Durum:</p>
              <p
                className={`py-3 border border-dashed w-24 text-center rounded-md ${
                  package_.isActive
                    ? "text-[--green-1] border-[--green-1]"
                    : "text-[--red-1] border-[--red-1]"
                }`}
              >
                ● {package_.isActive ? "Aktif" : "Pasif"}
              </p>
            </div>

            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">İşlem:</p>
              <CustomToggle
                className="scale-[.8]"
                className2={`text-[17px] ${
                  package_.isActive ? "text-[--red-1]" : "text-[--green-1]"
                }`}
                label={package_.isActive ? "Pasifleştir" : "Aktifleştir"}
                checked={packageData.checked}
                onChange={() =>
                  setpackageData((prev) => {
                    return {
                      ...prev,
                      checked: !packageData.checked,
                      isActive: !packageData.isActive,
                    };
                  })
                }
              />
            </div>

            <div className="w-full flex gap-12 items-center justify-end">
              <button
                disabled={!packageData.checked}
                onClick={handleSubmit}
                className={`py-3 w-24 text-center rounded-md border border-solid transition-colors disabled:cursor-not-allowed ${
                  package_.isActive
                    ? "bg-[--status-red] text-[--red-1] border-[--red-1] hover:bg-[--red-1] hover:text-[--white-1] disabled:hover:bg-[--status-red] disabled:hover:text-[--red-1]"
                    : "bg-[--status-green] text-[--green-1] hover:bg-[--green-1] hover:text-[--white-1] border-[--green-1] disabled:hover:bg-[--status-green] disabled:hover:text-[--green-1]"
                }`}
              >
                {package_.isActive ? "Pasifleştir" : "Aktifleştir"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

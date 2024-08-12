import { useDispatch } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { DeleteI } from "../../../assets/icon";

const DeleteLicense = ({ licensePackage, setOpenMenu, onSuccess }) => {
  const dispatch = useDispatch();
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <DeleteLicensePopup data={licensePackage} onSuccess={onSuccess} />
    );
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left text-[--red-1] cursor-pointer"
      onClick={handlePopup}
    >
      <DeleteI className="w-[1.1rem]" />
      Sil
    </button>
  );
};

export default DeleteLicense;

const DeleteLicensePopup = ({ data, onSuccess }) => {};

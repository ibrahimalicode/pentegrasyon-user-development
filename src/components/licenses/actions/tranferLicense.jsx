import { useDispatch } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { TransferI } from "../../../assets/icon";

const TransferLicense = ({ licensePackage, setOpenMenu, onSuccess }) => {
  const dispatch = useDispatch();
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <TransferLicensePopup data={licensePackage} onSuccess={onSuccess} />
    );
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left text-[--gr-1] cursor-pointer  border-b border-solid border-[--border-1]"
      onClick={handlePopup}
    >
      <TransferI className="w-[1.1rem]" />
      Transfer
    </button>
  );
};

export default TransferLicense;

const TransferLicensePopup = ({ data, onSuccess }) => {};

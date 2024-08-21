// MODULES

// COMPONENTS
import { ExtendI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import ActionButton from "../../common/actionButton";
import ExtendLicensePopup from "./popups/extendLicensePopup/extendLicensePopup";

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
    <ActionButton
      element={<ExtendI className="w-[1.1rem]" />}
      element2="Extend"
      onClick={handlePopup}
    />
  );
};

export default ExtendLicense;

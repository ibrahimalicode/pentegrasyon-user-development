// MODULES
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { ExtendI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import ActionButton from "../../common/actionButton";
import ExtendLicensePopup from "./popups/extendLicensePopup/extendLicensePopup";

const ExtendLicense = ({ licenseData, onSuccess }) => {
  const navigate = useNavigate();
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    navigate("", { state: { currentLicense: licenseData } });
    setShowPopup(true);
    setPopupContent(
      <ExtendLicensePopup currentLicense={licenseData} onSuccess={onSuccess} />
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

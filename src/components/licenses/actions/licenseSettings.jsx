//COMP
import { SettingsI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import GetirYemekLicenseSettings from "./marketplaceLicenseSettings/getirYemekLicenseSettings";
import YemekSepetiLicenseSettings from "./marketplaceLicenseSettings/yemekSepetiLicenseSettings";
import MigrosYemekLicenseSettings from "./marketplaceLicenseSettings/migrosYemekLicenseSettings";

const LicenseSettings = ({ licenseData, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const LicenseSettingsPopups = [
    GetirYemekLicenseSettings,
    MigrosYemekLicenseSettings,
    GetirYemekLicenseSettings, //Placeholder
    YemekSepetiLicenseSettings,
  ];
  const LicenseSettingsPopup = LicenseSettingsPopups[licenseData.licenseTypeId];

  const handlePopup = (event) => {
    event.stopPropagation();
    if (!licenseData.isActive) return;
    if (LicenseSettingsPopup) {
      setPopupContent(
        <LicenseSettingsPopup data={licenseData} onSuccess={onSuccess} />
      );
    }
  };

  return (
    <ActionButton
      className="text-[--gr-1]"
      element={<SettingsI className="w-[1.1rem]" />}
      element2="Entegrasyon"
      onClick={handlePopup}
    />
  );
};

export default LicenseSettings;

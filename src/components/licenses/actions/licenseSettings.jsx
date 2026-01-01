//COMP
import { SettingsI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import GetirYemekLicenseSettings from "./marketplaceLicenseSettings/getirYemekLicenseSettings";
import YemekSepetiLicenseSettings from "./marketplaceLicenseSettings/yemekSepetiLicenseSettings";
import MigrosYemekLicenseSettings from "./marketplaceLicenseSettings/migrosYemekLicenseSettings";
import PaketNetLicenseSettings from "./marketplaceLicenseSettings/paketNetLicenseSettings";
import TrendyolYemekLicenseSettings from "./marketplaceLicenseSettings/trendyolYemekLicenseSettings";

const LicenseSettings = ({ licenseData, onSuccess }) => {
  const { setPopupContent } = usePopup();

  const LicenseSettingsPopups = [
    { comp: GetirYemekLicenseSettings, id: 0 },
    { comp: MigrosYemekLicenseSettings, id: 1 },
    { comp: TrendyolYemekLicenseSettings, id: 2 },
    { comp: YemekSepetiLicenseSettings, id: 3 },
    { comp: PaketNetLicenseSettings, id: 8 },
  ];
  const LicenseSettingsPopup = LicenseSettingsPopups.filter(
    (P) => P.id == licenseData.licenseTypeId
  )?.[0]?.comp;

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

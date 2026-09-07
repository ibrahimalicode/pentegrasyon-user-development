//COMP
import ExtendLicense from "./extendLicense";
import LicenseSettings from "./licenseSettings";

// Two actions only, shown inline in the row — a dropdown behind a burger
// icon hid them behind an extra click (and its absolute panel had to be
// flipped above/below depending on the row).
const LicensesActions = ({ licenseData, onSuccess }) => (
  <div className="flex items-center justify-end gap-2">
    <ExtendLicense licenseData={licenseData} onSuccess={onSuccess} inline />
    <LicenseSettings licenseData={licenseData} onSuccess={onSuccess} inline />
  </div>
);

export default LicensesActions;

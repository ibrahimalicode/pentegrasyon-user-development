//COMP
// import AddLicensesPopup from "./popups/addLicensePopup";
import { usePopup } from "../../../context/PopupContext";

const AddLicense = ({ onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handleClick = () => {
    // setPopupContent(<AddLicensesPopup onSuccess={onSuccess} />);
    setShowPopup(true);
  };

  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={handleClick}
    >
      Add License
    </button>
  );
};

export default AddLicense;

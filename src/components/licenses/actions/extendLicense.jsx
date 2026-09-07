// MODULES
import { useNavigate, useLocation } from "react-router-dom";

// COMPONENTS
import { ExtendI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";

const ExtendLicense = ({ licenseData, inline }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, restaurant } = location.state || {};

  const handleClick = (event) => {
    event.stopPropagation();
    const currentPath = location.pathname;
    navigate(`${currentPath}/extend-license`, {
      state: { user, restaurant, currentLicense: licenseData },
    });
  };

  return (
    <ActionButton
      className={
        inline
          ? "w-auto whitespace-nowrap rounded-[20px] border border-solid border-[--border-1] px-3 py-1.5 text-xs hover:border-[--primary-1] hover:text-[--primary-1]"
          : undefined
      }
      element={<ExtendI className="w-[1.1rem]" />}
      element2="Lisans Uzat"
      onClick={handleClick}
    />
  );
};

export default ExtendLicense;

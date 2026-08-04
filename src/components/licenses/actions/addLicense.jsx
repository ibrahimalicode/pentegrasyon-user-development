import { useLocation, useNavigate } from "react-router-dom";
import { TOOLBAR_BTN_PRIMARY } from "../../../components/common/toolbarStyles";

const AddLicense = ({ user, restaurant, licenses }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    event.stopPropagation();
    const currentPath = location.pathname;
    navigate(`${currentPath}/add-license`, {
      state: { user, restaurant, licenses },
    });
  };

  return (
    <button
      className={TOOLBAR_BTN_PRIMARY}
      onClick={handleClick}
      disabled={!licenses}
    >
      Lisans Ekle
    </button>
  );
};

export default AddLicense;

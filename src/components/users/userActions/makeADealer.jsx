import { UserPlusI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";

const MakeADealer = () => {
  const handleClick = () => {
    console.log("MakeADealer");
  };
  return (
    <ActionButton
      element={<UserPlusI className="w-5" />}
      element2="Bayi Yap"
      onClick={handleClick}
    />
  );
};

export default MakeADealer;

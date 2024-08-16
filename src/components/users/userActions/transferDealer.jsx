import { TransferI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";

const TransferDealer = () => {
  const handleClick = () => {
    console.log("Transfer Dealer");
  };
  return (
    <ActionButton
      element={<TransferI className="w-5" strokeWidth="1.8" />}
      element2="Bayi Transfer"
      onClick={handleClick}
    />
  );
};

export default TransferDealer;

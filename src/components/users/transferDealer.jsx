import { TransferI } from "../../assets/icon";

const TransferDealer = () => {
  const handleClick = () => {
    console.log("Transfer Dealer");
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <TransferI className="w-5" strokeWidth="1.8" />
      Bayi Transfer
    </button>
  );
};

export default TransferDealer;

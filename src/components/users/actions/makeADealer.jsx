import { UserPlusI } from "../../../assets/icon";

const MakeADealer = () => {
  const handleClick = () => {
    console.log("MakeADealer");
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <UserPlusI className="w-5" />
      Bayi Yap
    </button>
  );
};

export default MakeADealer;

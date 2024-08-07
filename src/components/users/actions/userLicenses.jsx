import { LicenseI } from "../../../assets/icon";

const UserLicenses = () => {
  const handleClick = () => {
    console.log("UserLicenses");
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <LicenseI className="w-5" /> Lisanslar
    </button>
  );
};

export default UserLicenses;

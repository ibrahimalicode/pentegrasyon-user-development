import { useState } from "react";
import MenuI from "../../assets/icon/menu";
import DeleteUser from "./deleteUser";
import EditUser from "./editUser";
import MakeADealer from "./makeADealer";
import TransferDealer from "./transferDealer";
import UserLicenses from "./userLicenses";
import UserRestaurants from "./userRestaurants";

const UsersActions = ({ index, user }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      <div className="cursor-pointer" onClick={handleClick}>
        <MenuI className="w-full" />
      </div>
      {openMenu === index && (
        <span
          className={`absolute top-4 right-9 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden`}
        >
          <ul className="bg-[--white-1] text-[--gr-1] w-48">
            <UserRestaurants user={user} setOpenMenu={setOpenMenu} />
            <UserLicenses user={user} setOpenMenu={setOpenMenu} />
            <MakeADealer user={user} setOpenMenu={setOpenMenu} />
            <TransferDealer user={user} setOpenMenu={setOpenMenu} />
            <EditUser user={user} setOpenMenu={setOpenMenu} />
            <DeleteUser user={user} setOpenMenu={setOpenMenu} />
          </ul>
        </span>
      )}
    </>
  );
};

export default UsersActions;

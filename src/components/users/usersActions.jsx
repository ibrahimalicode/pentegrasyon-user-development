import { useEffect, useRef, useState } from "react";
import MenuI from "../../assets/icon/menu";
import DeleteUser from "./deleteUser";
import EditUser from "./editUser";
import MakeADealer from "./makeADealer";
import TransferDealer from "./transferDealer";
import UserLicenses from "./userLicenses";
import UserRestaurants from "./userRestaurants";
import { usePopup } from "../../context/PopupContext";

const UsersActions = ({ index, user, itemsPerPage, onSuccess }) => {
  const outRef = useRef();
  const usersMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (usersMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "userActions");
      setContentRef([
        ...refs,
        {
          id: "userActions",
          outRef: outRef.current ? outRef : null,
          ref: usersMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [usersMenuRef, outRef, openMenu]);
  return (
    <>
      <div className="cursor-pointer" onClick={handleClick} ref={usersMenuRef}>
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>
      {openMenu === index && (
        <div
          className={`absolute right-9 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
            index < itemsPerPage / 2 ? "top-5" : "bottom-5"
          }`}
          ref={outRef}
        >
          <ul className="bg-[--white-1] text-[--gr-1] w-48">
            <UserRestaurants user={user} setOpenMenu={setOpenMenu} />
            <UserLicenses user={user} setOpenMenu={setOpenMenu} />
            <MakeADealer user={user} setOpenMenu={setOpenMenu} />
            <TransferDealer user={user} setOpenMenu={setOpenMenu} />
            <EditUser
              user={user}
              setOpenMenu={setOpenMenu}
              onSuccess={onSuccess}
            />
            <DeleteUser
              user={user}
              setOpenMenu={setOpenMenu}
              onSuccess={onSuccess}
            />
          </ul>
        </div>
      )}
    </>
  );
};

export default UsersActions;

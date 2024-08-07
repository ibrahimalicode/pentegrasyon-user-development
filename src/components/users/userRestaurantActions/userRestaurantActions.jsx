import { useEffect, useRef, useState } from "react";
import MenuI from "../../../assets/icon/menu";
import UserRestaurantLicenses from "./licenses";

const UsersActions = ({ index, itemsPerPage }) => {
  const outRef = useRef();
  const userRestaurantMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (userRestaurantMenuRef) {
      const refs = contentRef.filter(
        (ref) => ref.id !== "userRestaurantActions"
      );
      setContentRef([
        ...refs,
        {
          id: "userRestaurantActions",
          outRef: outRef.current ? outRef : null,
          ref: userRestaurantMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [userRestaurantMenuRef, outRef, openMenu]);
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={userRestaurantMenuRef}
      >
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
            <UserRestaurantLicenses />
          </ul>
        </div>
      )}
    </>
  );
};

export default UsersActions;

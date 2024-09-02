import { useEffect, useRef, useState } from "react";
import MenuI from "../../../assets/icon/menu";
import UserRestaurantLicenses from "./licenses";
import { usePopup } from "../../../context/PopupContext";
import EditRestaurant from "./edit";
import DeleteRetaurant from "./delete";
import TransferRestaurant from "./transfer";

const Actions = ({ index, restaurant, onSuccess }) => {
  const outRef = useRef();
  const restaurantMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (restaurantMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "restaurantActions");
      setContentRef([
        ...refs,
        {
          id: "restaurantActions",
          outRef: outRef.current ? outRef : null,
          ref: restaurantMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [restaurantMenuRef, outRef, openMenu]);
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={restaurantMenuRef}
      >
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>
      {openMenu === index && (
        <div
          className={`absolute right-10 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
            index < 5 ? "top-5" : "bottom-5"
          }`}
          ref={outRef}
        >
          <ul className="bg-[--white-1] text-[--gr-1] w-48">
            <UserRestaurantLicenses restaurant={restaurant} />
            <TransferRestaurant restaurant={restaurant} />
            <EditRestaurant restaurant={restaurant} onSuccess={onSuccess} />
            <DeleteRetaurant restaurant={restaurant} onSuccess={onSuccess} />
          </ul>
        </div>
      )}
    </>
  );
};

export default Actions;

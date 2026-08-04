import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import MenuI from "../../../assets/icon/menu";
import UserRestaurantLicenses from "./licenses";
import { usePopup } from "../../../context/PopupContext";
import EditRestaurant from "./edit";
import DeleteRetaurant from "./delete";
import TransferRestaurant from "./transfer";

// menuClassName lets a card anchor the dropdown to itself; the default
// keeps the original table-row placement.
const Actions = ({ index, restaurant, onSuccess, menuClassName }) => {
  const outRef = useRef();
  const restaurantMenuRef = useRef();
  const { registerClickOutside } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (restaurantMenuRef) {
      registerClickOutside("restaurantActions", {
        ref: restaurantMenuRef,
        outRef: outRef.current ? outRef : null,
        callback: () => setOpenMenu(null),
      });
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
          className={cn(
            "absolute z-20 border border-solid border-[--border-1] rounded-xl shadow-dropdown overflow-hidden",
            menuClassName || `right-10 ${index < 5 ? "top-5" : "bottom-5"}`
          )}
          ref={outRef}
        >
          <ul className="bg-[--white-1] text-[--gr-1] w-48">
            <UserRestaurantLicenses restaurant={restaurant} />
            {/* <TransferRestaurant restaurant={restaurant} /> */}
            <EditRestaurant restaurant={restaurant} onSuccess={onSuccess} />
            <DeleteRetaurant restaurant={restaurant} onSuccess={onSuccess} />
          </ul>
        </div>
      )}
    </>
  );
};

export default Actions;

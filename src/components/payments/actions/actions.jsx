//MODULES
import { useEffect, useRef, useState } from "react";

//COMP
import ShowDocument from "./showDocument";
import ShowBasketPopup from "./showBasket";
import MenuI from "../../../assets/icon/menu";
import { usePopup } from "../../../context/PopupContext";

const Actions = ({ index, payment }) => {
  const outRef = useRef();
  const paymentsRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (paymentsRef) {
      const refs = contentRef.filter((ref) => ref.id !== "paymentsActions");
      setContentRef([
        ...refs,
        {
          id: "paymentsActions",
          outRef: outRef.current ? outRef : null,
          ref: paymentsRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [paymentsRef, outRef, openMenu]);
  return (
    <>
      <div className="cursor-pointer" onClick={handleClick} ref={paymentsRef}>
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
            <ShowBasketPopup payment={payment} />
            <ShowDocument payment={payment} />
          </ul>
        </div>
      )}
    </>
  );
};

export default Actions;

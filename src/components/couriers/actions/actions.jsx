import { useEffect, useRef, useState } from "react";
import MenuI from "../../../assets/icon/menu";
import { usePopup } from "../../../context/PopupContext";
import EditCourier from "./editCourier";
import DeleteCourier from "./deleteCourier";
import UpdateCourierLoginCode from "./updateCourierLoginCode";

const Actions = ({ index, courier, onSuccess }) => {
  const outRef = useRef();
  const courierMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (courierMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "courierActions");
      setContentRef([
        ...refs,
        {
          id: "courierActions",
          outRef: outRef.current ? outRef : null,
          ref: courierMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [courierMenuRef, outRef, openMenu]);

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={courierMenuRef}
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
            <EditCourier courier={courier} onSuccess={onSuccess} />
            <UpdateCourierLoginCode courier={courier} onSuccess={onSuccess} />
            <DeleteCourier courier={courier} onSuccess={onSuccess} />
          </ul>
        </div>
      )}
    </>
  );
};

export default Actions;

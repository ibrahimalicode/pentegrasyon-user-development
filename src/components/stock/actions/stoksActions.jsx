//MODULES
import { useEffect, useRef, useState } from "react";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import MenuI from "../../../assets/icon/menu";
import UseStock from "./useStock";

//ACTIONS

const StocksActions = ({ index, stockData, itemsPerPage, onSuccess }) => {
  const stockDatasMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (stockDatasMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "stockDatasMenuRef");
      setContentRef([
        ...refs,
        {
          id: "stockDatasMenuRef",
          outRef: null,
          ref: stockDatasMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [stockDatasMenuRef, openMenu]);

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={stockDatasMenuRef}
      >
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>
      <div
        className={`absolute right-10 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
          index < itemsPerPage / 2 ? "top-5" : "bottom-5"
        } ${openMenu !== index && "invisible"}`}
      >
        <ul className="bg-[--white-1] text-[--gr-1] w-48">
          <UseStock stockData={stockData} onSuccess={onSuccess} />
        </ul>
      </div>
    </>
  );
};

export default StocksActions;

import { useState } from "react";
import { usePopup } from "../../../context/PopupContext";
import RestaurantsStatusPopup from "./restaurantsStatusPopup";

const RestaurantsStatus = () => {
  const { setPopupContent } = usePopup();
  const [showTooltip, setShowTooltip] = useState(true);

  const [btnStyle, setBtnStyle] = useState({
    classname:
      "font-medium text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.7 animate-pulse relative after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-red-500 after:animate-[emergencyRipple_1s_ease-out_infinite] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-red-600 before:animate-[emergencyRipple_1s_ease-out_infinite] before:delay-500 flex items-center justify-center",
    style: { backgroundColor: "rgb(239, 68, 68)", transition: "all 0.3s ease" },
  });

  return (
    <div className="flex items-end relative w-max">
      <div
        className={`absolute -bottom-16 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 
                   px-4 py-2 rounded-lg border border-red-200 shadow-lg
                   transition-all duration-300 transform
                   ${
                     showTooltip
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-2 pointer-events-none"
                   }
                   whitespace-nowrap
                   after:content-[''] after:absolute after:left-1/2 after:-top-2
                   after:w-4 after:h-4 after:bg-red-100 after:rotate-45
                   after:-translate-x-1/2 after:border-t after:border-l after:border-red-200`}
      >
        <span className="font-medium">Restoran Kapalı !</span>
      </div>

      <button
        onClick={() => setPopupContent(<RestaurantsStatusPopup />)}
        className="w-full whitespace-nowrap border border-[--primary-2] text-[--primary-2] text-sm py-2.5 px-4 rounded-md"
      >
        Restoran Durumları
      </button>
    </div>
  );
};

export default RestaurantsStatus;

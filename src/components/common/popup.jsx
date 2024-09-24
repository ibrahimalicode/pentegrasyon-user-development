import { useEffect } from "react";
import { usePopup } from "../../context/PopupContext";

const Popup = () => {
  const { popupContent } = usePopup();

  useEffect(() => {
    if (popupContent) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [popupContent]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 justify-center items-center transition-colors p-[2%] z-[9999] ${
        popupContent ? "flex bg-black/20" : "hidden"
      }`}
    >
      <div
        className={`bg-[--btn-txt] w-full max-w-[45rem] rounded-xl transition-all ${
          popupContent ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {popupContent}
      </div>
    </div>
  );
};

export default Popup;

import { usePopup } from "../../context/PopupContext";

const Popup = () => {
  const { showPopup, popupContent } = usePopup();
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-colors p-[2%] z-[999] ${
        showPopup ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        className={`bg-[--btn-txt] w-full max-w-[45rem] rounded-xl transition-all ${
          showPopup ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {popupContent}
      </div>
    </div>
  );
};

export default Popup;

import React, { createContext, useState, useContext, useEffect } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [contenRef, setContentRef] = useState([]);

  const handleClickOutside = (event) => {
    if (contenRef.length > 0) {
      contenRef.forEach((content) => {
        if (
          content.ref.current &&
          !content.ref.current.contains(event.target)
        ) {
          content.callback(null);
        }
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [contenRef]);

  return (
    <PopupContext.Provider
      value={{
        showPopup,
        setShowPopup,
        popupContent,
        setPopupContent,
        contenRef,
        setContentRef,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

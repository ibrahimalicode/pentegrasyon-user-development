import React, { createContext, useState, useContext } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

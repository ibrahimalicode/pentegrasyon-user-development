import { createContext, useState, useContext } from "react";

const SlideBarContext = createContext();

export const useSlideBar = () => useContext(SlideBarContext);

export const SlideBarProvider = ({ children }) => {
  const [slideBarContent, setSlideBarContent] = useState(null);

  return (
    <SlideBarContext.Provider
      value={{
        slideBarContent,
        setSlideBarContent,
      }}
    >
      {children}
    </SlideBarContext.Provider>
  );
};

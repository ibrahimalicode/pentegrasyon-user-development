import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import CustomGeneralLoader from "../components/common/customGeneralLoader";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const { isLoading } = useSelector((state) => state.isLoading);

  const [popupContent, setPopupContent] = useState(null);
  const [loadingComponent, setLoadingComponent] = useState(null);

  // Click-outside registry lives in a ref so registering never re-renders the
  // provider or re-binds the document listener. Entries are upserted by id and
  // deliberately never auto-removed (same semantics as the old state array —
  // the handler skips entries whose ref is no longer mounted).
  const clickOutsideRegistry = useRef(new Map());

  const registerClickOutside = useCallback((id, { ref, outRef, callback }) => {
    clickOutsideRegistry.current.set(id, { ref, outRef, callback });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      clickOutsideRegistry.current.forEach(({ ref, outRef, callback }) => {
        if (!ref?.current) return;
        const insideMain = ref.current.contains(event.target);
        const insideOut = outRef?.current
          ? outRef.current.contains(event.target)
          : false;
        if (!insideMain && !insideOut) callback();
      });
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      setLoadingComponent(<CustomGeneralLoader />);
    } else {
      setLoadingComponent(false);
    }
  }, [isLoading]);

  return (
    <PopupContext.Provider
      value={{
        popupContent,
        setPopupContent,
        registerClickOutside,
        loadingComponent,
        setLoadingComponent,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

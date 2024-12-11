//MODULES
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";

//REDUX
import { resetgetUserLock } from "../redux/user/getUserLockSlice";

const ProtectPagesContext = createContext();

export const useProtectPages = () => useContext(ProtectPagesContext);

export const ProtectPagesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { error, data, success } = useSelector(
    (state) => state.user.getUserLock
  );

  const [protectedPages, setProtectedPages] = useState(null);
  const [protectedPagesBefore, setProtectedPagesBefore] = useState(null);

  //SET, THE GET IS IN THE SIDEBAR COMPONENT
  useEffect(() => {
    if (error) {
      dispatch(resetgetUserLock());
    }
    if (success) {
      setProtectedPages(data);
      setProtectedPagesBefore(data);
      dispatch(resetgetUserLock());
    }
  }, [success, data, error]);

  return (
    <ProtectPagesContext.Provider
      value={{
        protectedPages,
        setProtectedPages,
        protectedPagesBefore,
        setProtectedPagesBefore,
      }}
    >
      {children}
    </ProtectPagesContext.Provider>
  );
};

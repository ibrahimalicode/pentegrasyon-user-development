//MODULES
import { getAuth } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";

//REDUX
import { getUserLock, resetgetUserLock } from "../redux/user/getUserLockSlice";

const ProtectPagesContext = createContext();

export const useProtectPages = () => useContext(ProtectPagesContext);

export const ProtectPagesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAuth()?.token;
  const { error, data } = useSelector((state) => state.user.getUserLock);

  const [protectedPages, setProtectedPages] = useState(null);
  const [protectedPagesBefore, setProtectedPagesBefore] = useState(null);

  //GET
  useEffect(() => {
    if (!protectedPages && token) {
      dispatch(getUserLock());
    }
  }, [protectedPages, token]);

  //SET
  useEffect(() => {
    if (error) {
      dispatch(resetgetUserLock());
    } else if (data) {
      setProtectedPages(data);
      setProtectedPagesBefore(data);
      dispatch(resetgetUserLock());
    }
  }, [data, error]);

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

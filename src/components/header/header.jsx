//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { usePopup } from "../../context/PopupContext";
import { BellI, SettingsI, MenuI } from "../../assets/icon";

//REDUX
import { getAuth, clearAuth } from "../../redux/api";
import { logout, resetLogoutState } from "../../redux/auth/logoutSlice";
import { useMessagesContext } from "../../context/MessagesContext";
import { useFirestore } from "../../context/FirestoreContext";

function Header({ openSidebar, setOpenSidebar }) {
  const toastId = useRef();
  const param = useParams();
  const dispatch = useDispatch();
  const headerSettingsRef = useRef();
  const { newMessage } = useFirestore();
  const { messagesData } = useMessagesContext();

  const { loading, success, error } = useSelector((state) => state.auth.logout);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const userSessionId = getAuth().sessionId;
    setOpen(!open);
    dispatch(logout({ userSessionId }));
  };

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Çıkış Yapılıyor...");
    }
    if (success) {
      clearAuth();
      window.location.href = "/login";
      dispatch({ type: "LOGOUT" });
      dispatch(resetLogoutState());
      toast.dismiss(toastId.current);
    }
    if (error) {
      // clearAuth();
      // navigate("/login");
      dispatch(resetLogoutState());
    }
  }, [success, loading, error]);

  const { contentRef, setContentRef } = usePopup();

  useEffect(() => {
    if (headerSettingsRef) {
      const refs = contentRef.filter((ref) => ref.id !== "headerSettings");
      setContentRef([
        ...refs,
        {
          id: "headerSettings",
          outRef: null,
          ref: headerSettingsRef,
          callback: () => setOpen(false),
        },
      ]);
    }
  }, [headerSettingsRef, open]);

  useEffect(() => {
    function elmnt(t) {
      return (
        <div
          className={`transition-all max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
            t.visible ? "opacity-100 scale-1" : "opacity-0 scale-0"
          }`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5"></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {newMessage.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {newMessage.content}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              kapat
            </button>
          </div>
        </div>
      );
    }
    if (newMessage) {
      toast.custom((t) => elmnt(t), {
        position: "top-right",
        duration: 6000,
      });
    }
  }, [newMessage]);

  return (
    <header className="fixed top-0 right-0 left-0 flex flex-col justify-center h-16 py-3.5 px-[4%] bg-white border-b border-slate-200 max-md:px-5 z-[99]">
      <nav className="w-full flex justify-between items-center">
        <div
          className="text-[--gr-1] cursor-pointer"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <MenuI className={`${param["*"] === "orders" ? "" : "lg:hidden"}`} />
        </div>
        <div className="flex gap-4">
          <Link to="/messages">
            <div className="flex justify-center items-center p-[.7rem] w-10 h-10 bg-[--light-1] text-[--primary-1] rounded-3xl cursor-pointer relative">
              <BellI />
              {messagesData &&
                messagesData.filter((_) => !_.isRead).length > 0 && (
                  <span className="absolute -top-2 -left-2 text-xs border border-[--primary-1] bg-[--primary-1] text-[--white-1] rounded-full size-6 flex justify-center items-center">
                    {messagesData.filter((_) => !_.isRead).length}
                  </span>
                )}
            </div>
          </Link>
          <div
            className="flex justify-center items-center relative"
            ref={headerSettingsRef}
          >
            <div
              className="flex justify-center items-center p-[.5rem] w-10 h-10 bg-[--light-1] text-[--primary-1] rounded-3xl cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <SettingsI strokeWidth={1.5} className="size-7 text-[--gr-1]" />
            </div>

            <div
              className={`absolute top-[3rem] right-2 bg-[--white-1] border border-solid border-[--border-1] font-sans rounded-md transition-colors ${
                !open && "invisible"
              }`}
            >
              <ul>
                <Link to="/profile">
                  <li
                    className="px-6 py-2 pr-16 text-sm hover:bg-[--light-3] border-b border-solid border-[--light-3] cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    Profile
                  </li>
                </Link>
                <li
                  className="px-6 py-2 pr-16 text-sm hover:bg-[--light-3] cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

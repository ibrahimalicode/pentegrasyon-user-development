import { useDispatch, useSelector } from "react-redux";
import { BellI } from "../../assets/icon";
import { logout, resetLogoutState } from "../../redux/auth/logoutSlice";
import { useEffect, useState } from "react";
import { auth, clearAuth } from "../../redux/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.auth.logout);

  let toastId;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const userSessionId = auth().sessionId;
    setOpen(!open);
    dispatch(logout({ userSessionId }));
  };

  useEffect(() => {
    if (success) {
      clearAuth();
      toast.dismiss(toastId);
      navigate("/login");
      dispatch(resetLogoutState());
    }
    if (loading) {
      toastId = toast.loading("Logging out...");
    }
    if (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
      dispatch(resetLogoutState());
    }
  }, [success, loading, error]);
  return (
    <header className="fixed top-0 right-0 left-0 flex flex-col justify-center items-end h-16 py-3.5 px-[4%] bg-white border-b border-slate-200 max-md:px-5">
      <nav className="flex gap-4">
        <div className="flex justify-center items-center p-[.7rem] w-10 h-10 bg-[--light-1] text-[--primary-1] rounded-3xl cursor-pointer">
          <BellI />
        </div>
        <div className="flex justify-center items-center relative">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f5fdf361ec38346aaa86a20ed298879a9386866a8e0a8f3cb7ea6f7ffc5772?apiKey=1f4fb250339844f88428d2cbf4e019e9&&apiKey=1f4fb250339844f88428d2cbf4e019e9"
            alt="User avatar"
            className="w-10 rounded-full aspect-square cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          <div
            className={`absolute top-[3rem] right-2 bg-[--white-1] border border-solid border-[--border-1] font-sans rounded-md transition-all ${
              !open && "hidden"
            }`}
          >
            <ul>
              <li
                className="px-6 py-2 pr-16 text-sm hover:bg-[--light-3] border-b border-solid border-[--light-3] cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                Profile
              </li>
              <li
                className="px-6 py-2 pr-16 text-sm hover:bg-[--light-3] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

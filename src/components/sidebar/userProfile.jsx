import { Link, useParams } from "react-router-dom";
import { UserI } from "../../assets/icon";
import ArrowIR from "../../assets/icon/arrowR";
import { useEffect, useMemo, useState } from "react";
import { getAuth } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/admin/getAdminSlice";
import { getUser } from "../../redux/user/getUserSlice";

function UserProfile({ setOpenSidebar }) {
  const param = useParams();
  const dispatch = useDispatch();
  const localUser = useMemo(() => getAuth(), []);
  const isAdmin = localUser?.isManager;

  const { user } = useSelector((state) => state.user.getUser);
  const { admin } = useSelector((state) => state.admin.getAdmin);

  const [userData, setUserData] = useState(null);

  useState(() => {
    if (isAdmin) {
      if (!admin) {
        dispatch(getAdmin());
      }
    } else {
      if (!user) {
        dispatch(getUser());
      }
    }
  }, [localUser, isAdmin]);

  useEffect(() => {
    if (user && !isAdmin) {
      setUserData({
        ...user,
        rol: user.isDealer ? "Dealer" : "Kullanıcı",
      });
    }
    if (admin && isAdmin) {
      setUserData({ ...admin, rol: "Admin" });
    }
  }, [user, admin]);
  return (
    <Link to="/profile">
      <div
        className={`flex items-center gap-3 px-6 py-4 font-normal whitespace-nowrap border-t text-[--gr-1] border-neutral-200 hover:bg-[--light-1] hover:text-[--primary-1] cursor-pointer group ${
          param["*"] === "profile" && "bg-[--light-1] text-[--primary-1]"
        }`}
        onClick={() => setOpenSidebar(false)}
      >
        <div className="flex flex-1 gap-3">
          <div className="flex justify-center items-center">
            <UserI className="size-9" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-sm leading-5 text-[--black-2]">
              {userData ? userData.fullName : "User"}
            </div>
            <div className="text-xs leading-5">
              {userData ? userData.rol : "Kullanıcı"}
            </div>
          </div>
        </div>
        <div className="">
          <ArrowIR className="font-bold group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
        </div>
      </div>
    </Link>
  );
}

export default UserProfile;

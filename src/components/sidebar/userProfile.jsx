//MODULES
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//ASSETS
import { UserI } from "../../assets/icon";
import ArrowIR from "../../assets/icon/arrowR";

//UTILS
import { useProtectPages } from "../../context/ProtectPagesContext";

//REDUX

function UserProfile({ setOpenSidebar }) {
  const param = useParams();
  const { protectedPages } = useProtectPages();
  const { user } = useSelector((state) => state.user.getUser);
  const [userData, setUserData] = useState(null);

  //SET
  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        rol: user.isDealer ? "Bayi" : "Kullanıcı",
      });
    }
  }, [user]);

  return (
    <Link
      to="/profile"
      className={`${
        protectedPages?.profile &&
        protectedPages?.lock &&
        "pointer-events-none opacity-60"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 font-normal whitespace-nowrap border-t text-[--gr-1] border-[--border-1] hover:bg-[--light-1] hover:text-[--primary-1] cursor-pointer group ${
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

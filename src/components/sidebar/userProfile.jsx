//MODULES
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//ASSETS
import ArrowIR from "../../assets/icon/arrowR";

//UTILS
import { cn } from "../../lib/utils";
import { useProtectPages } from "../../context/ProtectPagesContext";

const initialsOf = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("tr");

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

  const isActive = param["*"] === "profile";
  const fullName = userData?.fullName || "Kullanıcı";

  return (
    <div className="p-3 border-t border-[--border-1] shrink-0">
      <Link
        to="/profile"
        className={cn(
          protectedPages?.profile &&
            protectedPages?.lock &&
            "pointer-events-none opacity-50"
        )}
      >
        <div
          className={cn(
            "group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
            isActive ? "bg-[--light-1]" : "hover:bg-[--light-3]"
          )}
          onClick={() => setOpenSidebar(false)}
        >
          <div
            className={cn(
              "flex shrink-0 justify-center items-center size-9 rounded-full text-xs font-semibold",
              isActive
                ? "bg-[--primary-1] text-white"
                : "bg-[--light-1] text-[--primary-1]"
            )}
          >
            {initialsOf(fullName) || "K"}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span
              className={cn(
                "text-sm font-medium truncate",
                isActive ? "text-[--primary-1]" : "text-[--black-1]"
              )}
            >
              {fullName}
            </span>
            <span className="text-xs text-[--gr-1] truncate">
              {userData?.rol || "Kullanıcı"}
            </span>
          </div>

          <ArrowIR className="size-4 shrink-0 text-[--gr-3] group-hover:translate-x-0.5 group-hover:text-[--primary-1] transition-all" />
        </div>
      </Link>
    </div>
  );
}

export default UserProfile;

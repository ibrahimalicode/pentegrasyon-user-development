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

  // 48px sidebar footer. The row IS the footer, so the fill runs edge to edge
  // and the rail can sit on the sidebar's own left edge.
  return (
    <div className="shrink-0 border-t border-[--border-1]">
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
            "group relative flex items-center gap-2 h-12 px-3 cursor-pointer transition-colors",
            // Same tint + 2px rail as an active nav item — no accent fill in
            // the chrome.
            isActive
              ? "bg-[--light-3]"
              : "hover:bg-[--light-3]"
          )}
          onClick={() => setOpenSidebar(false)}
        >
          <div className="flex shrink-0 justify-center items-center size-7 rounded-full bg-[--light-4] text-2xs font-semibold text-[--black-2]">
            {initialsOf(fullName) || "K"}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span
              className={cn(
                "text-sm truncate",
                isActive
                  ? "font-medium text-[--black-1]"
                  : "text-[--black-2] group-hover:text-[--black-1]"
              )}
            >
              {fullName}
            </span>
            <span className="text-xs text-[--gr-1] truncate">
              {userData?.rol || "Kullanıcı"}
            </span>
          </div>

          <ArrowIR
            strokeWidth={2}
            className="size-4 shrink-0 text-[--gr-3] transition-transform group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </div>
  );
}

export default UserProfile;

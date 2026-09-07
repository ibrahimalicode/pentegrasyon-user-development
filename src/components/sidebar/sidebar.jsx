//MODULES
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePopup } from "../../context/PopupContext";

//COMP
import UserProfile from "./userProfile";

//ASSETS
import logo from "../../assets/img/logo.png";
import bell_anim from "../../assets/anim/lottie/bell_anim.json";

//UTILS
import { cn } from "../../lib/utils";
import sidebarItems from "../../enums/sidebarItems";
import { useOrdersContext } from "../../context/OrdersContext";
import { useProtectPages } from "../../context/ProtectPagesContext";

// ICONS
import {
  DashboardI,
  DocI,
  RestourantI,
  LicenseI,
  LogI,
  PaymentI,
  BoxInI,
  CourierI,
  LockI,
  MessagesI,
  TrendUpI,
} from "../../assets/icon/index";

//REDUX
import { getUserLock } from "../../redux/user/getUserLockSlice";

function Sidebar({ openSidebar, setOpenSidebar, isOrdersPage, collapsed }) {
  // Icon-only rail: desktop, collapsed, and not currently shown as the
  // mobile drawer (where the labels are the whole point).
  const rail = collapsed && !openSidebar;
  const param = useParams();
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const { protectedPages } = useProtectPages();
  const { unverifiedOrders } = useOrdersContext();
  const { registerClickOutside } = usePopup();

  const [sidebarData, setSidebarData] = useState(null);

  // Index-matched with sidebarItems — keep the two lists in step.
  const sidebarIcons = [
    { icon: <DashboardI /> },
    { icon: <DocI /> },
    { icon: <RestourantI /> },
    { icon: <CourierI /> },
    { icon: <LicenseI /> },
    { icon: <TrendUpI /> },
    { icon: <BoxInI /> },
    { icon: <LogI /> },
    { icon: <PaymentI /> },
    { icon: <LockI /> },
    { icon: <MessagesI /> },
  ];

  //GET
  useEffect(() => {
    if (!protectedPages) {
      dispatch(getUserLock());
    }
  }, [protectedPages]);

  useEffect(() => {
    if (protectedPages) {
      const formattedSidebarItems = sidebarItems.map((item, i) => {
        return {
          ...item,
          icon: sidebarIcons[i].icon,
          locked: protectedPages[item.id],
        };
      });
      setSidebarData(formattedSidebarItems);
    }
  }, [protectedPages]);

  const route = Object.values(param)[0].split("/")[0];
  const path = route.length > 1 ? route : "orders";

  useEffect(() => {
    if (sidebarRef) {
      registerClickOutside("sidebar", {
        ref: sidebarRef,
        outRef: null,
        callback: () => setOpenSidebar(false),
      });
    }
  }, [sidebarRef, openSidebar]);

  return (
    <>
      {/* Dim backdrop for the drawer. On orders the sidebar is a drawer at
          every width, so the backdrop must not be hidden at lg there. */}
      <div
        className={cn(
          "fixed inset-0 z-[998] bg-slate-950/40 transition-opacity",
          !isOrdersPage && "lg:hidden",
          openSidebar
            ? "opacity-100"
            : "opacity-0 pointer-events-none invisible"
        )}
        onClick={() => setOpenSidebar(false)}
      />

      <nav
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 z-[999] flex flex-col justify-between h-[100dvh]",
          "bg-[--white-1] border-r border-[--border-1]",
          "transition-[transform,width] duration-300 ease-out",
          // Collapsed on desktop = icon rail, not hidden; the drawer that
          // slides in below lg always shows the full width.
          rail ? "w-[76px]" : "w-[240px]",
          openSidebar ? "translate-x-0 shadow-modal" : "-translate-x-full",
          !isOrdersPage && "lg:translate-x-0 lg:shadow-none"
        )}
      >
        <div className="flex flex-col w-full min-h-0">
          <header
            className={cn(
              "flex items-center h-16 shrink-0",
              rail ? "justify-center px-0" : "px-5",
            )}
          >
            <Link to="/" className="flex items-center gap-2">
              <img
                loading="lazy"
                src={logo}
                alt="Pentegrasyon"
                className="shrink-0 w-7 aspect-square"
              />
              {!rail && (
                <p className="text-lg font-semibold tracking-tight text-[--black-1] whitespace-nowrap">
                  entegrasyon
                </p>
              )}
            </Link>
          </header>

          {!rail && (
            <p className="px-5 pt-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-wider text-[--gr-3]">
              Menü
            </p>
          )}

          <div className="flex flex-col gap-0.5 px-3 pb-4 w-full overflow-y-auto">
            {sidebarData &&
              sidebarData.map((item, index) => {
                const isActive = path === item.path;
                const isLocked = item.locked && protectedPages.lock;

                return (
                  <Link
                    to={item.to}
                    key={index}
                    className={cn(isLocked && "pointer-events-none opacity-50")}
                    onClick={() => setOpenSidebar(false)}
                  >
                    <div
                      title={rail ? item.text : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 py-2.5 rounded-lg text-sm transition-colors",
                        rail ? "justify-center px-0" : "justify-between px-3",
                        isActive
                          ? "bg-[--primary-1] text-white font-medium shadow-card"
                          : "text-[--gr-1] hover:bg-[--light-3] hover:text-[--black-1]"
                      )}
                    >
                      <div className={cn("flex items-center gap-3 min-w-0", rail && "justify-center")}>
                        <span
                          className={cn(
                            "shrink-0 [&>svg]:size-5 transition-colors",
                            isActive
                              ? "text-white"
                              : "text-[--gr-3] group-hover:text-[--primary-1]"
                          )}
                        >
                          {item.icon}
                        </span>
                        {!rail && <span className="truncate">{item.text}</span>}
                      </div>

                      <div className="flex items-center shrink-0">
                        {/* Keyed by id, not position — inserting a menu
                            item used to move the alarm bell to whichever
                            row happened to land on index 5. */}
                        {unverifiedOrders && item.id === "tickets" && (
                          <Lottie
                            className="size-6 rounded-full overflow-hidden"
                            animationData={bell_anim}
                            loop={true}
                          />
                        )}
                        {isLocked && <LockI className="size-4" />}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <UserProfile setOpenSidebar={setOpenSidebar} rail={rail} />
      </nav>
    </>
  );
}

export default Sidebar;

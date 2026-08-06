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

function Sidebar({ openSidebar, setOpenSidebar, isOrdersPage }) {
  const param = useParams();
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const { protectedPages } = useProtectPages();
  const { unverifiedOrders } = useOrdersContext();
  const { registerClickOutside } = usePopup();

  const [sidebarData, setSidebarData] = useState(null);

  const sidebarIcons = [
    { icon: <DashboardI /> },
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
          "fixed inset-0 z-[998] bg-slate-950/40 backdrop-blur-[1px] transition-opacity",
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
          "fixed left-0 top-0 z-[999] flex flex-col justify-between w-60 h-[100dvh]",
          "bg-[--white-1] border-r border-[--border-1]",
          "transition-transform duration-300 ease-out",
          // Drawer below lg, permanent from lg up — except on orders, where
          // it stays a drawer so the wide table gets the full width.
          openSidebar ? "translate-x-0 shadow-modal" : "-translate-x-full",
          !isOrdersPage && "lg:translate-x-0 lg:shadow-none"
        )}
      >
        <div className="flex flex-col w-full min-h-0">
          {/* Same 48px as the header bar, so the wordmark and the page title
              sit on one baseline across the sidebar seam. */}
          <header className="flex items-center h-12 px-3 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img
                loading="lazy"
                src={logo}
                alt="Pentegrasyon"
                className="shrink-0 w-6 aspect-square"
              />
              <p className="text-lg font-semibold tracking-tight text-[--black-1] whitespace-nowrap">
                entegrasyon
              </p>
            </Link>
          </header>

          {/* Label role: muted text on a filled band is always --gr-1, never
              --gr-3 (3.79:1 on --light-3). text-2xs already carries the
              0.04em tracking, so no tracking utility here. */}
          <p className="px-3 pt-3 pb-2 text-2xs font-semibold uppercase text-[--gr-1]">
            Menü
          </p>

          {/* NOTE on `item.show` (sidebarItems.js): it is `false` on
              "Siparişler" and "Yetki Koruması", and it is deliberately still
              not honoured. Both are the ONLY navigation entry point to their
              route — nothing else in the app links to /orders (only the
              implicit "/" redirect) or to /locked-pages — and the
              unverified-order bell is rendered on the orders item itself.
              Filtering on `show` would strand /locked-pages entirely and
              remove the operator's labelled way back to the main screen, so
              the flag stays inert until those routes get another entry point.
              Item order is also load-bearing: `sidebarIcons[i]` and the
              `index == 5` bell are positional. */}
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
                      className={cn(
                        "group relative flex items-center justify-between gap-2 h-8 px-2.5 rounded-md text-sm transition-colors",
                        // No filled pill: the active item is a neutral tint
                        // plus a 2px accent rail — the same language the
                        // selected table row uses.
                        isActive
                          ? "relative bg-[--light-3] text-[--black-1] font-medium before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:rounded-full before:bg-[--primary-2]"
                          : "text-[--gr-1] hover:bg-[--light-3] hover:text-[--black-1]"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={cn(
                            "shrink-0 [&>svg]:size-4 transition-colors",
                            isActive ? "text-[--primary-2]" : "text-[--gr-3]"
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.text}</span>
                      </div>

                      <div className="flex items-center shrink-0">
                        {unverifiedOrders && index == 5 && (
                          <Lottie
                            className="size-5 rounded-full overflow-hidden"
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

        <UserProfile setOpenSidebar={setOpenSidebar} />
      </nav>
    </>
  );
}

export default Sidebar;

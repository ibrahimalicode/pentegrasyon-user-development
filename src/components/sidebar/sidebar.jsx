//MODULES
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePopup } from "../../context/PopupContext";

//COMP
import UserProfile from "./userProfile";

//ASSETS
import logo from "../../assets/img/logo.png";
import bell_anim from "../../assets/anim/lottie/bell_anim.json";

//UTILS
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
} from "../../assets/icon/index";
import { getUserLock } from "../../redux/user/getUserLockSlice";
import { useDispatch } from "react-redux";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const param = useParams();
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const { protectedPages } = useProtectPages();
  const { unverifiedOrders } = useOrdersContext();
  const { popupContent, contentRef, setContentRef } = usePopup();

  const [sidebarData, setSidebarData] = useState(null);

  const sidebarIcons = [
    { icon: <DashboardI /> },
    { icon: <RestourantI /> },
    { icon: <CourierI /> },
    { icon: <LicenseI /> },
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
      const refs = contentRef.filter((ref) => ref.id !== "sidebar");
      setContentRef([
        ...refs,
        {
          id: "sidebar",
          outRef: null,
          ref: sidebarRef,
          callback: () => setOpenSidebar(false),
        },
      ]);
    }
  }, [sidebarRef, openSidebar]);

  return (
    <nav
      className={`fixed -left-[280px] top-0 flex flex-col justify-between bg-white border-r shadow-2xl border-slate-200 w-[280px] h-[100dvh] transition-all ${
        !popupContent && "z-[999]"
      } ${openSidebar && "left-[0]"} ${
        path === "orders" && !openSidebar ? "lg:-left-[280px]" : "lg:left-[0px]"
      }`}
      ref={sidebarRef}
    >
      <div className="flex flex-col w-full relative">
        <header className="flex items-center justify-center p-6 w-full text-xl font-[500] leading-7 text-[--black-2]">
          <Link to="/" className="flex gap-1 w-max mr-6">
            <img
              loading="lazy"
              src={logo}
              alt=""
              className="shrink-0 w-7 aspect-square"
            />
            <p className="whitespace-nowrap">entegrasyon</p>
          </Link>
        </header>

        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col gap-1 px-6 pb-4 w-full">
            {sidebarData &&
              sidebarData.map((item, index) => (
                <Link
                  to={item.to}
                  key={index}
                  className={`${
                    item.locked &&
                    protectedPages.lock &&
                    "pointer-events-none opacity-60"
                  }`}
                >
                  <div
                    onClick={() => {
                      setOpenSidebar(false);
                    }}
                    className={`flex flex-col justify-center px-4 py-2 rounded-[99px] text-sm text-[--gr-1] cursor-pointer sidebar-item hover:bg-[--light-1] hover:text-[--primary-1] transition-colors relative ${
                      path === item.path && "bg-[--light-1] text-[--primary-1]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center p-1">
                          {item.icon}
                        </div>
                        <div>{item.text}</div>
                        <div>
                          {unverifiedOrders && index == 4 && (
                            <Lottie
                              className="absolute top-0 bottom-0 right-0 rounded-full overflow-hidden"
                              animationData={bell_anim}
                              loop={true}
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        {item.locked && protectedPages.lock && <LockI />}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <UserProfile setOpenSidebar={setOpenSidebar} />
    </nav>
  );
}

export default Sidebar;

import UserProfile from "./userProfile";
import logo from "../../assets/img/logo.png";

// Icons
import {
  //DashboardI,
  UsersI,
  RestourantI,
  LicenseI,
  PackagesI,
  MessagesI,
  LogI,
  PaymentI,
  ParamsI,
  UserPlusI,
  BoxInI,
} from "../../assets/icon/index";
import { DashboardAnim } from "../../assets/anim/index";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowR from "../../assets/icon/arrowR";
import { usePopup } from "../../context/PopupContext";
import { getAuth } from "../../redux/api";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const param = useParams();
  const sidebarRef = useRef();
  const localUser = useMemo(() => getAuth(), []);
  const { showPopup, contentRef, setContentRef } = usePopup();
  const sidebarItems = [
    {
      icon: DashboardAnim,
      text: "Gösterge Paneli",
      to: "/dashboard",
      path: "dashboard",
      show: true,
    },
    {
      icon: <UsersI />,
      text: "Kullanıcılar",
      to: "/users",
      path: "users",
      show: localUser?.isManager ? true : false,
    },
    {
      icon: <RestourantI />,
      text: "Restoranlar",
      to: "/restaurants",
      path: "restaurants",
      show: true,
    },
    {
      icon: <LicenseI />,
      text: "Lisanslar",
      to: "/licenses",
      path: "licenses",
      show: true,
    },
    {
      icon: <BoxInI />,
      text: "Siparişler",
      to: "/orders",
      path: "orders",
      show: localUser?.isManager ? false : true,
    },
    {
      icon: <PackagesI />,
      text: "Lisans Paketleri",
      to: "/license-packages",
      path: "license-packages",
      show: localUser?.isManager ? true : false,
    },
    {
      icon: <MessagesI />,
      text: "Mesajlar",
      to: "/messages",
      path: "messages",
      show: localUser?.isManager ? true : false,
    },
    {
      icon: <LogI />,
      text: "İşlem Kayıtları",
      to: "/activity-logs",
      path: "activity-logs",
      show: true,
    },
    {
      icon: <UserPlusI />,
      text: "Roller",
      to: "/roles",
      path: "roles",
      show: localUser?.isManager ? true : false,
    },
    {
      icon: <PaymentI />,
      text: "Ödemeler",
      to: "/payments",
      path: "payments",
      show: true,
    },
    {
      icon: <ParamsI />,
      text: "Parametreler",
      to: "/parameters",
      path: "parameters",
      show: localUser?.isManager ? true : false,
    },
  ];

  const route = Object.values(param)[0].split("/")[0];
  const path = route.length > 1 ? route : "dashboard";
  // console.log(route);

  const [hoveredIndex, setHoveredIndex] = useState([]);

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
      className={`fixed -left-[280px] lg:left-0 top-0 flex flex-col justify-between bg-white border-r shadow-2xl border-slate-200 w-[280px] h-[100dvh] transition-all ${
        !showPopup && "z-[999]"
      } ${openSidebar && "left-[0]"}`}
      ref={sidebarRef}
    >
      <div className="flex flex-col w-full relative">
        {/* <div
          className="absolute -right-8 top-2/3 bg-[--white-1] py-8 pr-2 border-2 border-solid border-[--light-3] border-l-0 cursor-pointer lg:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <ArrowR className="text-[--black-1] font-bold" />
        </div> */}
        <header className="flex flex-col justify-center items-start p-6 w-full text-xl font-[500] leading-7 text-black whitespace-nowrap">
          <div className="flex gap-2">
            <img
              loading="lazy"
              src={logo}
              alt=""
              className="shrink-0 w-8 aspect-square"
            />
            <p>Pentegrasyon</p>
          </div>
        </header>

        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col gap-1 px-6 pb-4 w-full">
            {sidebarItems
              .filter((item) => item.show)
              .map((item, index) => (
                <Link to={item.to} key={index}>
                  <div
                    onClick={() => {
                      setOpenSidebar(!openSidebar);
                    }}
                    className={`flex flex-col justify-center px-4 py-2 rounded-[99px] text-sm text-[--gr-1] cursor-pointer sidebar-item hover:bg-[--light-1] hover:text-[--primary-1] transition-colors ${
                      path === item.path && "bg-[--light-1] text-[--primary-1]"
                    }`}
                    onMouseEnter={() =>
                      setHoveredIndex((pre) => {
                        return {
                          ...pre,
                          [index]: Date.now(),
                        };
                      })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center p-1">
                        {index === 0 ? (
                          <item.icon animationKey={hoveredIndex[index]} />
                        ) : (
                          item.icon
                        )}
                      </div>
                      <div>{item.text}</div>
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

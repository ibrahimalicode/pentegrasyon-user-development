import UserProfile from "./userProfile";
import logo from "../../assets/img/logo.png";

// Icons
import {
  DashboardI,
  UsersI,
  RestourantI,
  LicenseI,
  PackagesI,
  MessagesI,
  LogI,
  RolesI,
  PaymentI,
  ParamsI,
} from "../../assets/icon/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowI from "../../assets/icon/arrowR";

const sidebarItems = [
  {
    icon: <DashboardI />,
    text: "Gösterge Paneli",
    to: "/dashboard",
  },
  {
    icon: <UsersI />,
    text: "Kullanıcılar",
    to: "/users",
  },
  {
    icon: <RestourantI />,
    text: "Restoranlar",
    to: "/restourants",
  },
  {
    icon: <LicenseI />,
    text: "Lisanslar",
    to: "/licenses",
  },
  {
    icon: <PackagesI />,
    text: "Lisans Paketleri",
    to: "/packages",
  },
  {
    icon: <MessagesI />,
    text: "Mesajlar",
    to: "/messages",
  },
  {
    icon: <LogI />,
    text: "İşlem Kayıtları",
    to: "/activity-logs",
  },
  {
    icon: <RolesI />,
    text: "Roller",
    to: "/roles",
  },
  {
    icon: <PaymentI />,
    text: "Ödemeler",
    to: "/payments",
  },
  {
    icon: <ParamsI />,
    text: "Parametreler",
    to: "/parameters",
  },
];

function Sidebar() {
  const [selectedRow, setSelectedRow] = useState(0);
  const [hideSide, setHideSide] = useState(false);

  return (
    <nav
      className={`fixed -left-[280px] lg:left-0 top-0 flex flex-col justify-between bg-white border-r shadow-2xl border-slate-200 w-[280px] h-[100dvh] transition-all z-[99] ${
        hideSide && "left-[0]"
      }`}
    >
      <div className="flex flex-col w-full relative">
        <div
          className="absolute -right-8 top-2/3 bg-[--white-1] py-8 pr-2 border-2 border-solid border-[--light-3] border-l-0 cursor-pointer lg:hidden"
          onClick={() => setHideSide(!hideSide)}
        >
          <ArrowI className="text-[--black-1] font-bold" />
        </div>
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
          <div className="flex flex-col px-6 pb-4 w-full">
            {sidebarItems.map((item, index) => (
              <Link to={item.to} key={index}>
                <div
                  onClick={() => {
                    setSelectedRow(index);
                    setHideSide(!hideSide);
                  }}
                  className={`flex flex-col justify-center px-4 py-[10px] rounded-[99px] text-sm text-[--gr-1] cursor-pointer sidebar-item ${
                    index === selectedRow && "bg-[--light-1] text-[--primary-1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center p-1">
                      {item.icon}
                    </div>
                    <div>{item.text}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <UserProfile />
    </nav>
  );
}

export default Sidebar;

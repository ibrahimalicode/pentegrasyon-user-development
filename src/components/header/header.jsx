//MODULES
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import Advert from "./advert";
import { usePopup } from "../../context/PopupContext";
import { getTheme, setTheme } from "../../utils/localStorage";
import { useMessagesContext } from "../../context/MessagesContext";
import { BellI, SettingsI, MenuI, SunI, MoonI, UserI } from "../../assets/icon";

//UTILS
import sidebarItems from "../../enums/sidebarItems";
import { cn } from "../../lib/utils";
import { initialsOf, titleCaseTr } from "../../utils/utils";

//REDUX
import { getAuth, clearAuth } from "../../redux/api";
import { logout, resetLogoutState } from "../../redux/auth/logoutSlice";

const iconButton =
  "flex justify-center items-center size-9 rounded-lg text-[--gr-1] hover:bg-[--light-3] hover:text-[--black-1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-1]/40";

function Header({
  openSidebar,
  setOpenSidebar,
  isOrdersPage,
  collapsed,
  setCollapsed,
}) {
  const toastId = useRef();
  const param = useParams();
  const dispatch = useDispatch();
  const headerSettingsRef = useRef();
  const { messagesData } = useMessagesContext();

  const { loading, success, error } = useSelector((state) => state.auth.logout);
  // Fetched globally by FirestoreContext; the slice's resetState keeps the
  // data, so this is a plain read — no dispatch from the header.
  const { user } = useSelector((state) => state.user.getUser);

  const [open, setOpen] = useState(false);

  // Page title from the route, so the header always says where you are.
  const route = (param["*"] || "").split("/")[0] || "orders";
  const pageTitle =
    sidebarItems.find((item) => item.path === route)?.text ||
    (route === "profile" ? "Profil" : "Pentegrasyon");

  const unreadCount = messagesData?.filter((m) => !m.isRead).length || 0;

  const handleLogout = () => {
    const userSessionId = getAuth().sessionId;
    setOpen(!open);
    dispatch(logout({ userSessionId }));
  };

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Çıkış Yapılıyor...");
    }
    if (success) {
      clearAuth();
      window.location.href = "/login";
      dispatch({ type: "LOGOUT" });
      dispatch(resetLogoutState());
      toast.dismiss(toastId.current);
    }
    if (error) {
      clearAuth();
      window.location.href = "/login";
      dispatch(resetLogoutState());
    }
  }, [success, loading, error]);

  const { registerClickOutside } = usePopup();

  useEffect(() => {
    if (headerSettingsRef) {
      registerClickOutside("headerSettings", {
        ref: headerSettingsRef,
        outRef: null,
        callback: () => setOpen(false),
      });
    }
  }, [headerSettingsRef, open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[99] bg-[--white-1]/85 backdrop-blur-md border-b border-[--border-1] transition-[padding] duration-300 ease-out",
          !isOrdersPage && (collapsed ? "lg:pl-[76px]" : "lg:pl-[240px]")
        )}
      >
        {/* Small left padding so the hamburger hugs the sidebar's border
            (or the screen edge when collapsed) instead of drifting with
            the page gutter. */}
        <nav className="w-full h-16 flex justify-between items-center gap-3 max-md:px-4 pl-3 pr-[4%]">
          <div className="flex items-center gap-3 min-w-0">
            {/* On orders the sidebar is collapsed at every width, so the
                toggle has to stay reachable on desktop too. */}
            <button
              type="button"
              aria-label="Menüyü aç/kapat"
              className={iconButton}
              onClick={() => {
                // Desktop non-orders pages have the sidebar pinned; there
                // the hamburger collapses/expands it. Everywhere else it
                // opens the drawer overlay, as before.
                const isDesktop = window.matchMedia(
                  "(min-width: 1024px)",
                ).matches;
                if (isDesktop && !isOrdersPage) setCollapsed(!collapsed);
                else setOpenSidebar(!openSidebar);
              }}
            >
              <MenuI />
            </button>

            <h1 className="text-lg font-semibold text-[--black-1] truncate">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Identity badge, top-right: initials chip + name over e-mail
                in a bordered pill. Name is display-cased (titleCaseTr) —
                the backend stores it as typed, which read awkwardly here.
                Hidden below md, where the sidebar drawer carries identity. */}
            {user?.fullName && (
              <Link
                to="/profile"
                title="Profili aç"
                className="max-md:hidden mr-1.5 flex items-center gap-2.5 rounded-full border border-solid border-[--border-1] bg-[--white-1] py-1 pl-1 pr-3.5 hover:border-[--primary-1]/50 hover:bg-[--light-3] transition-colors"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[--light-1] text-[0.65rem] font-semibold text-[--primary-1]">
                  {initialsOf(user.fullName) || "K"}
                </span>
                <span className="flex min-w-0 max-w-48 flex-col leading-tight">
                  <span className="truncate text-xs font-semibold text-[--black-1]">
                    {titleCaseTr(user.fullName)}
                  </span>
                  {user.email && (
                    <span className="truncate text-[0.7rem] text-[--gr-1]">
                      {user.email}
                    </span>
                  )}
                </span>
              </Link>
            )}

            <button
              type="button"
              aria-label="Temayı değiştir"
              onClick={() => setTheme(getTheme() == "light" ? "dark" : "light")}
              className={iconButton}
            >
              {getTheme() == "light" ? <SunI /> : <MoonI />}
            </button>

            <Link to="/messages" aria-label="Mesajlar" className="relative">
              <div className={iconButton}>
                <BellI />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.15rem] h-[1.15rem] px-1 text-[0.65rem] font-semibold bg-[--red-1] text-white rounded-full flex justify-center items-center ring-2 ring-[--white-1]">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>

            <div className="relative flex items-center" ref={headerSettingsRef}>
              <button
                type="button"
                aria-label="Ayarlar"
                className={cn(iconButton, open && "bg-[--light-3]")}
                onClick={() => setOpen(!open)}
              >
                <SettingsI strokeWidth={1.7} className="size-5" />
              </button>

              <div
                className={cn(
                  "absolute top-11 right-0 w-48 p-1.5 bg-[--white-1] border border-solid border-[--border-1] rounded-xl shadow-dropdown transition-all origin-top-right",
                  open
                    ? "visible opacity-100 scale-100"
                    : "invisible opacity-0 scale-95"
                )}
              >
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-sm text-[--black-2] rounded-lg hover:bg-[--light-3] cursor-pointer">
                    <UserI className="size-4 shrink-0" />
                    Profil
                  </div>
                </Link>
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[--red-1] rounded-lg hover:bg-[--status-red] cursor-pointer whitespace-nowrap"
                  onClick={handleLogout}
                >
                  <svg
                    className="size-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="w-full flex justify-center relative lg:pl-[280px]">
        <Advert />
      </div>
    </>
  );
}

export default Header;

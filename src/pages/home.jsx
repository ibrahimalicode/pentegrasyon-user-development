//MODULES
import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

//COMP
import { cn } from "../lib/utils";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import CourierStatusChange from "../components/couriers/components/courierStatusChange";
import CustomGeneralLoader from "../components/common/customGeneralLoader";
import ErrorBoundary from "../components/common/errorBoundary";

//PAGES — lazy so each section (notably the apexcharts-heavy dashboard) is its own chunk
const Orders = lazy(() => import("./orders"));
const Profile = lazy(() => import("./profile"));
const Messages = lazy(() => import("./messages"));
const Payments = lazy(() => import("./payments"));
const Couriers = lazy(() => import("./couriers"));
const Licenses = lazy(() => import("./licenses"));
const Dashboard = lazy(() => import("./dashboard"));
const Restaurants = lazy(() => import("./restaurants"));
const ProtectedPages = lazy(() => import("./protectedPages"));
const Stocks = lazy(() => import("./stocks"));
const Logs = lazy(() => import("./activityLogs"));
const Reports = lazy(() => import("./reports"));

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  // Desktop-only collapse for the pinned sidebar (the header hamburger
  // toggles it); persisted so the choice survives reloads.
  const [collapsed, setCollapsedState] = useState(
    () => localStorage.getItem("SIDEBAR_COLLAPSED") === "1",
  );
  const setCollapsed = (value) => {
    setCollapsedState(value);
    localStorage.setItem("SIDEBAR_COLLAPSED", value ? "1" : "0");
  };
  const { pathname } = useLocation();

  // Orders is the operational main screen and its table is wide, so the
  // sidebar collapses there and is opened on demand from the header.
  const isOrdersPage = pathname.startsWith("/orders");

  return (
    <section className="bg-[--white-1]">
      <CourierStatusChange />
      <Header
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        isOrdersPage={isOrdersPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        isOrdersPage={isOrdersPage}
        collapsed={collapsed}
      />
      {/* Single place that reserves room for the permanent lg+ sidebar —
          pages used to each repeat lg:ml-[280px], and orders never had it. */}
      <div className={cn(!isOrdersPage && !collapsed && "lg:pl-[280px]")}>
        {/* Contains any page render crash to the routed content (reload
            prompt) instead of white-screening the whole app; resets when
            the route changes. */}
        <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<CustomGeneralLoader />}>
          <Routes>
          <Route path="/*" element={<Navigate to="/orders" />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/restaurants/*" element={<Restaurants />} />
          <Route path="/licenses/*" element={<Licenses />} />
          <Route path="/stocks/*" element={<Stocks />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/couriers/*" element={<Couriers />} />
          <Route path="/locked-pages/*" element={<ProtectedPages />} />
          <Route path="/payments/*" element={<Payments />} />
          <Route path="/messages/*" element={<Messages />} />
            <Route path="/activity-logs/*" element={<Logs />} />
            <Route path="/reports/*" element={<Reports />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Home;

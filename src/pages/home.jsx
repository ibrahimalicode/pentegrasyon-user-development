//MODULES
import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

//COMP
import { cn } from "../lib/utils";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import CourierStatusChange from "../components/couriers/components/courierStatusChange";
import CustomGeneralLoader from "../components/common/customGeneralLoader";

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

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
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
      />
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        isOrdersPage={isOrdersPage}
      />
      {/* Single place that reserves room for the permanent lg+ sidebar —
          pages used to each repeat lg:ml-[280px], and orders never had it. */}
      <div className={cn(!isOrdersPage && "lg:pl-[280px]")}>
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
          </Routes>
        </Suspense>
      </div>
    </section>
  );
};

export default Home;

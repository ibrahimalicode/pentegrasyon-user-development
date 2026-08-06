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

  // The shell sits on the RECESSED plane (--gr-4). Data surfaces (tables,
  // cards, popovers) stay on --white-1 so they read as the brightest thing on
  // screen instead of the chrome around them.
  return (
    <section className="bg-[--gr-4]">
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
          pages used to each repeat lg:ml-[280px], and orders never had it.
          The fixed-header spacer is still owned by each page section (pt-16
          today, pt-12 once batches 3A–3H land); adding it here as well would
          double the offset on every route. */}
      <div className={cn(!isOrdersPage && "lg:pl-60")}>
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

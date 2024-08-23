import { Route, Routes } from "react-router-dom";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import DashboardPage from "./dashboard";
import NotFound from "./404";
import Users from "./users";
import Restourants from "./restourants";
import Licenses from "./licenses";
import Parameters from "./parameters";
import LicensePackages from "./licensePackages";
import Profile from "./profile";
import Test from "./test";
import Messages from "./messages";
import { useState } from "react";

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <section>
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/restaurants/*" element={<Restourants />} />
        <Route path="/licenses/*" element={<Licenses />} />
        <Route path="/license-packages/*" element={<LicensePackages />} />
        <Route path="/parameters/*" element={<Parameters />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/messages/*" element={<Messages />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Home;

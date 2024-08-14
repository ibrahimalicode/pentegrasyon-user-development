import { Route, Routes } from "react-router-dom";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import DashboardPage from "./DashboardPage";
import NotFound from "./404";
import Users from "./users";
import Restourants from "./restourants";
import Licenses from "./licenses";
import Parameters from "./parameters";
import LicensePackages from "./licensePackages";
import Profile from "./profile";

const Home = () => {
  return (
    <section>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/restaurants/*" element={<Restourants />} />
        <Route path="/licenses/*" element={<Licenses />} />
        <Route path="/license-packages/*" element={<LicensePackages />} />
        <Route path="/parameters/*" element={<Parameters />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Home;

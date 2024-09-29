import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "./dashboard";
import NotFound from "./404";
import Restourants from "./restourants";
import Licenses from "./licenses";
import Profile from "./profile";
import Test from "./test";
import { useState } from "react";
import Orders from "./orders";

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <section>
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Routes>
        <Route path="/*" element={<Navigate to="/orders" />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/restaurants/*" element={<Restourants />} />
        <Route path="/licenses/*" element={<Licenses />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/orders/*" element={<Orders />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Home;

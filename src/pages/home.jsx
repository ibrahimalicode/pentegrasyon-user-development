import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "./dashboard";
import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import Users from "./users";
import Restourants from "./restourants";
import Licenses from "./licenses";
import Packages from "./packages";
import Popup from "../components/common/popup";

const Home = () => {
  return (
    <section>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/restourants" element={<Restourants />} />
        <Route path="/licenses" element={<Licenses />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Home;

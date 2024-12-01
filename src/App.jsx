//MODULES
import { Route, Routes } from "react-router-dom";

//COMP
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Verify from "./pages/verify";
import Register from "./pages/register";
import Popup from "./components/common/popup";
import PaymentFailed from "./pages/paymentFailed";
import PrivacyPolicy from "./pages/privacyPolicy";
import ProtectedRoute from "./components/protect";
import SetNewPassword from "./pages/setNewPassword";
import ForgotPassword from "./pages/forgotPassword";
import PaymentSuccess from "./pages/paymentSuccess";

//CONTEXT
import { SlideBarProvider } from "./context/SlideBarContext";
import SlideBar from "./components/common/slideBar";

function App() {
  return (
    <>
      <SlideBarProvider>
        <SlideBar />
        <Popup />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SlideBarProvider>
    </>
  );
}

export default App;

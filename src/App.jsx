import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protect";
import Home from "./pages/home";
import NotFound from "./pages/404";
import AdminLogin from "./pages/adminLogin";
import SetNewPassword from "./pages/userPassword/setNewPass";
import ForgotPassword from "./pages/userPassword/forgotPassword";
import { PopupProvider } from "./context/PopupContext";
import Popup from "./components/common/popup";
import PrivacyPolicy from "./pages/privacyPolicy";
import PaymentSuccess from "./pages/paymentSuccess";
import PaymentFailed from "./pages/paymentFailed";
import UserLogin from "./pages/userLogin";
import Register from "./pages/register";
import Verify from "./pages/verify";

function App() {
  return (
    <>
      <PopupProvider>
        <Popup />
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/9007/admin" element={<AdminLogin />} />
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
      </PopupProvider>
    </>
  );
}

export default App;

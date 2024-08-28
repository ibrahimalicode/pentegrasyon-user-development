import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protect";
import Home from "./pages/home";
import NotFound from "./pages/404";
import LoginRegister from "./pages/register/loginRegister";
import AdminLogin from "./pages/login/adminLogin";
import SetNewPassword from "./pages/userPassword/setNewPass";
import ForgotPassword from "./pages/userPassword/forgotPassword";
import UserVerifyLogin from "./pages/userVerify/loginVerify";
import { PopupProvider } from "./context/PopupContext";
import Popup from "./components/common/popup";
import PrivacyPolicy from "./pages/privacyPolicy";
import PaymentSuccess from "./pages/paymentSuccess";

function App() {
  return (
    <>
      <PopupProvider>
        <Popup />
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/9007/admin" element={<AdminLogin />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/userVerifyLogin" element={<UserVerifyLogin />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
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

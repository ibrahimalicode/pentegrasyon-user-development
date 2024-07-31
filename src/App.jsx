import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protect";
import Home from "./pages/home";
import toastOptions from "./config/toast";
import NotFound from "./pages/404";
import LoginRegister from "./pages/register/loginRegister";
import AdminLogin from "./pages/login/adminLogin";
import SetNewPassword from "./pages/userPassword/setNewPass";
import ForgotPassword from "./pages/userPassword/forgotPassword";
import UserVerifyLogin from "./pages/userVerify/loginVerify";
import { PopupProvider } from "./context/PopupContext";

function App() {
  return (
    <>
      <PopupProvider>
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/9007/admin" element={<AdminLogin />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="//userVerifyLogin" element={<UserVerifyLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-right" toastOptions={toastOptions} />
      </PopupProvider>
    </>
  );
}

export default App;

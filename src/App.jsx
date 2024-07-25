import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protect";
import Home from "./pages/home";
import toastOptions from "./config/toast";
import NotFound from "./pages/404";
import LoginRegister from "./pages/loginRegister";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" toastOptions={toastOptions} />
    </>
  );
}

export default App;

import { useState } from "react";
import UserRegister from "./userRegister";
import UserLogin from "../login/userLogin";
import img from "../../assets/img/pentegrasyon.png";

const LoginRegister = () => {
  const [pageName, setPageName] = useState("login");
  return (
    <section className="p-0 sm:overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[100vh] bg-white">
        <div
          className={`flex gap-5 w-full h-full relative ${
            pageName === "register" && "right-panel-active"
          }`}
        >
          {/* Sign Up Form */}
          <div className="flex items-center justify-center w-full lg:w-6/12 form-container sign-in-container max-lg:w-full">
            <UserLogin setPageName={setPageName} pageName={pageName} />
          </div>

          {/* Sign in Form */}
          <div className="flex items-center justify-center w-full lg:w-6/12 form-container sign-up-container max-lg:w-full overflow-y-scroll">
            <UserRegister setPageName={setPageName} pageName={pageName} />
          </div>

          {/* Card Slider */}
          <div className="lg:flex flex-col w-6/12 max-md:ml-0 max-md:w-full hidden md:overflow-hidden overlay-container bg-slate-200">
            <AuthImg />
          </div>
        </div>
      </div>
    </section>
  );
};

const AuthImg = () => {
  return (
    <img
      loading="lazy"
      src={img}
      alt="Login page illustration"
      className="w-full h-full object-contain"
    />
  );
};

export default LoginRegister;

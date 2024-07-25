import { useState } from "react";
import RegisterPage from "./register";
import LoginPage from "./login";

const img =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/709fcaeeb1a625963f5b761d2210429cb4b88bdbc0c89a30484322c82a24873d?apiKey=1f4fb250339844f88428d2cbf4e019e9&";

const LoginRegister = () => {
  const [formName, setFormName] = useState(null);
  return (
    <section className="p-0 sm:overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[100dvh] bg-white">
        <div
          className={`flex gap-5 w-full h-full relative ${
            formName && "right-panel-active"
          }`}
        >
          {/* Sign Up Form */}
          <div className="flex items-center justify-center w-full lg:w-6/12 form-container sign-in-container max-md:w-full">
            <LoginPage setFormName={setFormName} />
          </div>

          {/* Sign in Form */}
          <div className="flex items-center justify-center w-full lg:w-6/12 form-container sign-up-container max-md:w-full">
            <RegisterPage setFormName={setFormName} />{" "}
          </div>

          {/* Card Slider */}
          <div className="lg:flex flex-col w-6/12 max-md:ml-0 max-md:w-full hidden md:overflow-hidden overlay-container">
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
      className="grow self-stretch w-full bg-cover"
    />
  );
};

export default LoginRegister;

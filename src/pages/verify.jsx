import { useState } from "react";
import imgUrl from "../assets/img/pentegrasyon.png";
import SendCode from "../components/common/sendCode";
import VerifyCode from "../components/common/verifyCode";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [toVerify, setToVerify] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <section
      className="px-[4%] pt-36 bg-no-repeat"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg mx-auto p-6 pt-10 text-[--white-1] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[--gr-1]">
        {!toVerify ? (
          /* Take Phone Number */
          <SendCode
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setToVerify={setToVerify}
          />
        ) : (
          /* Code Verify Page */
          <VerifyCode
            setToConfirm={setToVerify}
            phoneNumber={phoneNumber}
            onSuccess={() => navigate("/login")}
          />
        )}
      </div>
    </section>
  );
};

export default Verify;

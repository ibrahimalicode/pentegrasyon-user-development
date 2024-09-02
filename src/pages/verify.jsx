import { useState } from "react";
import imgUrl from "../assets/img/hero-bg.jpg";
import SendCode from "../components/common/sendCode";
import VerifyCode from "../components/common/verifyCode";

const Verify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toVerify, setToVerify] = useState("");

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
          <VerifyCode setToConfirm={setToVerify} phoneNumber={phoneNumber} />
        )}
      </div>
    </section>
  );
};

export default Verify;

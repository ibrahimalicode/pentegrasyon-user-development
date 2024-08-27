// import Lottie from "lottie-react";
// import checkAnim from "../../../assets/anim/lottie/check_anim.json";
// import congraAnim from "../../../assets/anim/lottie/congra_anim.json";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExtendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";
import toast from "react-hot-toast";

const ThirdStep = ({ step }) => {
  const dispatch = useDispatch();
  const [playAnimation, setPlayAnimation] = useState(false);
  const { data } = useSelector((state) => state.licenses.extendByPay);
  const [htmlResponse, setHtmlResponse] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (data) {
      setHtmlResponse(data);
      dispatch(resetExtendByOnlinePay());
    }
  }, [data, dispatch]);

  useEffect(() => {
    const handleMessage = (event) => {
      // Validate the origin of the message
      if (event.origin !== "https://www.paytr.com") {
        return;
      }

      // Process the status sent from the iframe
      if (event.data.status === "success") {
        toast.success("Payment successful!");
        setPlayAnimation(true);
      } else if (event.data.status === "failure") {
        toast.error("Payment failed.");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative">
      {htmlResponse && (
        <iframe
          ref={iframeRef}
          title="3D Secure Frame"
          width="100%"
          height="100%"
          srcDoc={htmlResponse}
          sandbox="allow-scripts allow-forms"
        />
      )}
      {playAnimation && (
        <div className="success-animation">
          {/* Your custom success animation */}
        </div>
      )}
    </div>
  );
};

export default ThirdStep;

{
  /* <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative">
  <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
    {playAnimation && <Lottie animationData={congraAnim} loop={false} />}
  </div>
  <div className="w-60">
    <Lottie animationData={checkAnim} loop={false} />
  </div>
</div>; */
}

// useEffect(() => {
//   let timer;
//   if (step === 3) {
//     timer = setTimeout(() => {
//       setPlayAnimation(true);
//     }, 2000);
//   }
//   return () => {
//     if (timer) {
//       clearTimeout(timer);
//       setPlayAnimation(false);
//     }
//   };
// }, [step]);

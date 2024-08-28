import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExtendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";
import toast from "react-hot-toast";

const ThirdStep = ({ step }) => {
  const dispatch = useDispatch();
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
        // Perform any additional actions such as updating the UI or navigating
      } else if (event.data.status === "failure") {
        toast.error("Payment failed.");
        // Handle the failure case, perhaps offer retry options
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
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      )}
    </div>
  );
};

export default ThirdStep;

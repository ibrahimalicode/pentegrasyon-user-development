import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExtendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const ThirdStep = ({ step }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const { data } = useSelector((state) => state.licenses.extendByPay);

  const [htmlResponse, setHtmlResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setHtmlResponse(data);
      dispatch(resetExtendByOnlinePay());
    }

    const handleMessage = (event) => {
      // Verify the origin here if necessary
      if (event.data.status === "success") {
        console.log(event.data);
        toast.success("Ödeme başarılı 😃", { id: "payment_success" });
        setIsSuccess(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [data, dispatch]);

  return (
    <div className="w-full h-full bg-[--white-1] flex flex-col justify-center items-center relative">
      {htmlResponse && (
        <iframe
          title="3D Secure Frame"
          width="100%"
          height="100%"
          srcDoc={htmlResponse}
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      )}
      {isSuccess && (
        <div className="w-full flex justify-center pb-8">
          <Link
            to={currentPath.replace("/extend-license", "")}
            className="flex items-center py-2.5 whitespace-nowrap px-4 rounded-md text-sm border-[1.5px] disabled:cursor-not-allowed justify-center text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none"
          >
            Lisanslara git
          </Link>
        </div>
      )}
    </div>
  );
};

export default ThirdStep;

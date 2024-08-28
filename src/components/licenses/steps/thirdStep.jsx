import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExtendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const ThirdStep = ({ step }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.licenses.extendByPay);

  const [htmlResponse, setHtmlResponse] = useState(null);

  useEffect(() => {
    if (data) {
      setHtmlResponse(data);
      dispatch(resetExtendByOnlinePay());
    }
  }, [data, dispatch]);

  return (
    <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative">
      {htmlResponse && (
        <iframe
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

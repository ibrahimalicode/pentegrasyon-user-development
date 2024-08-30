import { useLocation } from "react-router-dom";
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";

const CreditPayment = ({ setStep }) => {
  const location = useLocation();
  const { currentLicense } = location?.state || {};

  return (
    <div>
      <div></div>
      {/* BTNS */}
      <div className="flex gap-3 absolute -bottom-16 -right-0">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(1)}
          disabled={false} //loading}
        />
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          disabled={false} //loading}
        />
      </div>
    </div>
  );
};

export default CreditPayment;

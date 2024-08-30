import { useLocation } from "react-router-dom";
import CustomFileInput from "../../common/customFileInput";
import CustomInput from "../../common/customInput";
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";
import { useState } from "react";

const BankPayment = ({ setStep, licenseData }) => {
  const location = useLocation();
  const { currentLicense } = location?.state;
  const licensePackageData = licenseData;

  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");

  return (
    <form className="px-4 pt-4">
      <p>
        <span className="text-[--primary-1]">
          {" "}
          {currentLicense.restaurantName}{" "}
        </span>
        <span>Restoran'a</span>
      </p>
      <p className="py-3">
        <span className="text-[--primary-1]">{licensePackageData.value}</span>
        <span className="text-[--primary-1]"> {licensePackageData.time} </span>
        <span>yıllık Lisans eklenecek.</span>
      </p>
      <div>
        <CustomInput
          label="Açıklama"
          placeholder="Açıklama"
          className="text-sm mb-4"
          className2="mt-[0] sm:mt-[0]"
          value={explanation}
          onChange={(e) => setExplanation(e)}
        />
      </div>
      <div className="">
        <CustomFileInput
          className="h-[8rem] p-4"
          value={document}
          onChange={setDocument}
          accept={"image/png, image/jpeg, application/pdf"}
          required
        />
      </div>

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
    </form>
  );
};

export default BankPayment;

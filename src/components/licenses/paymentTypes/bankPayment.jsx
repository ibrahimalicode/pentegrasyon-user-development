import { useLocation } from "react-router-dom";
import CustomFileInput from "../../common/customFileInput";
import CustomInput from "../../common/customInput";

const BankPayment = ({
  licensePackageData,
  document,
  setDocument,
  explanation,
  setExplanation,
}) => {
  const location = useLocation();
  const { currentLicense } = location?.state;

  return (
    <div className="px-4 pt-4">
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
    </div>
  );
};

export default BankPayment;

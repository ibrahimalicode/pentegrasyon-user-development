import CustomFileInput from "../../../common/customFileInput";
import CustomInput from "../../../common/customInput";

const BankPayment = ({
  licenseData,
  document,
  setDocument,
  explanation,
  setExplanation,
}) => {
  return (
    <div className="px-4 pt-4">
      <p>
        <span className="text-[--primary-1]"> [RESTORAN ADI] </span>
        <span>Restoran'a</span>
      </p>
      <p className="py-3">
        <span className="text-[--primary-1]">{licenseData.value}</span>
        <span className="text-[--primary-1]"> {licenseData.time} </span>
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
          className="h-[8rem] py-4"
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

import { useEffect, useState } from "react";

// COMPONENTS
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";

const ExtendLicenseSteps = ({
  data,
  licenseData,
  licensePackagesData,
  setLicenseData,
  setPaymentMethod,
  paymentMethod,
  step,
  document,
  setDocument,
  explanation,
  setExplanation,
}) => {
  return (
    <div className="w-full h-full bg-slate-50">
      {step === 1 ? (
        <FirstStep
          data={data}
          licenseData={licenseData}
          setLicenseData={setLicenseData}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          licensePackagesData={licensePackagesData}
        />
      ) : step === 2 ? (
        <SecondStep
          paymentMethod={paymentMethod}
          licenseData={licenseData}
          explanation={explanation}
          setExplanation={setExplanation}
          document={document}
          setDocument={setDocument}
        />
      ) : (
        step === 3 && <ThirdStep step={step} />
      )}
    </div>
  );
};

export default ExtendLicenseSteps;

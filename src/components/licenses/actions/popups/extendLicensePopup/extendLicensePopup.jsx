import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../../../../context/PopupContext";
import toast from "react-hot-toast";
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
} from "../../../../../redux/licenses/updateLicenseDateSlice";
import { formatLisansPackages, getDateRange } from "../../../../../utils/utils";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../../../redux/licensePackages/getLicensePackagesSlice";
import { ArrowIL, ArrowIR, CancelI } from "../../../../../assets/icon";
import StepBar from "../../../../common/stepBar";
import StepFrame from "../../../../common/stepFrame";
import ExtendLicenseSteps from "../../paymentTypes/steps/steps";
import Button from "../../../../common/button";

const ExtendLicensePopup = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.updateLicenseDate
  );
  const {
    success: licensePackagesSuccess,
    error: licensePackagesError,
    licensePackages,
  } = useSelector((state) => state.licensePackages.getLicensePackages);
  const { setShowPopup, setPopupContent } = usePopup();

  const steps = 3;
  const [step, setStep] = useState(1);
  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const [licensePackagesData, setLicensePackagesData] = useState([]);
  const [licenseData, setLicenseData] = useState({
    value: null,
    label: "Lisans Paketi Seç",
    id: null,
    time: null,
  });
  const [paymentMethod, setPaymentMethod] = useState({
    selectedOption: { label: "Ödeme Yöntemi Seç", value: null },
    options: [
      { label: "Banka Havale", value: "bankPayment" },
      { label: "Online Ödeme", value: "onlinePayment" },
      { label: "Borç Yazdırma", value: "creditPayment" },
    ],
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      licenseData.id === null ||
      licenseData.id === undefined ||
      !paymentMethod.selectedOption.value
    ) {
      toast.error("Lütfen seçimleri tamamlayınız 😟");
      return;
    }
    if (step !== 2) {
      handleStep();
      return;
    }
    if (!document) {
      toast.error("Lütfen seçimleri tamamlayınız 😟");
      return;
    }

    // MAKE THE PAMENT OR CHECK THE DOCUMENT
    dispatch(
      updateLicenseDate({
        licenseId: data.id,
        startDateTime: getDateRange(licenseData.time).startDateTime,
        endDateTime: getDateRange(licenseData.time).endDateTime,
      })
    );
  }
  function handleStep() {
    setStep(step === 1 ? 2 : step === 2 ? 3 : 1);
  }
  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateLicenseDate());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      handleStep();
      setTimeout(() => closeForm(), 4000);
      toast.success("Lisans barıyla uzatıldı 🥳🥳");
      dispatch(resetUpdateLicenseDate());
    }
  }, [loading, success, error]);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackages) {
      dispatch(getLicensePackages());
    }
    return () => {
      if (licensePackages) {
        dispatch(resetGetLicensePackages());
      }
    };
  }, [licensePackages]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (licensePackagesError) {
      if (licensePackagesError?.message_TR) {
        toast.error(licensePackagesError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (licensePackagesSuccess) {
      const currentMarketplace = licensePackages.data.filter(
        (pack) => pack.marketplaceId === data.marketplaceId
      );
      setLicensePackagesData(formatLisansPackages(currentMarketplace));
    }
  }, [licensePackagesSuccess, licensePackagesError, licensePackages]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <form
        className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="absolute top-4 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-xl font-bold">Lisans paketi uzat</h1>
        <StepBar step={step} steps={steps} />

        <main className="w-full max-w-lg self-center">
          <div
            className="w-full h-80 border-2 border-dashed border-[--light-3] rounded-sm relative"
            style={{
              clipPath: "inset(-200px 0px)",
            }}
          >
            <StepFrame
              step={step}
              steps={steps}
              component={
                <ExtendLicenseSteps
                  data={data}
                  licenseData={licenseData}
                  licensePackagesData={licensePackagesData}
                  setLicenseData={setLicenseData}
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                  step={step}
                  document={document}
                  setDocument={setDocument}
                  explanation={explanation}
                  setExplanation={setExplanation}
                />
              }
            />
          </div>
        </main>

        <div className="w-full flex justify-end gap-2 pr-8 mt-8">
          <Button
            icon="Geri"
            type="button"
            // disabled={step !== 2}
            className={`flex justify-center w-24 py-[.6rem] text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none ${
              step === 1 && "hidden"
            }`}
            onClick={() => setStep(step - 1)}
            text={
              <div
                className={`-translate-x-1 transition-transform duration-200 ease-in-out group-hover:-translate-x-2`}
              >
                <ArrowIL className="size-[16px]" />
              </div>
            }
          />
          <Button
            text={step === 2 ? "Tamamla" : "Devam"}
            type="submit"
            className="flex justify-center w-24 py-[.6rem] text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none"
            onClick={handleSubmit}
            icon={
              step === 2 ? null : (
                <div className="translate-x-1 transition-transform duration-200 ease-in-out group-hover:translate-x-2">
                  <ArrowIR className="size-[16px]" />
                </div>
              )
            }
          />
        </div>
      </form>
    </div>
  );
};

export default ExtendLicensePopup;

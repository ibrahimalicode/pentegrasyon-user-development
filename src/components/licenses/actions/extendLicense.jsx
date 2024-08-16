import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import {
  ArrowID,
  ArrowIL,
  ArrowIR,
  CancelI,
  DownArrowI,
  ExtendI,
} from "../../../assets/icon";
import ActionButton from "../../common/actionButton";
import Button from "../../common/button";
import checkAnim from "../../../assets/anim/lottie/check_anim.json";
import congraAnim from "../../../assets/anim/lottie/congra_anim.json";

// IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../../common/customSelector";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { formatLisansPackages, getDateRange } from "../../../utils/utils";
import {
  resetUpdateLicenseDate,
  updateLicenseDate,
  updateLicenseDay,
} from "../../../redux/licenses/updateLicenseDateSlice";
import toast from "react-hot-toast";
import StepBar from "../../common/stepBar";
import CustomFileInput from "../../common/customFileInput";
import CustomInput from "../../common/customInput";
import StepFrame from "../../common/stepFrame";
import Lottie from "lottie-react";

const imageSRCs = [
  Getiryemek,
  MigrosYemek,
  TrendyolYemek,
  Yemeksepeti,
  GoFody,
  Siparisim,
];

const ExtendLicense = ({ licenseData, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <ExtendLicensePopup data={licenseData} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      element={<ExtendI className="w-[1.1rem]" />}
      element2="Extend"
      onClick={handlePopup}
    />
  );
};

export default ExtendLicense;

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
    if (!licenseData.id || !paymentMethod.selectedOption.value) {
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
                <PopupStepContent
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

function PopupStepContent({
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
}) {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 3) {
      timer = setTimeout(() => {
        setPlayAnimation(true);
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        setPlayAnimation(false);
      }
    };
  }, [step]);

  return (
    <div className="w-full h-full bg-slate-50">
      {step === 1 ? (
        <div className="size-full flex flex-col">
          <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
            <img
              src={imageSRCs[data.marketplaceId]}
              alt="MarketPlacePhoto"
              className="w-32 rounded-sm"
            />

            <p className="">{data.licensePackageTime} Yıllık</p>
            <p className="">{data.licensePackageTotalPrice}</p>
          </div>

          <div className="w-full py-4 text-[--gr-1] flex justify-center">
            <p className="sr-only">Alınacak lisans</p>
            <span>
              <DownArrowI />{" "}
            </span>
          </div>

          <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
            <img
              src={imageSRCs[data.marketplaceId]}
              alt="MarketPlacePhoto"
              className="w-32 rounded-sm"
            />

            <p className="">
              {licenseData.time ? licenseData.time : "0"} Yıllık
            </p>
            <p className="">
              {licenseData.price ? licenseData.price : "00.00"}
            </p>
          </div>

          <div className="px-4 flex justify-between items-center pt-2 gap-4">
            <CustomSelect
              required={true}
              className="text-sm"
              className2="mt-[0] sm:mt-[0] min-w-52"
              value={licenseData}
              options={licensePackagesData}
              onChange={(selectedOption) => {
                setLicenseData(selectedOption);
              }}
            />
            <CustomSelect
              required={true}
              className="text-sm"
              className2="mt-[0] sm:mt-[0]"
              value={paymentMethod.selectedOption}
              options={paymentMethod.options}
              onChange={(selectedOption) => {
                setPaymentMethod((prev) => {
                  return {
                    ...prev,
                    selectedOption,
                  };
                });
              }}
            />
          </div>
        </div>
      ) : step === 2 ? (
        <div>
          {paymentMethod.selectedOption.value === "bankPayment" ? (
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
          ) : paymentMethod.selectedOption.value === "onlinePayment" ? (
            <div>onlinePayment</div>
          ) : (
            <div>creditPayment</div>
          )}
        </div>
      ) : (
        step === 3 && (
          <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative">
            <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
              {playAnimation && (
                <Lottie animationData={congraAnim} loop={false} />
              )}
            </div>
            <div className="w-60">
              <Lottie animationData={checkAnim} loop={false} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

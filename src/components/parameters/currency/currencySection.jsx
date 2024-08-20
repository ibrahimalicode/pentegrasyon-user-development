import { useEffect, useRef, useState } from "react";
import CustomInput from "../../common/customInput";
import CustomToggle from "../../common/customToggle";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getExchangeParameter,
  resetgetExchangeParameter,
} from "../../../redux/generalVars/currency/getExchangeParametersSlice";
import { isEqual } from "lodash";
import {
  resetUpdateExchangeParametersState,
  updateExchangeParameters,
} from "../../../redux/generalVars/currency/updateExchangeParametersSlice";

const CurrencySection = () => {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { loading, success, error } = useSelector(
    (state) => state.generalVars.updateExchangeParams
  );

  const {
    success: getCurrencySuccess,
    error: getCurrencyError,
    exchangeParameter: currency,
  } = useSelector((state) => state.generalVars.getExchangeParameters);

  const [exchangeDataBefore, setExchangeDataBefore] = useState(null);
  const [exchangeData, setExchangeData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(exchangeData, exchangeDataBefore)) {
      toast.error("Hiç bir deişiklik yapmadınız!");
      return;
    }
    dispatch(updateExchangeParameters({ exchangeData }));
  }

  useEffect(() => {
    dispatch(getExchangeParameter());

    return () => {
      dispatch(resetgetExchangeParameter());
    };
  }, []);

  // TOAST FOR GET
  useEffect(() => {
    if (getCurrencySuccess) {
      const { useRate, usdRate, staticExchangeRate } = currency;

      setExchangeDataBefore({
        useRate,
        usdRate,
        staticExchangeRate,
      });

      setExchangeData({
        useRate,
        usdRate,
        staticExchangeRate,
      });
    }
    if (getCurrencyError) {
      toast.error(
        getCurrencyError.message_TR
          ? getCurrencyError.message_TR
          : "Kur Parametreleri alınamadı"
      );
    }
  }, [getCurrencySuccess, getCurrencyError]);

  // TOAST FOR EDIT
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong 🙁");
      }
      dispatch(resetUpdateExchangeParametersState());
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("Kur Parametreleri başarıyla güncelendi.");
      dispatch(resetUpdateExchangeParametersState());
    }
  }, [success, loading, error]);

  return (
    <section className="flex flex-col items-start pt-3.5 pr-20 pb-96 pl-6 mt-10 w-full bg-white max-w-[1050px] min-h-0 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full max-w-2xl">
          <div className="flex max-sm:flex-col gap-4">
            <CustomInput
              type="number"
              label="Güncel USD Kur"
              className="py-3 rounded-[1rem]"
              value={exchangeData ? exchangeData.usdRate : ""}
              onChange={(e) =>
                setExchangeData((prev) => {
                  return {
                    ...prev,
                    usdRate: e,
                  };
                })
              }
              readOnly
            />
            <CustomInput
              type="number"
              label="Sabit USD Kur"
              className="py-3 rounded-[1rem]"
              value={exchangeData ? exchangeData.staticExchangeRate : ""}
              onChange={(e) =>
                setExchangeData((prev) => {
                  return {
                    ...prev,
                    staticExchangeRate: e,
                  };
                })
              }
            />
          </div>

          <div className="w-full mt-8">
            <CustomToggle
              label={
                exchangeData?.useRate ? "Güncel kur kullan" : "Sabit kur kullan"
              }
              className2={`text-[1rem] ${
                !exchangeData?.useRate && "text-[--green-1]"
              }`}
              checked={exchangeData ? exchangeData.useRate : false}
              onChange={(e) =>
                setExchangeData((prev) => {
                  return {
                    ...prev,
                    useRate: !exchangeData?.useRate,
                  };
                })
              }
            />
            <div className="max-sm:w-full max-sm:mt-4 flex justify-end items-end">
              <button
                className="py-1.5 text-lg text-center text-[--white-1] bg-[--primary-1] rounded-xl min-h-[50px] w-[84px]"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CurrencySection;

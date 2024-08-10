import { useEffect, useState } from "react";
import CustomInput from "../common/CustomInput";
import CustomToggle from "../common/customToggle";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrency,
  resetGetCurrency,
} from "../../redux/data/getCurrencySlice";
import toast from "react-hot-toast";

function CurrencySection() {
  const dispatch = useDispatch();
  const { loading, success, error, currency } = useSelector(
    (state) => state.data.getCurrency
  );
  const [checked, setChecked] = useState(true);
  const [statticUSD, setStatticUSD] = useState("");
  const [dinamicUSD, setDinamicUSD] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Save");
  }

  useEffect(() => {
    dispatch(getCurrency({}));

    return () => {
      dispatch(resetGetCurrency());
      console.log("Currency Out");
    };
  }, []);

  useEffect(() => {
    if (success) {
      setDinamicUSD(currency.forexSelling);
    }
    if (error) {
      toast.error(
        error.message_TR ? error.message_TR : "Güncel USD kuru alınamadı"
      );
    }
  }, [success, error]);

  return (
    <section className="flex flex-col items-start pt-3.5 pr-20 pb-96 pl-6 mt-10 w-full bg-white max-w-[1050px] min-h-0 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomInput
            type="number"
            label="Güncel USD Kur"
            className="py-3 rounded-[1rem]"
            value={dinamicUSD}
            onChange={(e) => setDinamicUSD(e.target.value)}
            readOnly
          />
          <CustomInput
            type="number"
            label="Sabit USD Kur"
            className="py-3 rounded-[1rem]"
            value={statticUSD}
            onChange={(e) => setStatticUSD(e.target.value)}
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
      </form>
      <div className="sm:mt-6">
        <CustomToggle
          label={checked ? "Güncel kur kullan" : "Sabit kur kullan"}
          checked={checked}
          onChange={() => setChecked(!checked)}
          className2={`text-[1rem] ${!checked && "text-[--green-1]"}`}
        />
      </div>
    </section>
  );
}

export default CurrencySection;

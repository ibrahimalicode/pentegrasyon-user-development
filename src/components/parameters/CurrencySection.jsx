import { useEffect, useState } from "react";
import CustomInput from "../common/CustomInput";
import CustomToggle from "../common/customToggle";

function CurrencySection() {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    console.log(checked);
  }, [checked]);
  return (
    <section className="flex flex-col items-start pt-3.5 pr-20 pb-96 pl-6 mt-10 w-full bg-white max-w-[1050px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 items-center">
        <CustomInput
          label="Güncel USD Kur"
          value="33,72"
          className="py-4 rounded-[.7rem]"
        />
        <CustomInput
          label="Sabit USD Kur"
          value="28.00"
          className="py-4 rounded-[.7rem]"
        />
        <div className="max-sm:w-full flex justify-end">
          <button className="py-2 text-lg text-center text-[--white-1] bg-[--primary-1] rounded-xl min-h-[50px] w-[84px]">
            Kaydet
          </button>
        </div>
      </div>
      <div className="sm:mt-6">
        <CustomToggle
          label="Güncel kur kullan"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
      </div>
    </section>
  );
}

export default CurrencySection;

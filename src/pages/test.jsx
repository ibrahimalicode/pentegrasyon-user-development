import { useState } from "react";
import CustomRadiobox from "../components/common/customRadiobox";

const Test = () => {
  const [checked, setChecked] = useState(false);
  return (
    <section className="px-[4%] pt-28 flex justify-center items-start">
      <CustomRadiobox checked={checked} onClick={() => setChecked(!checked)} />
    </section>
  );
};

export default Test;

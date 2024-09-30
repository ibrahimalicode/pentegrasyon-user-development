//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../data/minutes";
import CustomSelect from "../../common/customSelector";

const DeliveryTime = () => {
  const dispatch = useDispatch();

  const { automationVariables } = useSelector(
    (state) => state.orders.getAutomationVars
  );

  const [varData, setVarData] = useState(null);

  useEffect(() => {
    if (automationVariables) {
      setVarData(automationVariables);
    }
  }, [automationVariables]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Teslim Et</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={{ label: "Zaman Seç" }}
        options={minutes}
      />
    </div>
  );
};

export default DeliveryTime;

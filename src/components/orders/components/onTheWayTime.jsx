//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../enums/minutes";
import CustomSelect from "../../common/customSelector";

//REDUX
import {
  updateTicketAutomationVariable,
  resetUpdateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";

const OnTheWayTime = ({ automationDatas, setAutomationDatas }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  function formatMins() {
    return minutes
      .filter((min) => min.value > 2)
      .map((min) => {
        return {
          ...min,
          onTheWayTime: min.value,
          label: min.label + " dk sonra",
        };
      });
  }

  function updateAutomaticApproval(selectedOption) {
    if (selectedOption.value >= automationDatas.deliveryTimeData) {
      toast.error(
        "Teslim Et Süresi Yola Çıkart Süresinden az veya eşit olamaz",
        { id: "delivery/ontheway-time" }
      );
      return;
    }
    dispatch(updateTicketAutomationVariable(selectedOption)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        if (selectedOption?.onTheWayTime) {
          toast.dismiss(toastId.current);
          setAutomationDatas({
            ...automationDatas,
            deliveryTimeData: selectedOption.value,
          });
          toast.success("İşlem Başarılı", { id: "delivery/ontheway-time" });
          dispatch(resetUpdateTicketAutomationVariable());
        }
      }
    });
  }

  function handleSetData(inData) {
    const formattedData = {
      value: inData,
      onTheWayTime: inData,
      label: inData + " dk sonra",
    };
    return formattedData;
  }

  //UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...", {
        id: "delivery/ontheway-time-loading",
      });
    }
    if (error) {
      toast.dismiss(toastId.current);
      dispatch(resetUpdateTicketAutomationVariable());
    }
  }, [loading, error]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Yola Çıkar</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={handleSetData(automationDatas?.onTheWayTime)}
        options={formatMins()}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default OnTheWayTime;

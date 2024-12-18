//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../enums/minutes";
import CustomSelect from "../../common/customSelector";

//REDUX
import {
  updateTicketAutomationVariable,
  resetUpdateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";

const DeliveryTime = ({ automationDatas, setAutomationDatas }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  const [optionsData, setOptionsData] = useState([]);

  //UPDATE FUNCION
  function updateAutomaticApproval(selectedOption) {
    dispatch(updateTicketAutomationVariable(selectedOption)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        if (selectedOption?.deliveryTime) {
          setAutomationDatas({
            ...automationDatas,
            deliveryTime: selectedOption.deliveryTime,
          });
          toast.dismiss(toastId.current);
          toast.success("İşlem Başarılı", { id: "delivery/ontheway-time" });
          dispatch(resetUpdateTicketAutomationVariable());
        }
      }
    });
  }

  //SET FUNCTION
  function handleSetData(inData) {
    const formattedData = {
      value: inData,
      deliveryTime: inData,
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

  //SET THE OPTIONS WHEN ON THE WAY DATA CHANGES
  useEffect(() => {
    if (automationDatas?.onTheWayTime) {
      const formattedMins = minutes
        .filter(
          (min) => min.value > automationDatas.onTheWayTime && min.value > 9
        )
        .map((min) => ({
          ...min,
          deliveryTime: min.value,
          label: min.label + " dk sonra",
        }));
      setOptionsData(formattedMins);
    }
  }, [automationDatas?.onTheWayTime]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Teslim Et</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={handleSetData(automationDatas?.deliveryTime)}
        options={optionsData}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default DeliveryTime;

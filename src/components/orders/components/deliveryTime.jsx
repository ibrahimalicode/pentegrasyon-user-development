//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../enums/minutes";
import {
  TOOLBAR_SELECT_GROUP,
  TOOLBAR_SELECT_CONTROL,
  TOOLBAR_STAT_LABEL,
} from "../../common/toolbarStyles";
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
    <div className={TOOLBAR_SELECT_GROUP}>
      <span className={TOOLBAR_STAT_LABEL}>Teslim Et</span>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px] w-auto"
        style={TOOLBAR_SELECT_CONTROL}
        value={handleSetData(automationDatas?.deliveryTime)}
        options={optionsData}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default DeliveryTime;

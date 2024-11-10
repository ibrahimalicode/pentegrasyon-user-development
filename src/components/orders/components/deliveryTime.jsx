//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../enums/minutes";
import CustomSelect from "../../common/customSelector";

//REDUX
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";
import { resetgetDeliveryTimeVariable } from "../../../redux/orders/getDeliveryTimeVariableSlice";

const DeliveryTime = ({
  onTheWayTimeData,
  deliveryTimeData,
  setDeliveryTimeData,
}) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { error: getError, data } = useSelector(
    (state) => state.orders.getDeliveryTimeVar
  );

  const { loading, success, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  const [varData, setVarData] = useState(deliveryTimeData);
  const [optionsData, setOptionsData] = useState([]);

  function updateAutomaticApproval(selectedOption) {
    dispatch(updateTicketAutomationVariable(selectedOption)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        if (selectedOption?.deliveryTime) {
          setVarData(selectedOption);
          setDeliveryTimeData(selectedOption);
          toast.dismiss(toastId.current);
          toast.success("İşlem Başarılı", { id: "delivery/ontheway-time" });
          dispatch(resetUpdateTicketAutomationVariable());
        }
      }
    });
  }

  //TOAST AND SET
  useEffect(() => {
    if (getError) dispatch(resetgetDeliveryTimeVariable());

    if (data) {
      const formattedData = {
        value: data,
        deliveryTime: data,
        label: data + " dk sonra",
      };
      setVarData(formattedData);
      setDeliveryTimeData(formattedData);
      dispatch(resetgetDeliveryTimeVariable());
    }
  }, [data, getError]);

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
    if (onTheWayTimeData?.onTheWayTime) {
      const formattedMins = minutes
        .filter((min) => min.value > onTheWayTimeData.onTheWayTime)
        .map((min) => ({
          ...min,
          deliveryTime: min.value,
          label: min.label + " dk sonra",
        }));
      setOptionsData(formattedMins);
    }
  }, [onTheWayTimeData]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Teslim Et</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={varData}
        options={optionsData}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default DeliveryTime;

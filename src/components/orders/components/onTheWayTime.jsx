//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../enums/minutes";
import CustomSelect from "../../common/customSelector";

//CONTEXT
import { useSignalR } from "../../../context/SignalRContext";

//REDUX
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";
import { resetgetOnTheWayTimeVariable } from "../../../redux/orders/getOnTheWayTimeVariableSlice";

const OnTheWayTime = ({
  onTheWayTimeData,
  setOnTheWayTimeData,
  deliveryTimeData,
}) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { automaticApprovalDatas, setAutomaticApprovalDatas } = useSignalR();

  const { error: getError, data } = useSelector(
    (state) => state.orders.getOnTheWayTimeVar
  );

  const { loading, success, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  function formatMins() {
    return minutes.map((min) => {
      return {
        ...min,
        onTheWayTime: min.value,
        label: min.label + " dk sonra",
      };
    });
  }

  function updateAutomaticApproval(selectedOption) {
    if (selectedOption.value >= deliveryTimeData.value) {
      toast.error(
        "Teslim Et Süresi Yola Çıkart Süresinden az veya eşit olamaz",
        { id: "delivery/ontheway-time" }
      );
      return;
    }
    dispatch(updateTicketAutomationVariable(selectedOption)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        if (selectedOption?.onTheWayTime) {
          setOnTheWayTimeData(selectedOption);
          toast.dismiss(toastId.current);
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
    setOnTheWayTimeData(formattedData);
  }

  //TOAST AND SET
  useEffect(() => {
    if (getError) dispatch(resetgetOnTheWayTimeVariable());

    if (data) {
      handleSetData(data);
      dispatch(resetgetOnTheWayTimeVariable());
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

  //SIGNALR
  useEffect(() => {
    if (automaticApprovalDatas) {
      if (
        automaticApprovalDatas.onTheWayTime !== onTheWayTimeData.onTheWayTime
      ) {
        handleSetData(automaticApprovalDatas.onTheWayTime);
        setAutomaticApprovalDatas(null);
      }
    }
  }, [automaticApprovalDatas]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Yola Çıkar</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={onTheWayTimeData}
        options={formatMins()}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default OnTheWayTime;

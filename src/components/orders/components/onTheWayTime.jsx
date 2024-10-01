//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import minutes from "../../../data/minutes";
import CustomSelect from "../../common/customSelector";
import {
  getOnTheWayTimeVariable,
  resetgetOnTheWayTimeVariable,
} from "../../../redux/orders/getOnTheWayTimeVariableSlice";
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";

const OnTheWayTime = () => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { error: getError, data } = useSelector(
    (state) => state.orders.getOnTheWayTimeVar
  );

  const { loading, success, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  const [varData, setVarData] = useState({ label: "Zaman Seç" });

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
    dispatch(updateTicketAutomationVariable(selectedOption)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setVarData(selectedOption);
      }
    });
  }

  //GET
  useEffect(() => {
    if (!varData?.onTheWayTime) {
      dispatch(getOnTheWayTimeVariable());
    }
  }, [varData]);

  //TOAST AND SET
  useEffect(() => {
    if (getError) dispatch(resetgetOnTheWayTimeVariable());

    if (data) {
      setVarData({
        value: data,
        onTheWayTime: data,
        label: data + " dk sonra",
      });
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
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("İşlem Başarılı", { id: "delivery/ontheway-time" });
      dispatch(resetUpdateTicketAutomationVariable());
    }
  }, [loading, error, success]);

  return (
    <div className="max-sm:w-full border border-[--light-1] rounded-md py-1 px-2 text-xs text-center flex flex-col gap-2">
      <p>Yola Çıkar</p>
      <CustomSelect
        className="mt-[0px] sm:mt-[0px] text-xs"
        className2="mt-[0px] sm:mt-[0px]"
        style={{ padding: "0px 0px" }}
        value={varData}
        options={formatMins()}
        isSearchable={false}
        onChange={(selectedOption) => updateAutomaticApproval(selectedOption)}
      />
    </div>
  );
};

export default OnTheWayTime;

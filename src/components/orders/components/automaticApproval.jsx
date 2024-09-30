import { useEffect, useRef, useState } from "react";
import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import CustomToggle from "../../common/customToggle";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketAutomationVariable,
  resetGetTicketAutomationVariable,
} from "../../../redux/orders/getTicketAutomationVariableSlice";
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";
import toast from "react-hot-toast";

const AutomaticApproval = () => {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, automationVariables, error } = useSelector(
    (state) => state.orders.getAutomationVars
  );

  const [varData, setVarData] = useState(null);

  useEffect(() => {
    if (!automationVariables) {
      dispatch(getTicketAutomationVariable());
    }
  }, [automationVariables]);

  useEffect(() => {
    if (error) dispatch(resetGetTicketAutomationVariable());

    if (automationVariables) {
      console.log(automationVariables);
      setVarData(automationVariables);
    }

    return () => {
      if (automationVariables) {
        console.log("out");
        dispatch(resetGetTicketAutomationVariable());
      }
    };
  }, [automationVariables, error]);

  return (
    <div className="flex items-end">
      <button
        onClick={() => setPopupContent(<AutomaticApprovalPopup />)}
        className={`w-full border text-sm py-2.5 px-4 rounded-md whitespace-nowrap ${
          varData?.automaticApproval
            ? "border-[--green-1] text-[--green-1]"
            : "border-[--red-1] text-[--red-1]"
        }`}
      >
        <span>Otomatik Onay </span>
        <span>●</span>
      </button>
    </div>
  );
};

export default AutomaticApproval;

function AutomaticApprovalPopup({ data }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const [varData, setVarData] = useState(data);

  const { loading, success, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  function updateAutomaticApproval() {
    dispatch(updateTicketAutomationVariable(varData));
  }

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      dispatch(resetUpdateTicketAutomationVariable());
    }
    if (success) {
      toast.dismiss(toastId.current);
      setVarData({ ...varData, automaticApproval: !varData.automaticApproval });
      toast.success(
        `Otomatik Onay ${varData?.automaticApproval ? "Kapandı" : "Açıldı"}`
      );
      dispatch(resetUpdateTicketAutomationVariable());
    }
  }, [loading, error, success]);

  return (
    <main className="w-full bg-[--white-1] pb-[4%] pt-2 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-1.5 mr-2 mb-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>
      <div className="flex gap-2 px-8">
        <CustomToggle
          id="automatic-approval"
          checked={varData?.automaticApproval ? true : false}
          onChange={updateAutomaticApproval}
        />
        <label htmlFor="automatic-approval" className="cursor-pointer">
          Ototmatik Onay
          <span
            className={`${
              varData?.automaticApproval ? "text-[--green-1]" : "text-[--red-1]"
            }`}
          >
            {varData?.automaticApproval ? " (Açık)" : " (Kapalı)"}
          </span>
        </label>
      </div>
    </main>
  );
}

//MODULES
import { useRef } from "react";
import PaymentStatus from "../../../enums/paymentStatus";

const ChangePaymentStatus = ({ payment }) => {
  const paymentStatusRef = useRef();
  const statusClass = paymentStatus(payment).statusClass;

  return (
    <>
      <span
        className={`text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer ${statusClass} `}
        ref={paymentStatusRef}
      >
        ● {PaymentStatus[payment?.status]?.label}
      </span>
    </>
  );
};

export default ChangePaymentStatus;

function paymentStatus(payment) {
  const status = PaymentStatus[payment?.status].value;
  const waiting = "text-[--yellow-1] bg-[--status-yellow] border-[--yellow-1]";
  const success = "text-[--green-1] bg-[--status-green] border-[--green-1]";
  const canceled = "text-[--red-1] bg-[--status-red] border-[--red-1]";
  const statusClass =
    status === "2" ? waiting : status === "0" ? success : canceled;

  return { statusClass };
}

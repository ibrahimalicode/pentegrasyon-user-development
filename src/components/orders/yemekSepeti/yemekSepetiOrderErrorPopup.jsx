import { usePopup } from "../../../context/PopupContext";
import { CloseI } from "../../../assets/icon";
import { useYemekSepetiOrderActions } from "./useYemekSepetiOrderActions";

const YemekSepetoOrderErrorPopup = ({
  order,
  ticketId,
  setSideOrder,
  errorDetails,
  setOrdersData,
}) => {
  const { setPopupContent } = usePopup();

  const { verifyOrder, prepareOrder, deliverOrder, cancelOrder } =
    useYemekSepetiOrderActions({
      order,
      ticketId,
      setSideOrder,
      setOrdersData,
      onlyInDataBase: true,
      cancelOrderData: { ticketId, onlyInDataBase: true },
    });

  return (
    <main className="bg-[--white-1] rounded-md p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] w-max h-max border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>

      <h1>
        Sipariş durumu{" "}
        <span className="text-[--red-1]">
          {JSON?.parse(errorDetails?.data)?.message}
        </span>{" "}
        sebebi ile değiştirilemiyor. Ne yapmak istersiniz ?
      </h1>

      <div className="flex gap-3 py-6 justify-center">
        <button
          className="py-2 px-3 border border-[--green-1] text-[--green-1] bg-[--status-green] rounded-sm"
          onClick={verifyOrder}
        >
          Onayla
        </button>
        <button
          className="py-2 px-3 border border-[--purple-1] text-[--purple-1] bg-[--status-purple] rounded-sm"
          onClick={prepareOrder}
        >
          Yola Çıkar
        </button>
        <button
          className="py-2 px-3 border border-[--brown-1] text-[--brown-1] bg-[--status-brown] rounded-sm"
          onClick={deliverOrder}
        >
          Teslim Et{" "}
        </button>
        <button
          className="py-2 px-3 border border-[--red-1] text-[--red-1] bg-[--status-red] rounded-sm"
          onClick={cancelOrder}
        >
          İptal Et
        </button>
      </div>
    </main>
  );
};

export default YemekSepetoOrderErrorPopup;

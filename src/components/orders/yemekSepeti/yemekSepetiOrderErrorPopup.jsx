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

  const customerAddress = `
    ${order.customer.city},
    ${order.customer.deliveryMainArea},
    ${order.customer.street}`;

  return (
    <main className="bg-[--white-1] rounded-md">
      <div className="flex justify-between items-center mb-4 bg-[--yemeksepeti] px-5 py-3 rounded-t-md">
        <div className="text-sm text-[--white-1]">
          <p>
            <span>Platform: </span>
            <span>YemekSepeti</span>
          </p>
          <p>
            <span>Müşteri: </span>
            <span>{order.customer.firstName}</span>
          </p>
          <p>
            <span>Adres: </span>
            <span>{customerAddress}</span>
          </p>
        </div>
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--white-1] w-max h-max border border-[--white-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>

      <div className="px-5 pb-5">
        <div>
          <p>Sipariş durumu aşağıdaki hata kodundan dolayı değiştirilemiyor.</p>
          <p>
            <span>Hata: </span>
            <span className="text-[--red-1]">
              {JSON?.parse(errorDetails?.data)?.message}
            </span>
          </p>
        </div>

        <div className="flex gap-3 py-10 justify-center">
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

        <div>
          <p>
            Seçtiğiniz durum sadece veritabanda değiştirilecek ve ilgili
            platforma iletilmeyecektir!
          </p>
        </div>
      </div>
    </main>
  );
};

export default YemekSepetoOrderErrorPopup;

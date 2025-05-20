//MODELS
import { useEffect } from "react";
import toast from "react-hot-toast";

//COMP
import CustomToast from "../../common/customToast";

//UTILS
import { formatByDate } from "../../../utils/utils";
import { useFirestore } from "../../../context/FirestoreContext";
import { useOrdersContext } from "../../../context/OrdersContext";

const CourierStatusChange = () => {
  const { ordersData, setOrdersData } = useOrdersContext();
  const { courierStatus, setCourierStatus } = useFirestore();

  //TOAST COURIER STATUS
  useEffect(() => {
    if (!courierStatus) return;

    //handle msg
    const message = {
      title: "Kurye Durumu",
      content: courierStatus?.message,
    };

    toast.custom((t) => CustomToast({ message, t }), {
      position: "top-right",
      duration: 60000,
      id: "COURIER_STATUS",
    });

    //handle migrosyemek courier status change
    if (courierStatus.ticketId) {
      console.log(courierStatus);
      const currentOrder = ordersData?.find(
        (O) => O.id === courierStatus.ticketId
      );
      const existingOrders = ordersData.filter(
        (O) => O.id !== courierStatus.ticketId
      );

      if (!currentOrder) return;
      const updatedOrders = [
        ...existingOrders,
        {
          ...currentOrder,
          courierStatus,
        },
      ];
      setOrdersData(formatByDate(updatedOrders));
    }

    setCourierStatus(null);
  }, [courierStatus]);

  return null;
};

export default CourierStatusChange;

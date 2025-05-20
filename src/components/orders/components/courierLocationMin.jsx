//MODULES
import { MarkerF } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

//CSS
import "./style.css";

//UTILS AND CONT
import { formatByDate } from "../../../utils/utils";
import { useFirestore } from "../../../context/FirestoreContext";

const CourierLocationMin = ({ order, setOrdersData }) => {
  const courierMarkerRef = useRef(null);
  const { courierLocation, setCourierLocation } = useFirestore();
  const [courierLat, setCourierLat] = useState(order?.courier?.latitude);
  const [courierLng, setCourierLng] = useState(order?.courier?.longitude);

  useEffect(() => {
    // console.log(order);
    if (!courierLocation) return;
    if (!order || order?.courierId !== courierLocation?.courierId) return;

    setOrdersData((prev) => {
      const updatedOrders = prev.filter((O) => O.id !== order.id);

      return formatByDate([
        ...updatedOrders,
        {
          ...order,
          courier: {
            ...order?.courier,
            latitude: courierLocation.latitude,
            longitude: courierLocation.longitude,
          },
        },
      ]);
    });

    setCourierLat(courierLocation.latitude);
    setCourierLng(courierLocation.longitude);

    if (courierMarkerRef.current && courierLat && courierLng) {
      // eslint-disable-next-line no-undef
      const newPos = new google.maps.LatLng(courierLat, courierLng);
      courierMarkerRef.current.setPosition(newPos);
    }

    setCourierLocation(null);
  }, [courierLocation]);

  return (
    courierLat &&
    courierLng && (
      <MarkerF
        position={{ lat: courierLat, lng: courierLng }}
        onLoad={(marker) => (courierMarkerRef.current = marker)}
        icon={{
          url: "", // Empty URL to use custom div  // 🛵 Courier icon
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(0, 0),
        }}
        label={{
          text: " ",
          className: "courier-marker",
        }}
      />
    )
  );
};

export default CourierLocationMin;

//MODELS
import { useState } from "react";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";
import { GoogleMap, DirectionsService } from "@react-google-maps/api";

//COMP
import CloseI from "../../../assets/icon/close";

//UTILS & CONT
import { usePopup } from "../../../context/PopupContext";
import CourierLocationMin from "./courierLocationMin";

const GoogleRoute = ({
  data,
  name1,
  name2,
  order = null,
  setOrdersData = null,
}) => {
  const { setPopupContent } = usePopup();

  const { lat1, lng1, lat2, lng2 } = data;
  const [response, setResponse] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const directionsCallback = (result, status) => {
    if (status === "OK" && !response) {
      const leg = result.routes[0].legs[0];
      const distance = leg.distance.text;
      const duration = leg.duration.text;
      setRouteInfo({ distance, duration });
      setResponse(result);
    } else {
      // console.log(data);
    }
  };

  function addDot(num) {
    const out = parseFloat(
      num.toString().slice(0, 2) + "." + num.toString().slice(2)
    );
    // console.log(out);
    return out;
  }

  return (
    <main className="w-full lg:w-[800px] bg-[--white-1] p-5 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>

      <div className="text-sm w-full text-center pb-3 text-[--black-1]">
        <span className="text-[--primary-1]">{name1}</span>
        <span> ve </span>
        <span className="text-[--primary-1]">{name2}</span>
        <span> arasındaki mesafe </span>
        <span className="text-[--primary-1]">{routeInfo?.distance}</span>
        <span> ve yaklaşık süre </span>
        <span className="text-[--primary-1]">{routeInfo?.duration}</span>
      </div>

      <div className="w-full flex justify-center mt-3">
        <GoogleMap
          id="direction-example"
          mapContainerStyle={{
            width: "750px",
            height: "400px",
          }}
          zoom={10}
          center={{ lat: addDot(lat1), lng: addDot(lng1) }}
        >
          {response && (
            <>
              <Marker
                position={response.routes[0].legs[0].start_location}
                icon={{
                  url: "https://cdn-icons-png.freepik.com/512/12522/12522999.png", //Origin
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(50, 50),
                }}
              />

              <CourierLocationMin order={order} setOrdersData={setOrdersData} />

              <Marker
                position={response.routes[0].legs[0].end_location}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/1189/1189458.png", //Destination
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(50, 50),
                }}
              />
            </>
          )}
          <DirectionsService
            options={{
              destination: { lat: lat2, lng: lng2 },
              origin: { lat: addDot(lat1), lng: addDot(lng1) },
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
          {response && (
            <DirectionsRenderer
              options={{
                directions: response,
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </main>
  );
};

export default GoogleRoute;

export const RouteInfo = ({ lat1, lng1, lat2, lng2 }) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    function addDot(num) {
      return parseFloat(
        num.toString().slice(0, 2) + "." + num.toString().slice(2)
      );
    }

    directionsService.route(
      {
        origin: { lat: addDot(lat1), lng: addDot(lng1) },
        destination: { lat: lat2, lng: lng2 },
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          const leg = result.routes[0].legs[0];
          const distance = leg.distance.text;
          const duration = leg.duration.text;
          resolve({ distance, duration });
        } else {
          reject(new Error(`Failed to fetch route info: ${status}`));
        }
      }
    );
  });
};

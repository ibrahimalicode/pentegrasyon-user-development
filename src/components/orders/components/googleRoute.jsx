//MODELS
import { useState } from "react";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";
import { GoogleMap, DirectionsService } from "@react-google-maps/api";

//COMP
import { CourierI } from "../../../assets/icon";
import PopupShell from "../../common/popupShell";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

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
    <main className="mx-auto w-full lg:w-[800px]">
      <PopupShell title="Teslimat Rotası" onClose={() => setPopupContent(null)}>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-4 pb-4">
          <p className="flex min-w-0 items-center text-sm text-[--black-2]">
            <span className="font-semibold text-[--black-1]">{name1}</span>
            {/* Courier parked mid-track while the dashed road streams
                right-to-left underneath — reads as riding name1 → name2. */}
            <span
              className="relative mx-3 inline-flex w-24 items-end justify-center pb-1.5"
              aria-hidden="true"
            >
              <CourierI className="size-12 animate-[rumble_0.25s_ease-in-out_infinite] text-[--primary-1]" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] animate-[road_0.5s_linear_infinite] bg-[repeating-linear-gradient(to_right,var(--gr-5)_0,var(--gr-5)_6px,transparent_6px,transparent_12px)]" />
            </span>
            <span className="font-semibold text-[--black-1]">{name2}</span>
          </p>
          <div className="flex gap-2">
            <div className={TOOLBAR_STAT}>
              <p className={TOOLBAR_STAT_LABEL}>Mesafe</p>
              <p className={TOOLBAR_STAT_VALUE}>{routeInfo?.distance || "—"}</p>
            </div>
            <div className={TOOLBAR_STAT}>
              <p className={TOOLBAR_STAT_LABEL}>Süre</p>
              <p className={TOOLBAR_STAT_VALUE}>{routeInfo?.duration || "—"}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-solid border-[--border-1]">
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              width: "100%",
              height: "420px",
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
      </PopupShell>
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

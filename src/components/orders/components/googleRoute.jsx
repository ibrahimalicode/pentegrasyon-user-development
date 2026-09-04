//MODELS
import Lottie from "lottie-react";
import { useMemo, useState } from "react";
import { DirectionsRenderer, Marker, Polyline } from "@react-google-maps/api";
import { GoogleMap, DirectionsService } from "@react-google-maps/api";

//COMP
import { cn } from "../../../lib/utils";

//COMP
import PopupShell from "../../common/popupShell";
import courierAnimation from "../../../assets/animations/deliveryCourier.json";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

//UTILS & CONT
import { usePopup } from "../../../context/PopupContext";
import CourierLocationMin from "./courierLocationMin";

// marketplaceId → brand color (MARKETPLACES tokens in index.css), so the
// riding courier wears the platform's color. Hex literals because the
// Lottie JSON needs raw RGB, not CSS variables.
const MARKETPLACE_COLORS = [
  "#5d3ebd", // GetirYemek
  "#2cb54e", // MigrosYemek
  "#fc903a", // TrendyolYemek
  "#fa0050", // YemekSepeti
  "#f1b62a", // GoFody
  "#05407a", // Siparişim
];

// The scooter in the animation is drawn with exactly two theme colors —
// #ff3333 (body) and #ff4a4a (highlight). Recoloring = clone the JSON and
// swap those two for the marketplace color and a lightened shade of it.
const SCOOTER_BODY = [1, 0.2, 0.2];
const SCOOTER_HIGHLIGHT = [1, 0.290196, 0.290196];

function themedCourierAnimation(hex) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lightened = rgb.map((v) => v + (1 - v) * 0.25);
  const isNear = (k, target) =>
    Array.isArray(k) &&
    k.length >= 3 &&
    target.every((t, i) => Math.abs(k[i] - t) < 0.01);

  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node && typeof node === "object") {
      if ((node.ty === "fl" || node.ty === "st") && node.c) {
        const k = node.c.k;
        if (isNear(k, SCOOTER_BODY)) node.c.k = [...rgb, k[3] ?? 1];
        else if (isNear(k, SCOOTER_HIGHLIGHT))
          node.c.k = [...lightened, k[3] ?? 1];
      }
      Object.values(node).forEach(walk);
    }
  };

  const clone = JSON.parse(JSON.stringify(courierAnimation));
  walk(clone);
  return clone;
}

// Minimal grey map theme: geometry in neutral greys, POI/transit labels and
// icons off entirely (they crowded the route), road names kept but thin and
// light, water/parks in soft pastels so the route line owns the map.
const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9aa0a6" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#ededed" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#dcebdd" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e8e8e8" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#adb3ba" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#ececec" }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9aa0a6" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#cfe3ef" }],
  },
];

const MAP_TYPES = [
  { id: "roadmap", label: "Harita" },
  { id: "hybrid", label: "Uydu" },
];

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
  const [mapType, setMapType] = useState("roadmap");

  const brandColor = MARKETPLACE_COLORS[order?.marketplaceId] ?? "#4f46e5";

  const themedAnimation = useMemo(
    () =>
      themedCourierAnimation(
        MARKETPLACE_COLORS[order?.marketplaceId] ?? "#4f46e5",
      ),
    [order?.marketplaceId],
  );

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
            <span className="mx-3 h-8 w-px shrink-0 bg-[--border-1]" />
            {/* Courier scene riding name1 → name2, scooter tinted with the
                order's marketplace color. -my keeps the tall scene from
                inflating the header row. */}
            <span className="-my-4 inline-block w-36 shrink-0" aria-hidden="true">
              <Lottie animationData={themedAnimation} loop autoplay />
            </span>
            <span className="mx-3 h-8 w-px shrink-0 bg-[--border-1]" />
            <span className="font-semibold text-[--black-1]">{name2}</span>
          </p>
          <div className="flex gap-2">
            <div className={cn(TOOLBAR_STAT, "flex-row items-center gap-2 shadow-sm")}>
              <span aria-hidden="true">📍</span>
              <span className="text-left">
                <p className={TOOLBAR_STAT_LABEL}>Mesafe</p>
                <p className={TOOLBAR_STAT_VALUE}>
                  {routeInfo?.distance || "—"}
                </p>
              </span>
            </div>
            <div className={cn(TOOLBAR_STAT, "flex-row items-center gap-2 shadow-sm")}>
              <span aria-hidden="true">⏱️</span>
              <span className="text-left">
                <p className={TOOLBAR_STAT_LABEL}>Süre</p>
                <p className={TOOLBAR_STAT_VALUE}>
                  {routeInfo?.duration || "—"}
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-solid border-[--border-1]">
          {/* Custom segmented Harita/Uydu control; the native mapTypeControl
              is disabled below. */}
          <div className="absolute left-3 top-3 z-10 flex rounded-full border border-solid border-[--border-1] bg-[--white-1] p-1 shadow-sm">
            {MAP_TYPES.map((T) => (
              <button
                key={T.id}
                type="button"
                onClick={() => setMapType(T.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  mapType === T.id
                    ? "bg-[--primary-1] text-white"
                    : "text-[--gr-1] hover:text-[--black-1]",
                )}
              >
                {T.label}
              </button>
            ))}
          </div>
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              width: "100%",
              height: "420px",
            }}
            zoom={10}
            center={{ lat: addDot(lat1), lng: addDot(lng1) }}
            mapTypeId={mapType}
            options={{
              styles: MAP_STYLES,
              mapTypeControl: false,
              streetViewControl: false,
              // Removes the "Klavye kısayolları" link; the map-data/terms
              // attribution stays (Google ToS requires it).
              keyboardShortcuts: false,
            }}
          >
          {response && (
            <>
              <Marker
                position={response.routes[0].legs[0].start_location}
                zIndex={30}
                icon={{
                  url: "https://cdn-icons-png.freepik.com/512/12522/12522999.png", //Origin
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(50, 50),
                }}
              />

              <CourierLocationMin order={order} setOrdersData={setOrdersData} />

              <Marker
                position={response.routes[0].legs[0].end_location}
                zIndex={30}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/1189/1189458.png", //Destination
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(50, 50),
                }}
              />

              {/* Soft wide underlay below the crisp brand-colored route
                  line — reads as a glow. */}
              <Polyline
                path={response.routes[0].overview_path}
                options={{
                  strokeColor: brandColor,
                  strokeOpacity: 0.2,
                  strokeWeight: 12,
                  zIndex: 1,
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
                  polylineOptions: {
                    strokeColor: brandColor,
                    strokeOpacity: 0.95,
                    strokeWeight: 5,
                    zIndex: 2,
                  },
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

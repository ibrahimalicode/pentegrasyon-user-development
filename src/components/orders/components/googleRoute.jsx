//MODELS
import Lottie from "lottie-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DirectionsRenderer, Marker, Polyline } from "@react-google-maps/api";
import { GoogleMap, DirectionsService } from "@react-google-maps/api";

//COMP
import { cn } from "../../../lib/utils";
import { RestourantI, UserI } from "../../../assets/icon";

//COMP
import PopupShell from "../../common/popupShell";
import courierAnimation from "../../../assets/animations/deliveryCourier.json";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

//UTILS & CONT
import { getTheme } from "../../../utils/localStorage";
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

// Minimal grey map theme: geometry in neutral greys, road names kept thin
// and light, water/parks in soft pastels so the route line owns the map.
// POI/transit labels and icons stay VISIBLE on purpose — couriers navigate
// by landmarks (hospital, bakery, mosque), so don't hide them.
const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9aa0a6" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
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

// Dark-theme counterpart of MAP_STYLES: same muting philosophy on dark
// greys so the brand-colored route still owns the map.
const MAP_STYLES_DARK = [
  { elementType: "geometry", stylers: [{ color: "#23252e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9aa0a6" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1b1c23" }] },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2a2c37" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#243024" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#383a46" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#2b2d38" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8f939e" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#4a4d5c" }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9aa0a6" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17222e" }],
  },
];

const MAP_TYPES = [
  { id: "roadmap", label: "Harita" },
  { id: "hybrid", label: "Uydu" },
];

// Material glyphs (24x24) drawn inside the pins.
const GLYPH_RESTAURANT =
  "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z";
const GLYPH_PERSON =
  "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";

// Brand-colored teardrop map pin with a white badge and glyph, as an
// inline SVG data URI — replaces the stock freepik/flaticon PNGs.
const pinIcon = (color, glyphPath) =>
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60"><path d="M24 1C12.4 1 3 10.4 3 22c0 15.6 21 37 21 37s21-21.4 21-37C45 10.4 35.6 1 24 1z" fill="${color}" stroke="#ffffff" stroke-width="2"/><circle cx="24" cy="22" r="13" fill="#ffffff"/><g transform="translate(15 13) scale(0.75)" fill="${color}"><path d="${glyphPath}"/></g></svg>`,
  );

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
  // Street View's own exit arrow lives top-left, under our custom map-type
  // control — track the panorama so we can swap the control for an
  // explicit exit button while it is open.
  const [inStreetView, setInStreetView] = useState(false);
  const panoramaRef = useRef(null);

  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    const panorama = map.getStreetView();
    panoramaRef.current = panorama;
    panorama.addListener("visible_changed", () =>
      setInStreetView(panorama.getVisible()),
    );
  };

  const brandColor = MARKETPLACE_COLORS[order?.marketplaceId] ?? "#4f46e5";

  // The route draws itself from the restaurant to the customer instead of
  // appearing all at once.
  const [drawnCount, setDrawnCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!response) return;
    const total = response.routes[0].overview_path?.length ?? 0;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      // A hidden tab never fires rAF; show the finished route instead of
      // an empty map.
      document.visibilityState === "hidden" ||
      total < 3
    ) {
      setDrawnCount(total);
      return;
    }

    let idleListener = null;
    let startTimer = null;
    let fallbackTimer = null;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const DURATION = 1400;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / DURATION, 1);
        // easeOutCubic: quick off the restaurant, settling into the address
        const eased = 1 - Math.pow(1 - t, 3);
        setDrawnCount(Math.max(2, Math.round(eased * total)));
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    // DirectionsRenderer fits the map to the route the moment the response
    // lands, so drawing right away would finish while the camera is still
    // flying. Wait for the map to settle (idle), plus a beat, so the user
    // actually watches the line leave the restaurant.
    const armStart = () => {
      startTimer = setTimeout(run, 250);
    };

    if (mapRef.current && window.google?.maps?.event) {
      idleListener = window.google.maps.event.addListenerOnce(
        mapRef.current,
        "idle",
        armStart,
      );
    }
    // The map may already be idle (or the event never arrives) — never let
    // the route stay invisible.
    fallbackTimer = setTimeout(run, 1500);

    return () => {
      if (idleListener) window.google.maps.event.removeListener(idleListener);
      clearTimeout(startTimer);
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [response]);

  const drawnPath = response
    ? response.routes[0].overview_path.slice(0, drawnCount)
    : [];
  const routeDone =
    !!response && drawnCount >= response.routes[0].overview_path.length;

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
        <div
          className="my-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl px-4 py-3"
          // ~8% alpha of the marketplace color as a soft tinted ground.
          style={{ backgroundColor: `${brandColor}14` }}
        >
          <p className="flex min-w-0 items-center text-sm text-[--black-2]">
            <RestourantI className="mr-1.5 size-5 shrink-0 text-[--gr-1]" />
            <span className="font-semibold text-[--black-1]">{name1}</span>
            <span className="mx-3 h-8 w-px shrink-0 bg-[--border-1]" />
            {/* Courier scene riding name1 → name2, scooter tinted with the
                order's marketplace color. -my keeps the tall scene from
                inflating the header row. */}
            <span
              className="-my-2 inline-block w-[5.4rem] shrink-0"
              aria-hidden="true"
            >
              <Lottie animationData={themedAnimation} loop autoplay />
            </span>
            <span className="mx-3 h-8 w-px shrink-0 bg-[--border-1]" />
            <UserI className="mr-1.5 size-5 shrink-0 text-[--gr-1]" />
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
                <p className={TOOLBAR_STAT_LABEL}>Tahmini Varış</p>
                <p className={TOOLBAR_STAT_VALUE}>
                  {routeInfo?.duration || "—"}
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-solid border-[--border-1]">
          {/* Custom segmented Harita/Uydu control; the native mapTypeControl
              is disabled below. While Street View is open it becomes an
              exit button instead — it used to sit exactly over the
              panorama's own back arrow, leaving no way out. */}
          {inStreetView ? (
            <button
              type="button"
              onClick={() => panoramaRef.current?.setVisible(false)}
              className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-[20px] bg-[--primary-1] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              ← Haritaya Dön
            </button>
          ) : (
            <div className="absolute left-3 top-3 z-10 flex rounded-[20px] border border-solid border-[--border-1] bg-[--white-1] p-1 shadow-sm">
              {MAP_TYPES.map((T) => (
                <button
                  key={T.id}
                  type="button"
                  onClick={() => setMapType(T.id)}
                  className={cn(
                    "rounded-[20px] px-4 py-1.5 text-xs font-semibold transition-colors",
                    mapType === T.id
                      ? "bg-[--primary-1] text-white"
                      : "text-[--gr-1] hover:text-[--black-1]",
                  )}
                >
                  {T.label}
                </button>
              ))}
            </div>
          )}
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              width: "100%",
              height: "420px",
            }}
            zoom={10}
            center={{ lat: addDot(lat1), lng: addDot(lng1) }}
            mapTypeId={mapType}
            onLoad={handleMapLoad}
            options={{
              styles: getTheme() === "dark" ? MAP_STYLES_DARK : MAP_STYLES,
              mapTypeControl: false,
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
                  url: pinIcon(brandColor, GLYPH_RESTAURANT), //Origin
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(44, 55),
                  // eslint-disable-next-line no-undef
                  anchor: new google.maps.Point(22, 55),
                }}
              />

              <CourierLocationMin order={order} setOrdersData={setOrdersData} />

              {/* Destination pin lands when the line reaches it, so the
                  eye follows the route to the address. */}
              <Marker
                position={response.routes[0].legs[0].end_location}
                zIndex={30}
                opacity={routeDone ? 1 : 0}
                animation={
                  // eslint-disable-next-line no-undef
                  routeDone ? google.maps.Animation.DROP : null
                }
                icon={{
                  url: pinIcon(brandColor, GLYPH_PERSON), //Destination
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(44, 55),
                  // eslint-disable-next-line no-undef
                  anchor: new google.maps.Point(22, 55),
                }}
              />

              {/* Soft wide underlay below the crisp brand-colored route
                  line — reads as a glow. Both grow together. */}
              <Polyline
                path={drawnPath}
                options={{
                  strokeColor: brandColor,
                  strokeOpacity: 0.2,
                  strokeWeight: 12,
                  zIndex: 1,
                }}
              />

              {/* The route itself; DirectionsRenderer's own line is
                  suppressed so this animated one is the only route. */}
              <Polyline
                path={drawnPath}
                options={{
                  strokeColor: brandColor,
                  strokeOpacity: 0.95,
                  strokeWeight: 5,
                  zIndex: 2,
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
                  // Our animated polylines draw the route.
                  suppressPolylines: true,
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

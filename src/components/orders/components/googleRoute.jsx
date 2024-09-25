import { useState } from "react";
import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const GoogleRoute = ({ data }) => {
  const { setPopupContent } = usePopup();
  const [response, setResponse] = useState(null);
  const { lat1, lng1, lat2, lng2 } = data;
  const googleAPI = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const directionsCallback = (result, status) => {
    if (status === "OK") {
      setResponse(result);
    }
  };

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
      <div className="w-full flex justify-center mt-3">
        <LoadScript googleMapsApiKey={googleAPI}>
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              width: "750px",
              height: "400px",
            }}
            zoom={10}
            center={{ lat: lat1, lng: lng1 }}
          >
            <DirectionsService
              options={{
                destination: { lat: lat2, lng: lng2 },
                origin: { lat: lat1, lng: lng1 },
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
            />
            {response && (
              <DirectionsRenderer
                options={{
                  directions: response,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </main>
  );
};

export default GoogleRoute;

//MODULS
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

//COMP
import "./index.css";
import App from "./App";
import store from "./store";
import toastOptions from "./config/toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="light">
        <App />
        <Toaster toastOptions={toastOptions} />
      </div>
    </BrowserRouter>
  </Provider>
);

// INJECT GOOGLE MAPS
function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly&libraries=marker`;
    document.head.appendChild(script);
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
  });
}

window.initMap = function () {
  // console.log("Map initialized");
};

loadGoogleMaps(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
// .then(() => console.log("Google Maps script loaded"))
// .catch((error) => console.error("Error loading Google Maps script:", error));

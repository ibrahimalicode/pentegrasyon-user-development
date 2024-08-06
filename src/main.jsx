import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
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

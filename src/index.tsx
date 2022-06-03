import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./containers/App";

import "./styles/style.scss";
import "./styles/colors.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

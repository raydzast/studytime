import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./containers/App.jsx";

import "./styles/style.scss";
import "./styles/colors.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

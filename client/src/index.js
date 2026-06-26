import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // react strict mode is disabled coz it was rendering useEffect twice in fetching speaker
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

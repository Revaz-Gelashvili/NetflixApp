import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/tailwind.css";
import App from "./App.jsx";
import "./Styles/main.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

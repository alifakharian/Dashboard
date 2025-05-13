import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import "./style.css";
import App from "./Pages/Components/App/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

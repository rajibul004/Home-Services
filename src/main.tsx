import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { LocationProvider } from "./components/LocationContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>,
);

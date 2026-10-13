import React from "react";
import { createRoot } from "react-dom/client";
import { CommerceProvider } from "./commerce/CommerceProvider";
import App from "./App";
import "./styles.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommerceProvider>
      <App />
    </CommerceProvider>
  </React.StrictMode>,
);

import "./art-direction.css";

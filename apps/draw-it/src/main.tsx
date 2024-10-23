import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/globals.css";

import App from "./App.tsx";
import { CanvasProvider } from "./contexts/CanvasContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </StrictMode>
);

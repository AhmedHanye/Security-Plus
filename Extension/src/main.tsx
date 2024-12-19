import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TooltipProvider>
);

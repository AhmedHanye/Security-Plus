import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import App from "./App";
import "./index.css";
import ThemeProvider from "./hooks/themeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
      <div className="bg-background text-foreground !text-base">
        <App />
      </div>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);

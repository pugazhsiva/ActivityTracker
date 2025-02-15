import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RootElement from "./RootElement";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootElement />
  </StrictMode>
);

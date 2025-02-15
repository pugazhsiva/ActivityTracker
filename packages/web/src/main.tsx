import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContext } from "./Contexts.ts";

function RootElement() {
  const [token, setToken] = useState<null | string>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContext.Provider value={{ token: token, setToken: setToken }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContext.Provider>
    </LocalizationProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootElement />
  </StrictMode>
);

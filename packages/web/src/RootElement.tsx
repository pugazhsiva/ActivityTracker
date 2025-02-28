import { useState, useEffect } from "react";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContext, SignIn } from "@activitytracker/common";
import GOM from "./gom.tsx";

export default function RootElement() {
  const [token, setToken] = useState<null | {
    access_token: string;
    refresh_token: string;
  }>(null);

  const refreshSession = async () => {
    const data = await fetch("http://localhost:5000/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    data.json().then(
      (value) => {
        console.log("bfeore", value);
        setToken(value);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    refreshSession().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContext value={{ token: token, setToken: setToken }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="app" element={<App />} />
            <Route path="login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </LocalizationProvider>
  );
}

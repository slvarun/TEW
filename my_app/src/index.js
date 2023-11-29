import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authcontext";
import { RegisterContextProvider } from "./context/registercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
);

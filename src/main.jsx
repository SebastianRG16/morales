import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <App />
        <Toaster />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
);

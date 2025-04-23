import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleReCaptchaProvider
      scriptProps={{
        async: true,
        defer: true,
      }}
      reCaptchaKey={import.meta.env.VITE_RECAPCHA_SITE_KEY}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  </StrictMode>
);

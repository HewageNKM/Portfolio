import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { HelmetProvider } from "react-helmet-async";
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <GoogleReCaptchaProvider
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "body",
        }}
        reCaptchaKey={import.meta.env.VITE_RECAPCHA_SITE_KEY}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    </HelmetProvider>
  </StrictMode>
);

"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const RecaptchaProvider = ({ children }: Props) => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

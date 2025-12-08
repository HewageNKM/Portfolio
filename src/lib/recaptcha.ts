import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getRecaptchaToken = useCallback(
    async (action: string) => {
      if (!executeRecaptcha) {
        console.warn("Execute Recaptcha not yet available");
        return null;
      }
      const token = await executeRecaptcha(action);
      return token;
    },
    [executeRecaptcha]
  );

  return { getRecaptchaToken };
};

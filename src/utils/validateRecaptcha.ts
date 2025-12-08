import axios from "axios";

export async function validateRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY is not defined");
    return false;
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );

    return response.data.success;
  } catch (error) {
    console.error("Error validating recaptcha:", error);
    return false;
  }
}

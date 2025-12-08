import { db, admin } from "@/lib/firebase-admin";
import { validateRecaptcha } from "@/utils/validateRecaptcha";

export class MailService {
  static async sendMail(data: {
    recaptchaToken: string;
    mail: string;
    subject: string;
    message: string;
    clientName: string;
  }) {
    const { recaptchaToken, mail, subject, message, clientName } = data;

    if (!recaptchaToken || !mail || !subject || !message || !clientName) {
      throw new Error("Missing required fields.");
    }

    const isRecaptchaValid = await validateRecaptcha(recaptchaToken);

    if (!isRecaptchaValid) {
      throw new Error("reCAPTCHA verification failed.");
    }

    // Save email details to Firestore
    await db.collection("mail").add({
      to: mail,
      message: {
        subject: subject,
        html: message,
      },
      clientName: clientName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: "Email sent successfully" };
  }
}

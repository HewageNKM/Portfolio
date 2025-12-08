import { db, admin } from "@/lib/firebase-admin";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { validateRecaptcha } from "@/utils/validateRecaptcha";

const RATE_LIMIT_COLLECTION = "rateLimits";

// Helper function to check rate limit
const isRateLimited = async (ip: string): Promise<boolean> => {
  const currentTime = Date.now();
  const timeWindow = 60 * 1000;
  const maxRequests = 2;

  console.log(`Checking rate limit for IP: ${ip}`);

  // Fetch rate limit data from Firestore
  const docRef = db.collection(RATE_LIMIT_COLLECTION).doc(ip);
  const docSnapshot = await docRef.get();

  let timestamps: number[] = [];

  if (docSnapshot.exists) {
    timestamps = docSnapshot.data()?.timestamps || [];
  }

  // Filter out timestamps that are outside the time window
  const recentRequests = timestamps.filter(
    (timestamp) => currentTime - timestamp < timeWindow
  );

  console.log(`Recent requests for IP ${ip}: ${recentRequests.length}`);

  // If the user has exceeded the max request limit within the time window
  if (recentRequests.length >= maxRequests) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return true;
  }

  // Log this request in Firestore
  recentRequests.push(currentTime);
  await docRef.set({ timestamps: recentRequests });

  console.log(`Request allowed for IP: ${ip}`);
  return false;
};

export async function POST(req: NextRequest) {
  try {
    const { recaptchaToken, mail, subject, message, clinetName } =
      await req.json();

    // Get client IP securely from headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIP = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    if (!clientIP) {
      return NextResponse.json(
        { error: "Missing client IP address." },
        { status: 400 }
      );
    }

    console.log(`Received mail request from IP: ${clientIP}`);

    if (!recaptchaToken || !mail || !subject || !message || !clinetName) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const isLimited = await isRateLimited(clientIP);

    // Check rate limit
    if (isLimited) {
      return NextResponse.json(
        { error: "Rate limit exceeded." },
        { status: 429 }
      );
    }

    console.log(`Verifying reCAPTCHA token for email: ${mail}`);

    // ... existing rate limit checks ...

    console.log(`Verifying reCAPTCHA token for email: ${mail}`);

    // Use shared utility
    const isRecaptchaValid = await validateRecaptcha(recaptchaToken);

    if (isRecaptchaValid) {
      console.log(`reCAPTCHA verified successfully for email: ${mail}`);

      // Save email details to Firestore
      await db.collection("mail").add({
        to: mail,
        message: {
          subject: subject,
          html: message,
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Email sent for: ${mail}`);
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 201 }
      );
    } else {
      console.log("reCAPTCHA verification failed.");
      return NextResponse.json(
        { error: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Error processing mail request:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

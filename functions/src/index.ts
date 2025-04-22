import * as functions from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import express from "express";
import cors from "cors";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Access the reCAPTCHA secret key from Firebase environment config
// const recaptchaSecretKey = "";
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost", "https://hewagenkm.github.io"];
app.use(cors({
    origin: (origin, callback) => {
        console.log("Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "X-Client-IP", "Authorization"]
  }));

app.get("/v1/health", (_, res) => {
  console.log("Health check received.");
  res.json({ message: "Server is Running Healthy!" });
});

app.post("/v1/mails", async (req, res) => {
  try {
    const { recaptchaToken, mail, subject, message, clinetName } = req.body;
    const clientIP = req.headers["x-client-ip"];

    if (!clientIP) {
      return res.status(400).json({ error: "Missing client IP address." });
    }

    console.log(`Received mail request from IP: ${clientIP}`);

    if (!recaptchaToken || !mail || !subject || !message || !clinetName) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const isLimited = await isRateLimited(clientIP as string);

    // Check rate limit
    if (isLimited) {
      return res.status(429).json({ error: "Rate limit exceeded." });
    }

    console.log(`Verifying reCAPTCHA token for email: ${mail}`);

    // Verify reCAPTCHA token
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: recaptchaSecretKey,
          response: recaptchaToken,
        },
      }
    );

    console.log("reCAPTCHA verification response:", response.data);

    // Check if reCAPTCHA verification is successful
    if (response.data.success) {
      console.log(`reCAPTCHA verified successfully for email: ${mail}`);

      // Save email details to Firestore (or send email, etc.)
      await db.collection("mail").add({
        to: mail,
        message: {
          subject: subject,
          html: message,
        },
      });

      console.log(`Email sent for: ${mail}`);
      return res.status(201).json({ message: "Email sent successfully" });
    } else {
      console.log("reCAPTCHA verification failed.");
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }
  } catch (err) {
    console.error("Error processing mail request:", err);
    return res.status(500).json({ error: (err as Error).message });
  }
});

export const api = functions.onRequest(
  { region: "asia-northeast1", memory: "512MiB", timeoutSeconds: 60 },
  app
);

// Firestore rate limit collection name
const RATE_LIMIT_COLLECTION = "rateLimits";

// Helper function to check rate limit
export const isRateLimited = async (ip: string): Promise<boolean> => {
  const currentTime = Date.now();
  const timeWindow = 60 * 1000; // 1 minute rate limit window
  const maxRequests = 2; // Allow max 5 requests per minute

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

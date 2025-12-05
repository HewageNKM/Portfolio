import * as functions from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Access the reCAPTCHA secret key from Firebase environment config
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

const app = express();
app.use(express.json());

const allowedOrigins = ["https://hewagenkm.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "X-Client-IP", "Authorization"],
  })
);

// Middleware to validate Firebase ID Token
const validateFirebaseIdToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("Check if request is authorized with Firebase ID token");

  if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer "))) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>"
    );
    res.status(403).send("Unauthorized");
    return;
  }

  const idToken = req.headers.authorization.split("Bearer ")[1];

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    // console.log("ID Token correctly decoded", decodedIdToken);
    (req as any).user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

app.get("/v1/health", (_, res) => {
  console.log("Health check received.");
  res.json({ message: "Server is Running Healthy!" });
});

// --- PROJECTS ENDPOINTS ---

app.get("/v1/projects", async (req, res) => {
  try {
    const snapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
    const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/projects", validateFirebaseIdToken, async (req, res) => {
  try {
    const project = req.body;
    project.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("projects").add(project);
    res.status(201).json({ id: docRef.id, ...project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/projects/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = req.body;
    project.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("projects").doc(id).update(project);
    res.json({ id, ...project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/v1/projects/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("projects").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// --- BLOGS ENDPOINTS ---

app.get("/v1/blogs", async (req, res) => {
  try {
    const snapshot = await db.collection("blogs").orderBy("date", "desc").get();
    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("blogs").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/blogs", validateFirebaseIdToken, async (req, res) => {
  try {
    const blog = req.body;
    // Ensure date is set, default to now if not provided
    if (!blog.date) {
      blog.date = new Date().toISOString();
    }
    const docRef = await db.collection("blogs").add(blog);
    res.status(201).json({ id: docRef.id, ...blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/blogs/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = req.body;
    await db.collection("blogs").doc(id).update(blog);
    res.json({ id, ...blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/v1/blogs/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("blogs").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// --- AI ENDPOINT ---

app.post("/v1/ai/generate", validateFirebaseIdToken, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY is not set");
      return res.status(500).json({ error: "AI service not configured" });
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

// --- MAILS ENDPOINT ---

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
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
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

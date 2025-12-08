import * as functions from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
const analyticsDataClient = new BetaAnalyticsDataClient();

admin.initializeApp();
const db = admin.firestore();

const geminiApiKey = process.env.GEMINI_API_KEY;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
console.log(
  `Attempting to connect to Project: ${admin.app().name}, DB: ${
    admin.app().database.name
  }`
);
const app = express();
app.use(express.json());

const allowedOrigins = ["https://hewagenkm.com", "https://www.hewagenkm.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.startsWith("http://localhost")
      ) {
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
const validateFirebaseIdToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Check if request is authorized with Firebase ID token");

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
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
    (req as any).user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

app.get("/health", (_, res) => {
  console.log("Health check received.");
  res.json({ message: "Server is Running Healthy!" });
});

app.get("/v1/projects", async (req, res) => {
  try {
    const { featured } = req.query;
    let query: admin.firestore.Query = db
      .collection("projects")
      .orderBy("createdAt", "desc");

    if (featured === "true") {
      query = query.where("isFeatured", "==", true);
    }

    const snapshot = await query.get();
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: (error as Error).message });
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
    delete project.createdAt;
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
    delete blog.createdAt;
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/analytics", async (req, res) => {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;

    if (!propertyId) {
      console.warn("GA4_PROPERTY_ID not set. Returning mock data.");
      return res.json({
        activeUsers: 0,
        pageViews: 0,
        engagementTime: "0s",
        mock: true,
      });
    }

    // 1. Get Active Users (Realtime) - Last 30 mins
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "minutesAgo" }],
      metrics: [{ name: "activeUsers" }],
    });

    // Sum active users across all minutes
    const activeUsers =
      realtimeResponse.rows?.reduce(
        (sum: number, row: any) =>
          sum + parseInt(row.metricValues?.[0]?.value || "0", 10),
        0
      ) || 0;

    // 2. Get Today's Stats
    const [todayReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    // 3. Get Yesterday's Stats
    const [yesterdayReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    const parseMetric = (report: any, index: number) =>
      report.rows && report.rows.length > 0
        ? parseFloat(report.rows[0].metricValues[index].value || "0")
        : 0;

    const todayPageViews = parseMetric(todayReport, 0);
    const todayEngagement = parseMetric(todayReport, 1);

    const yesterdayPageViews = parseMetric(yesterdayReport, 0);
    const yesterdayEngagement = parseMetric(yesterdayReport, 1);

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const pageViewsChange = calculateChange(todayPageViews, yesterdayPageViews);
    const engagementChange = calculateChange(
      todayEngagement,
      yesterdayEngagement
    );

    // Format engagement time (seconds to m:s)
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      return `${m}m ${s}s`;
    };

    return res.json({
      activeUsers,
      pageViews: {
        value: todayPageViews,
        change: pageViewsChange,
      },
      engagementTime: {
        value: formatTime(todayEngagement), // sending formatted string, or send seconds if frontend wants to format
        seconds: todayEngagement,
        change: engagementChange,
      },
      mock: false,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/educations", async (req, res) => {
  try {
    const snapshot = await db
      .collection("educations")
      .orderBy("startDate", "desc")
      .get();
    const educations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(educations);
  } catch (error) {
    console.error("Error fetching educations:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/educations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("educations").doc(id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Education not found" });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching education:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/educations", validateFirebaseIdToken, async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("educations").add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error("Error creating education:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/educations/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.createdAt;
    data.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("educations").doc(id).update(data);
    res.json({ id, ...data });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/v1/educations/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("educations").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/achievements", async (req, res) => {
  try {
    const snapshot = await db
      .collection("achievements")
      .orderBy("date", "desc")
      .get();
    const achievements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/achievements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("achievements").doc(id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Achievement not found" });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/achievements", validateFirebaseIdToken, async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("achievements").add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/achievements/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.createdAt;
    data.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("achievements").doc(id).update(data);
    res.json({ id, ...data });
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete(
  "/v1/achievements/:id",
  validateFirebaseIdToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("achievements").doc(id).delete();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

app.get("/v1/tech-stacks", async (req, res) => {
  try {
    const snapshot = await db
      .collection("techStacks")
      .orderBy("name", "asc")
      .get();
    const stacks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(stacks);
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/tech-stacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("techStacks").doc(id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Tech stack not found" });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching tech stack:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/tech-stacks", validateFirebaseIdToken, async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("techStacks").add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error("Error creating tech stack:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/tech-stacks/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.createdAt;
    await db.collection("techStacks").doc(id).update(data);
    res.json({ id, ...data });
  } catch (error) {
    console.error("Error updating tech stack:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/v1/tech-stacks/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("techStacks").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tech stack:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/experiences", async (req, res) => {
  try {
    const snapshot = await db
      .collection("experiences")
      .orderBy("createdAt", "desc")
      .get();
    const experiences = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/v1/experiences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("experiences").doc(id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Experience not found" });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/v1/experiences", validateFirebaseIdToken, async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("experiences").add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/v1/experiences/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.createdAt;
    data.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("experiences").doc(id).update(data);
    res.json({ id, ...data });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/v1/experiences/:id", validateFirebaseIdToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("experiences").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: (error as Error).message });
  }
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

// Sitemap Function
export const sitemap = functions.onRequest(
  { region: "asia-southeast1", memory: "256MiB", timeoutSeconds: 60 },
  async (req, res) => {
    try {
      const baseUrl = "https://hewagenkm.com";
      const routes = ["/", "/projects", "/blogs", "/contact"];

      // Fetch dynamic content
      const [blogsSnapshot] = await Promise.all([db.collection("blogs").get()]);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Static Routes
      routes.forEach((route) => {
        xml += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      // Dynamic Blogs
      blogsSnapshot.forEach((doc) => {
        xml += `
  <url>
    <loc>${baseUrl}/blogs/${doc.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
      xml += `
</urlset>`;

      res.set("Content-Type", "application/xml");
      res.status(200).send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  }
);

export const APIs = functions.onRequest(
  { region: "asia-southeast1", memory: "512MiB", timeoutSeconds: 60 },
  app
);

// Firestore rate limit collection name
const RATE_LIMIT_COLLECTION = "rateLimits";
// ... (previous code)

import * as fs from "fs";
import * as path from "path";

// ... (existing exports)

// SSR Function for Dynamic Meta Tags
export const ssr = functions.onRequest(
  { region: "asia-southeast1", memory: "512MiB", timeoutSeconds: 60 },
  async (req, res) => {
    try {
      // 1. Read index.html from the functions directory (copied during build)
      // Note: In production, the file should be in the same directory or a known relative path
      const indexPath = path.resolve(__dirname, "index.html");

      if (!fs.existsSync(indexPath)) {
        console.error("index.html not found at:", indexPath);
        // Fallback: This might fail if the file is truly missing, but we can try to send a basic response
        res.status(500).send("Server Error: index.html missing");
        return;
      }

      let html = fs.readFileSync(indexPath, "utf8");

      const url = req.url;
      const baseUrl = "https://hewagenkm.com";
      const defaultTitle = "Nadun Malwenna - Portfolio";
      const defaultDescription =
        "Explore the portfolio of Nadun Malwenna, a software engineer specializing in full-stack development, mobile applications, and creating innovative web solutions.";
      const defaultImage = "https://hewagenkm.com/og-home.png";

      let title = defaultTitle;
      let description = defaultDescription;
      let image = defaultImage;
      let ogUrl = `${baseUrl}${url}`;

      // 2. Logic to determine content based on URL
      if (url.startsWith("/blogs/")) {
        const blogId = url.split("/blogs/")[1];
        if (blogId) {
          const doc = await db.collection("blogs").doc(blogId).get();
          if (doc.exists) {
            const data = doc.data();
            title = data?.title || defaultTitle;
            description = data?.summary || defaultDescription;
            const contentImage = (data?.content?.match(
              /<img[^>]+src="([^">]+)"/
            ) || [])[1];
            image = contentImage || "https://hewagenkm.com/og-blogs.png";
          }
        }
      } else if (url === "/projects") {
        title = "Projects | Nadun Malwenna";
        description = "Discover a showcase of projects by Nadun Malwenna.";
        image = "https://hewagenkm.com/og-projects.png";
      } else if (url === "/blogs") {
        title = "Blogs | Nadun Malwenna";
        description = "Explore a collection of insightful articles.";
        image = "https://hewagenkm.com/og-blogs.png";
      }

      // 3. Inject Meta Tags
      html = html.replace(
        "<!--__META_TITLE__-->",
        `<title>${title}</title><meta property="og:title" content="${title}" />`
      );
      html = html.replace(
        "<!--__META_DESCRIPTION__-->",
        `<meta name="description" content="${description}" /><meta property="og:description" content="${description}" />`
      );
      html = html.replace(
        "<!--__META_OG_IMAGE__-->",
        `<meta property="og:image" content="${image}" />`
      );
      html = html.replace(
        "<!--__META_OG_URL__-->",
        `<meta property="og:url" content="${ogUrl}" />`
      );

      // 4. Send the modified HTML
      // Cache-Control: dynamic content, so maybe short cache or no cache
      res.set("Cache-Control", "public, max-age=300, s-maxage=600");
      res.status(200).send(html);
    } catch (error) {
      console.error("Error in SSR function:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

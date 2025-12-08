import { MetadataRoute } from "next";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  const serviceAccount = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
  );

  if (Object.keys(serviceAccount).length > 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hewagenkm.com";

  // Static Routes
  const routes = ["", "/projects", "/blogs", "/contact"];

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Dynamic Blog Routes
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const db = getFirestore();
    const blogsSnapshot = await db.collection("blogs").get();

    blogUrls = blogsSnapshot.docs.map((doc) => ({
      url: `${baseUrl}/blogs/${doc.id}`,
      lastModified: new Date(
        doc.data().updatedAt?.toDate() || doc.data().date || new Date()
      ),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn(
      "Could not fetch blogs for sitemap (likely due to build environment missing credentials):",
      error
    );
  }

  return [...staticUrls, ...blogUrls];
}

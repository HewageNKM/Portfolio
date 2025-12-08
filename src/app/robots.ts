import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://hewagenkm.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "terms", "privacy-policy", "guestbook"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: "https://hewagenkm.com",
      dynamicRoutes: ["/", "/projects", "/blogs", "/contact"],
      robots: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/secured/*", "/auth/*"],
        },
      ],
    }),
  ],
});

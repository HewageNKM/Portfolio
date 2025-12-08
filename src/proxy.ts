import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory store for rate limiting
// Note: In a serverless environment (like Vercel), this memory is ephemeral and per-function instance.
// For strict global rate limiting, use Redis/Upstash.
// For this portfolio, a per-instance limit is a sufficient first defense.
const rateLimitMap = new Map();

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rate limit API routes
  if (pathname.startsWith("/api/")) {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const limit = 20; // Requests per minute
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);
    const now = Date.now();

    if (now - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = now;
    }

    if (ipData.count >= limit) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Keep it cool, rate limit exceeded.",
        },
        { status: 429 }
      );
    }

    ipData.count += 1;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

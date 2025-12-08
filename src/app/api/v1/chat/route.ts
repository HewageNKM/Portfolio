import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/services/ChatService";

// Basic in-memory rate limiting (for demonstration purposes, production needs Redis/KV)
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // Rate Limiting
    const lastRequest = rateLimit.get(ip) || 0;
    if (now - lastRequest < 2000) {
      // Enforce 2s delay between messages
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }
    rateLimit.set(ip, now);

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const text = await ChatService.generateResponse(message, history);

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    // Handle specific errors
    if (error.message === "AI service not configured") {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

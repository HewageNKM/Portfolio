import { auth } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export async function verifyAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying auth token:", error);
    return null;
  }
}

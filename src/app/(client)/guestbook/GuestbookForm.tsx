"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"; // Ensure auth is imported correctly depending on your firebase.ts
import { auth } from "@/lib/firebase"; // detailed path
import { Loader2, LogOut } from "lucide-react";
import { apiClient } from "@/lib/api-client";
// Actually, for client side auth in Next.js, standard firebase/auth is fine.
// I'll assume we use auth directly or a simple state listener here.

import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Image from "next/image";

export default function GuestbookForm() {
  const [user, setUser] = useState(auth.currentUser);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // simple listener for local state (better to use context in real app but this works for widget)
  auth.onAuthStateChanged((u) => setUser(u));

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Sign in error", error);
      toast.error("Failed to sign in.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("Signed out.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    setIsLoading(true);
    try {
      const token = await user.getIdToken();
      await apiClient.post(
        "/guestbook",
        { message: message.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
      toast.success("Message left!");
    } catch (error) {
      console.error("Error leaving message", error);
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 mb-8">
      <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
        Sign the Guestbook
      </h3>

      {!user ? (
        <button
          onClick={handleSignIn}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors font-medium text-neutral-900 dark:text-white"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            {user.photoURL && (
              <Image
                width={32}
                height={32}
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Posting as {user.displayName}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-auto text-xs text-red-500 hover:underline flex items-center gap-1"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message..."
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none transition-all resize-none h-24"
            maxLength={500}
          />
          <div className="flex justify-between items-center text-xs text-neutral-400">
            <span>{message.length}/500</span>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              Post Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

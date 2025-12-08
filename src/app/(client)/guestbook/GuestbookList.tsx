"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface GuestbookEntry {
  id: string;
  name: string;
  photoURL: string;
  message: string;
  createdAt: any; // Firestore Timestamp
}

export default function GuestbookList() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GuestbookEntry[];
      setEntries(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex gap-4 p-4 border-b border-neutral-100 dark:border-neutral-800"
          >
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center text-neutral-500 py-10">
        Be the first to sign the guestbook!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex gap-4 p-4 rounded-xl bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <div className="shrink-0">
            <Image
              width={40}
              height={40}
              src={
                entry.photoURL ||
                `https://ui-avatars.com/api/?name=${entry.name}&background=random`
              }
              alt={entry.name}
              className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white truncate">
                {entry.name}
              </h4>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {entry.createdAt?.toDate
                  ? formatDistanceToNow(entry.createdAt.toDate(), {
                      addSuffix: true,
                    })
                  : "Just now"}
              </span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 break-words leading-relaxed text-sm">
              {entry.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

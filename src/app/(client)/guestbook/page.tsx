import { Metadata } from "next";
import GuestbookForm from "./GuestbookForm";
import GuestbookList from "./GuestbookList";

export const metadata: Metadata = {
  title: "Guestbook | Nadun Malwenna",
  description:
    "Sign the guestbook and leave a message for Nadun Malwenna. Say hi, share feedback, or drop your thoughts!",
  keywords: [
    "guestbook",
    "Nadun Malwenna",
    "NKM Hewage",
    "portfolio guestbook",
    "leave a message",
    "visitor messages",
    "contact",
    "feedback",
  ],
  openGraph: {
    title: "Guestbook | Nadun Malwenna",
    description:
      "Leave a message, say hi, or share your thoughts on my portfolio guestbook!",
    url: "https://hewagenkm.com/guestbook",
    images: [
      {
        url: "https://hewagenkm.com/og-home.png",
        width: 1200,
        height: 630,
        alt: "Guestbook - Nadun Malwenna",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guestbook | Nadun Malwenna",
    description: "Say hi or leave your thoughts in my portfolio guestbook!",
    images: ["https://hewagenkm.com/og-home.png"],
  },
};

export default function GuestbookPage() {
  return (
    <div className="flex flex-col items-center justify-center p-5 pb-20 max-w-2xl mx-auto w-full gap-8 mt-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
          Guestbook
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Leave a message, say hi, or share your thoughts!
        </p>
      </div>

      <div className="w-full">
        <GuestbookForm />
        <div className="my-8 border-t border-neutral-200 dark:border-neutral-800"></div>
        <GuestbookList />
      </div>
    </div>
  );
}

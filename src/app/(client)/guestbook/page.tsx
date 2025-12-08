import { Metadata } from "next";
import GuestbookForm from "./GuestbookForm";
import GuestbookList from "./GuestbookList";

export const metadata: Metadata = {
  title: "Guestbook - Nadun Malwenna",
  description: "Leave a message on my guestbook!",
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

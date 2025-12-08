import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nadun Malwenna",
  description:
    "Read the Privacy Policy for Nadun Malwenna’s portfolio website, including details on data collection, usage, cookies, and third-party services such as Firebase and Google Gemini.",
  keywords: [
    "privacy policy",
    "nadun malwenna",
    "data usage",
    "cookies",
    "website privacy",
    "portfolio privacy",
    "firebase auth privacy",
    "google gemini privacy",
  ],
  openGraph: {
    title: "Privacy Policy | Nadun Malwenna",
    description:
      "Learn how your data is collected, used, and protected on Nadun Malwenna’s portfolio website.",
    url: "https://hewagenkm.com/privacy-policy",
    type: "article",
    images: [
      {
        url: "https://hewagenkm.com/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Nadun Malwenna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Nadun Malwenna",
    description:
      "Read the Privacy Policy for Nadun Malwenna’s portfolio and understand how your data is handled.",
    images: ["https://hewagenkm.com/og-privacy.png"],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Introduction</h2>
        <p>
          Welcome to the portfolio website of Nadun Malwenna. This Privacy
          Policy explains how we collect, use, and protect your information when
          you visit our website.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>Authentication Data:</strong> If you use the Guestbook
            feature, we authenticate you via Google. We store your display name,
            profile picture URL, and User ID provided by Google to display your
            identity next to your messages. We do NOT store your password.
          </li>
          <li>
            <strong>Usage Data:</strong> We may use Google Analytics to collect
            anonymous information about how visitors interact with the site such
            as pages visited and session duration.
          </li>
          <li>
            <strong>Chat Data:</strong> Messages sent to the AI Portfolio
            Assistant are processed by Google&apos;s Gemini API. Conversations
            may be temporarily stored for session context but are not retained
            for long-term identification.
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">
          3. How We Use Your Information
        </h2>
        <p>
          - To provide and maintain the Guestbook functionality.
          <br />
          - To improve website performance and understand usage patterns.
          <br />- To prevent misuse of interactive features such as chat and
          guestbook.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">
          4. Cookies and Local Storage
        </h2>
        <p>
          We use cookies and browser storage to maintain your Firebase
          authenticated session. These are essential for enabling Guestbook
          features. By using the website, you consent to the use of these
          functional cookies.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">5. Third-Party Services</h2>
        <p>
          We rely on trusted third-party systems including Firebase (Google) for
          authentication and database services, and Google Gemini for AI chat.
          You are encouraged to review their respective privacy policies for
          more details.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">6. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact me via
          the contact page on this website.
        </p>
      </div>
    </div>
  );
}

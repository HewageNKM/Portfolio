import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Nadun Malwenna",
  description: "Privacy Policy for Nadun Malwenna's Portfolio",
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
            anonymous information about how visitors interact with the site
            (e.g., pages visited, time spent).
          </li>
          <li>
            <strong>Chat Data:</strong> Messages sent to the AI Portfolio
            Assistant are processed by Google&apos;s Gemini API. Conversations
            may be temporarily stored for context during your session but are
            not permanently archived for identifying individuals.
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">
          3. How We Use Your Information
        </h2>
        <p>
          - To provide and maintain the Guestbook service.
          <br />
          - To analyze website traffic and improve user experience.
          <br />- To prevent abuse of the chat and guestbook features.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">
          4. Cookies and Local Storage
        </h2>
        <p>
          We use local storage and cookies to maintain your authenticated
          session via Firebase Auth. These are essential for the Guestbook
          feature to function properly. By using this service, you consent to
          the storage of these functional identifiers.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">5. Third-Party Services</h2>
        <p>
          We use Firebase (Google) for authentication and database services. We
          use Google Gemini for AI chat functionality. Please review their
          respective privacy policies for more information.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">6. Contact</h2>
        <p>
          If you have questions about this policy, please contact me via the
          contact form on this website.
        </p>
      </div>
    </div>
  );
}

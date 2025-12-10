import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Nadun Malwenna",
  description:
    "Read the Terms of Service for Nadun Malwenna’s portfolio website, including usage guidelines, intellectual property rights, disclaimers, and limitations.",
  keywords: [
    "terms of service",
    "tos",
    "legal",
    "policy",
    "nadun malwenna",
    "portfolio terms",
    "website terms",
  ],
  openGraph: {
    title: "Terms of Service | Nadun Malwenna",
    description:
      "Review the Terms of Service for Nadun Malwenna’s portfolio website.",
    url: "https://hewagenkm.com/terms",
    type: "article",
    images: [
      {
        url: "https://hewagenkm.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Terms of Service - Nadun Malwenna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Nadun Malwenna",
    description:
      "Review the Terms of Service for Nadun Malwenna’s portfolio website.",
    images: ["https://hewagenkm.com/og-home.png"],
  },
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
        Terms of Service
      </h1>
      <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound
          by the terms and provisions of this agreement.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">2. Use of Services</h2>
        <p>
          <strong>Guestbook:</strong> You agree to maintain a respectful tone.
          We reserve the right to remove any comments that are offensive, spam,
          or otherwise inappropriate without notice.
        </p>
        <p>
          <strong>AI Chatbot:</strong> The &quot;Portfolio Assistant&quot; is
          provided for informational purposes about Nadun Malwenna&apos;s
          professional work. Do not use harmful, abusive, or illegal language.
          The AI may occasionally generate incorrect information; please verify
          important details.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">
          3. Intellectual Property
        </h2>
        <p>
          The content, layout, design, data, databases and graphics on this
          website are protected by intellectual property laws. Content is owned
          by Nadun Malwenna unless otherwise stated.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">4. Disclaimer</h2>
        <p>
          The materials on this website are provided on an &apos;as is&apos;
          basis. We make no warranties, expressed or implied, and hereby
          disclaim and negate all other warranties including, without
          limitation, implied warranties or conditions of merchantability.
        </p>
      </div>
    </div>
  );
}

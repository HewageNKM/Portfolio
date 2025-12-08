import { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact Me | NKM Hewage",
  description:
    "Contact Nadun Malwenna for collaborations, project inquiries, or professional opportunities. Use the contact form or reach out directly via email.",
  keywords: [
    "contact",
    "Nadun Malwenna",
    "NKM Hewage",
    "software engineer contact",
    "collaboration",
    "project inquiry",
    "web developer contact",
    "full stack developer",
  ],
  openGraph: {
    title: "Contact Me | NKM Hewage",
    description:
      "Reach out to Nadun Malwenna for collaborations, inquiries, or general communication. I'd love to hear from you!",
    url: "https://hewagenkm.com/contact",
    images: [
      {
        url: "https://hewagenkm.com/og-home.png",
        width: 1200,
        height: 630,
        alt: "Contact Nadun Malwenna - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | NKM Hewage",
    description:
      "Reach out to Nadun Malwenna for collaborations, inquiries, or general communication.",
    images: ["https://hewagenkm.com/og-home.png"],
  },
};

export default function ContactPage() {
  return <ContactView />;
}

import { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact Me | NKM Hewage",
  description:
    "Get in touch with Nadun Malwenna for collaborations, inquiries, or just to say hello. Fill out the contact form or reach out directly.",
  keywords:
    "contact, Nadun Malwenna, email, inquiry, collaboration, software engineer",
  openGraph: {
    title: "Contact Me | NKM Hewage",
    description:
      "Get in touch with Nadun Malwenna for collaborations, inquiries, or just to say hello.",
    url: "https://hewagenkm.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactView />;
}

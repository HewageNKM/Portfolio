import ClientLayout from "@/layout/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nadun Malwenna - Portfolio",
  description:
    "Explore the portfolio of Nadun Malwenna, a software engineer specializing in full-stack development and mobile applications.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}

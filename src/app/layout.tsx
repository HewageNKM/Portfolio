import "./globals.css";
import ClientLayout from "@/layout/ClientLayout";

import { ThemeProvider } from "@/context/ThemeContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nadun Malwenna - Portfolio",
  description:
    "Explore the portfolio of Nadun Malwenna, a software engineer specializing in full-stack development and mobile applications.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

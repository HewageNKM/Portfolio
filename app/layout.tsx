import type { Metadata } from "next";
import {Lato} from "next/font/google";
import "../styles/globals.css";
import {GlobalProvider} from "@/context/GlobalProvider";

const lato =Lato({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Nadun's Portfolio",
  description: "Nadun's Portfolio. A place to showcase my work and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
      <GlobalProvider>
        {children}
      </GlobalProvider>
      </body>
    </html>
  );
}

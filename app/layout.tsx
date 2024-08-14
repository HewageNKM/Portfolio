import type {Metadata} from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Nadun's Portfolio",
    description: "Modern And Minimalist Portfolio For Demonstrate My Skills",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/logo.ico"/>
        </head>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}

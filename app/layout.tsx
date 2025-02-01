import type {Metadata} from "next";
import {Lato} from "next/font/google";
import "../styles/globals.css";

const lato = Lato({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Nadun Malwenna",
    description: "Nadun's Portfolio. A place to showcase my work and projects.",
    keywords: ["Nadun", "Portfolio", "Projects", "Web Development", "Software Engineering", "React", "Next.js",]

};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={lato.className}>
        {children}
        </body>
        </html>
    );
}

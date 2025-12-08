import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <RecaptchaProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RecaptchaProvider>
        <Toaster />
      </body>
    </html>
  );
}

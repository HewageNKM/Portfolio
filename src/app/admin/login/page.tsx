import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Admin - Login | NKM Hewage",
  description: "Admin login portal.",
};

export default function LoginPage() {
  return <LoginClient />;
}

import { Metadata } from "next";
import TechStackListClient from "./TechStackListClient";

export const metadata: Metadata = {
  title: "Admin - Tech Stacks | NKM Hewage",
};

export default function TechStackListPage() {
  return <TechStackListClient />;
}

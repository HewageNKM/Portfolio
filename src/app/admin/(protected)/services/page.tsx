import { Metadata } from "next";
import ServicesListClient from "./ServicesListClient";

export const metadata: Metadata = {
  title: "Admin - Services | NKM Hewage",
};

export default function ServicesListPage() {
  return <ServicesListClient />;
}

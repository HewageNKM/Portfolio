import { Metadata } from "next";
import EducationListClient from "./EducationListClient";

export const metadata: Metadata = {
  title: "Admin - Education | NKM Hewage",
};

export default function EducationListPage() {
  return <EducationListClient />;
}

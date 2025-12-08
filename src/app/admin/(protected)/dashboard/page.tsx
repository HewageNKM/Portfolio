import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Admin - Dashboard | NKM Hewage",
};

export default function Dashboard() {
  return <DashboardClient />;
}

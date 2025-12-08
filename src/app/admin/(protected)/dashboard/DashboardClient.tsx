"use client";

import Link from "next/link";
import {
  FileText,
  Briefcase,
  GraduationCap,
  Trophy,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
}

const StatCard = ({ title, count, icon: Icon }: StatCardProps) => (
  <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
    <div>
      <h3 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">
        {count}
      </p>
    </div>
    <div className={`p-3 rounded-full bg-neutral-100 dark:bg-neutral-700`}>
      <Icon size={24} className="text-neutral-600 dark:text-neutral-300" />
    </div>
  </div>
);

export default function DashboardClient() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    education: 0,
    achievements: 0,
    techStacks: 0,
    experiences: 0,
  });

  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.allSettled([
          apiClient.get("/dashboard/stats"),
          apiClient.get("/analytics"),
        ]);

        if (statsRes.status === "fulfilled") {
          setStats(statsRes.value.data);
        } else {
          console.error("Failed to fetch stats:", statsRes.reason);
        }

        if (analyticsRes.status === "fulfilled") {
          setAnalytics(analyticsRes.value.data);
        } else {
          console.error(
            "Failed to load analytics for dashboard:",
            analyticsRes.reason
          );
        }
      } catch (error) {
        console.error("Error in dashboard data fetching:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
        Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Blogs" count={stats.blogs} icon={FileText} />
        <StatCard title="Projects" count={stats.projects} icon={Briefcase} />
        <StatCard
          title="Education"
          count={stats.education}
          icon={GraduationCap}
        />
        <StatCard
          title="Achievements"
          count={stats.achievements}
          icon={Trophy}
        />
        <StatCard title="Tech Stacks" count={stats.techStacks} icon={Layers} />
        <StatCard
          title="Experience"
          count={stats.experiences}
          icon={Briefcase}
        />
      </div>

      {/* Google Analytics Section */}
      <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-neutral-200 dark:border-neutral-700 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <svg
              className="w-6 h-6 text-orange-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            Google Analytics
          </h3>
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open Analytics Dashboard
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              Active Users (Last 30m)
            </span>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
              {analytics ? analytics.activeUsers : "-"}
            </p>
            <span className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
              Real-time
            </span>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              Page Views (Today)
            </span>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
              {analytics ? analytics.pageViews.value : "-"}
            </p>
            {analytics && (
              <span
                className={`text-xs flex items-center gap-1 mt-1 ${
                  analytics.pageViews.change >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {analytics.pageViews.change >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(analytics.pageViews.change)}% vs yesterday
              </span>
            )}
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              Avg. Engagement Time
            </span>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
              {analytics ? analytics.engagementTime.value : "-"}
            </p>
            {analytics && (
              <span
                className={`text-xs flex items-center gap-1 mt-1 ${
                  analytics.engagementTime.change >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {analytics.engagementTime.change >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(analytics.engagementTime.change)}% vs yesterday
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 text-center">
          {analytics?.mock && (
            <p className="text-xs text-amber-500 italic mt-2">
              Note: Showing mock data. Configure GA4_PROPERTY_ID and credentials
              in backend to see real data.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            href="/admin/blogs/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <FileText className="w-6 h-6 mb-2 text-blue-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New Blog
            </span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Briefcase className="w-6 h-6 mb-2 text-green-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New Project
            </span>
          </Link>
          <Link
            href="/admin/experiences/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Briefcase className="w-6 h-6 mb-2 text-purple-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New Experience
            </span>
          </Link>
          <Link
            href="/admin/achievements/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Trophy className="w-6 h-6 mb-2 text-yellow-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New Achievement
            </span>
          </Link>
          <Link
            href="/admin/education/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <GraduationCap className="w-6 h-6 mb-2 text-red-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New Education
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

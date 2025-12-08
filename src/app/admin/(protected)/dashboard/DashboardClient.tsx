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
    <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-700">
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
  const [range, setRange] = useState("today");
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);

  // Fetch Stats (Once on mount)
  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      try {
        const response = await apiClient.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch Analytics (When range changes)
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsAnalyticsLoading(true);
      try {
        const response = await apiClient.get(`/analytics?range=${range}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setIsAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, [range]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
        Overview
      </h2>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isStatsLoading ? (
          // Skeleton Loader for Stats
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-between animate-pulse"
            >
              <div className="space-y-3">
                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                <div className="h-8 w-12 bg-neutral-200 dark:bg-neutral-700 rounded" />
              </div>
              <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))
        ) : (
          <>
            <StatCard title="Total Blogs" count={stats.blogs} icon={FileText} />
            <StatCard
              title="Projects"
              count={stats.projects}
              icon={Briefcase}
            />
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
            <StatCard
              title="Tech Stacks"
              count={stats.techStacks}
              icon={Layers}
            />
            <StatCard
              title="Experience"
              count={stats.experiences}
              icon={Briefcase}
            />
          </>
        )}
      </div>

      {/* GOOGLE ANALYTICS SECTION */}
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
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:opacity-50"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              disabled={isAnalyticsLoading}
            >
              <option value="today">Today</option>
              <option value="7days">Past 7 Days</option>
              <option value="30days">Past 30 Days</option>
            </select>
          </div>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isAnalyticsLoading ? (
            // Skeleton Loader for Analytics
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg animate-pulse"
              >
                <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-600 rounded mb-2" />
                <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-600 rounded mb-2" />
                <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-600 rounded" />
              </div>
            ))
          ) : (
            <>
              {/* Active Users */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
                  Active Users (Real-time)
                </span>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                  {analytics ? analytics.activeUsers : "-"}
                </p>
                <span className="text-xs text-neutral-500 mt-1">
                  Last 30 mins
                </span>
              </div>

              {/* Page Views */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
                  Page Views (
                  {range === "today"
                    ? "Today"
                    : range === "7days"
                    ? "Last 7 Days"
                    : "Last 30 Days"}
                  )
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
                    {Math.abs(analytics.pageViews.change)}% vs previous period
                  </span>
                )}
              </div>

              {/* Engagement */}
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
                    {Math.abs(analytics.engagementTime.change)}% vs previous
                    period
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {!isAnalyticsLoading && analytics?.mock && (
          <p className="text-xs text-amber-500 italic mt-4 text-center">
            Note: Showing mock data. Configure GA4_PROPERTY_ID and credentials
            in backend to see real data.
          </p>
        )}
      </div>

      {/* Quick Actions */}
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
            <span className="text-sm font-medium">New Blog</span>
          </Link>

          <Link
            href="/admin/projects/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Briefcase className="w-6 h-6 mb-2 text-green-500" />
            <span className="text-sm font-medium">New Project</span>
          </Link>

          <Link
            href="/admin/experiences/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Briefcase className="w-6 h-6 mb-2 text-purple-500" />
            <span className="text-sm font-medium">New Experience</span>
          </Link>

          <Link
            href="/admin/achievements/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <Trophy className="w-6 h-6 mb-2 text-yellow-500" />
            <span className="text-sm font-medium">New Achievement</span>
          </Link>

          <Link
            href="/admin/education/new"
            className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-200 dark:border-neutral-600"
          >
            <GraduationCap className="w-6 h-6 mb-2 text-red-500" />
            <span className="text-sm font-medium">New Education</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

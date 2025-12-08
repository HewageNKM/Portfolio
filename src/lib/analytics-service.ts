import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export async function getAnalyticsData() {
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!propertyId) {
    console.warn("GA4_PROPERTY_ID not set. Returning mock data.");
    return {
      activeUsers: 0,
      pageViews: { value: 0, change: 0 },
      engagementTime: { value: "0s", seconds: 0, change: 0 },
      mock: true,
    };
  }

  try {
    // 1. Get Active Users (Realtime) - Last 30 mins
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "minutesAgo" }],
      metrics: [{ name: "activeUsers" }],
    });

    // Sum active users across all minutes
    const activeUsers =
      realtimeResponse.rows?.reduce(
        (sum: number, row: any) =>
          sum + parseInt(row.metricValues?.[0]?.value || "0", 10),
        0
      ) || 0;

    // 2. Get Today's Stats
    const [todayReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    // 3. Get Yesterday's Stats
    const [yesterdayReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    const parseMetric = (report: any, index: number) =>
      report.rows && report.rows.length > 0
        ? parseFloat(report.rows[0].metricValues[index].value || "0")
        : 0;

    const todayPageViews = parseMetric(todayReport, 0);
    const todayEngagement = parseMetric(todayReport, 1);

    const yesterdayPageViews = parseMetric(yesterdayReport, 0);
    const yesterdayEngagement = parseMetric(yesterdayReport, 1);

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const pageViewsChange = calculateChange(todayPageViews, yesterdayPageViews);
    const engagementChange = calculateChange(
      todayEngagement,
      yesterdayEngagement
    );

    // Format engagement time (seconds to m:s)
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      return `${m}m ${s}s`;
    };

    return {
      activeUsers,
      pageViews: {
        value: todayPageViews,
        change: pageViewsChange,
      },
      engagementTime: {
        value: formatTime(todayEngagement),
        seconds: todayEngagement,
        change: engagementChange,
      },
      mock: false,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
}

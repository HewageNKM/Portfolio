import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export async function getAnalyticsData(range: string = "today") {
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
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "minutesAgo" }],
      metrics: [{ name: "activeUsers" }],
    });

    const activeUsers =
      realtimeResponse.rows?.reduce(
        (sum: number, row: any) =>
          sum + parseInt(row.metricValues?.[0]?.value || "0", 10),
        0
      ) || 0;

    let currentStartDate = "today";
    let currentEndDate = "today";
    let prevStartDate = "yesterday";
    let prevEndDate = "yesterday";

    if (range === "7days") {
      currentStartDate = "7daysAgo";
      currentEndDate = "today";
      prevStartDate = "14daysAgo";
      prevEndDate = "7daysAgo";
    } else if (range === "30days") {
      currentStartDate = "30daysAgo";
      currentEndDate = "today";
      prevStartDate = "60daysAgo";
      prevEndDate = "30daysAgo";
    }

    const [currentReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    // 3. Get Previous Period Stats
    const [prevReport] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: prevStartDate, endDate: prevEndDate }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    });

    const parseMetric = (report: any, index: number) =>
      report.rows && report.rows.length > 0
        ? parseFloat(report.rows[0].metricValues[index].value || "0")
        : 0;

    const currentPageViews = parseMetric(currentReport, 0);
    const currentEngagement = parseMetric(currentReport, 1);

    const prevPageViews = parseMetric(prevReport, 0);
    const prevEngagement = parseMetric(prevReport, 1);

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const pageViewsChange = calculateChange(currentPageViews, prevPageViews);
    const engagementChange = calculateChange(currentEngagement, prevEngagement);

    // Format engagement time (seconds to m:s)
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      return `${m}m ${s}s`;
    };

    return {
      activeUsers,
      pageViews: {
        value: currentPageViews,
        change: pageViewsChange,
      },
      engagementTime: {
        value: formatTime(currentEngagement),
        seconds: currentEngagement,
        change: engagementChange,
      },
      mock: false,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
}

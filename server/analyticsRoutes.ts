import { Router } from "express";
import { db } from "./db";
import { insertPageViewSchema, insertVisitorSchema, pageView, visitor } from "@shared/schema";
import { eq, sql, desc, and } from "drizzle-orm";

export const analyticsRouter = Router();

// Initialize analytics data if not present
async function ensureAnalyticsData(days: number = 30) {
  const today = new Date();
  const pageViews = [];
  const visitors = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];

    // Generate data for each path
    const paths = ['/', '/checkout', '/about'];
    for (const path of paths) {
      // Check if entry exists
      const existingPageView = await db.select().from(pageView).where(
        and(
          eq(pageView.date, formattedDate),
          eq(pageView.path, path)
        )
      );

      // Only insert if no entry
      if (existingPageView.length === 0) {
        // Generate random count between 50 and 500
        const count = Math.floor(Math.random() * 450) + 50;
        pageViews.push({
          date: formattedDate,
          path,
          count,
        });
      }
    }

    // Check if visitor entry exists
    const existingVisitor = await db.select().from(visitor).where(
      and(
        eq(visitor.date, formattedDate)
      )
    );

    // Only insert if no entry
    if (existingVisitor.length === 0) {
      // Generate visitors data for different sources
      const sources = ['direct', 'organic', 'social', 'referral'];
      for (const source of sources) {
        const count = Math.floor(Math.random() * 200) + 20;
        visitors.push({
          date: formattedDate,
          source,
          count,
        });
      }
    }
  }

  // Batch insert page views
  if (pageViews.length > 0) {
    await db.insert(pageView).values(pageViews);
  }

  // Batch insert visitors
  if (visitors.length > 0) {
    await db.insert(visitor).values(visitors);
  }
}

// Helper function to get date with offset
function getDateWithOffset(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split('T')[0];
}

// Get page views for the last 30 days
analyticsRouter.get("/page-views", async (req, res) => {
  try {
    await ensureAnalyticsData();
    
    const days = Number(req.query.days) || 30;
    const startDate = getDateWithOffset(days - 1);
    
    const result = await db.select().from(pageView)
      .where(sql`${pageView.date} >= ${startDate}`)
      .orderBy(pageView.date);
    
    return res.json(result);
  } catch (error) {
    console.error("Error fetching page views:", error);
    return res.status(500).json({ error: "Failed to fetch page views" });
  }
});

// Get visitors for the last 30 days
analyticsRouter.get("/visitors", async (req, res) => {
  try {
    await ensureAnalyticsData();
    
    const days = Number(req.query.days) || 30;
    const startDate = getDateWithOffset(days - 1);
    
    const result = await db.select().from(visitor)
      .where(sql`${visitor.date} >= ${startDate}`)
      .orderBy(visitor.date);
    
    return res.json(result);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return res.status(500).json({ error: "Failed to fetch visitors" });
  }
});

// Get analytics summary (totals for today)
analyticsRouter.get("/summary", async (req, res) => {
  try {
    await ensureAnalyticsData();
    
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's page views
    const pageViews = await db.select({
      total: sql<number>`sum(${pageView.count})`,
    })
    .from(pageView)
    .where(eq(pageView.date, today));
    
    // Get today's visitors
    const visitors = await db.select({
      total: sql<number>`sum(${visitor.count})`,
    })
    .from(visitor)
    .where(eq(visitor.date, today));
    
    // Get top paths
    const topPaths = await db.select({
      path: pageView.path,
      total: sql<number>`sum(${pageView.count})`,
    })
    .from(pageView)
    .groupBy(pageView.path)
    .orderBy(sql`total desc`)
    .limit(5);
    
    // Get top sources
    const topSources = await db.select({
      source: visitor.source,
      total: sql<number>`sum(${visitor.count})`,
    })
    .from(visitor)
    .groupBy(visitor.source)
    .orderBy(sql`total desc`)
    .limit(5);
    
    return res.json({
      pageViews: pageViews[0]?.total || 0,
      visitors: visitors[0]?.total || 0,
      topPaths,
      topSources,
    });
  } catch (error) {
    console.error("Error fetching analytics summary:", error);
    return res.status(500).json({ error: "Failed to fetch analytics summary" });
  }
});
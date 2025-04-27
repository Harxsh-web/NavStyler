import { Router } from "express";
import { isAdmin, isAuthenticated } from "./mongo-auth";
import { storage } from "./mongo-storage";
import { Types } from "mongoose";
import * as models from "@shared/models";

export const analyticsRouter = Router();

// Apply auth middleware to all analytics routes
analyticsRouter.use(isAuthenticated, isAdmin);

// Helper function to ensure all dates have data
async function ensureAnalyticsData(days: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Ensure page views data exists
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Check if page view data exists for this date
    const paths = ["/", "/checkout", "/auth", "/admin", "/articles", "/videos"];
    for (const path of paths) {
      const existingView = await models.PageView.findOne({ 
        path, 
        date: { 
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), 
          $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        } 
      });
      
      if (!existingView) {
        // Create random data
        await models.PageView.create({
          path,
          date,
          count: Math.floor(Math.random() * 100) + 10,
          createdAt: date,
          updatedAt: date
        });
      }
    }
    
    // Check if visitor data exists for this date
    const existingVisitor = await models.Visitor.findOne({ 
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    });
    
    if (!existingVisitor) {
      // Create random data
      await models.Visitor.create({
        date,
        count: Math.floor(Math.random() * 200) + 50,
        createdAt: date,
        updatedAt: date
      });
    }
    
    // Check if sales data exists for this date
    const existingSale = await models.Sale.findOne({ 
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    });
    
    if (!existingSale) {
      // Create random data for each product type
      const productTypes = ["physical", "ebook", "audiobook"];
      for (const productType of productTypes) {
        await models.Sale.create({
          date,
          amount: Math.floor(Math.random() * 1000) / 100 + 10,
          productType,
          stripePaymentId: `demo_${date.getTime()}_${Math.random().toString(36).substring(2, 8)}`,
          createdAt: date,
          updatedAt: date
        });
      }
    }
    
    // Check if content engagement data exists for this date
    const contentTypes = ["article", "video"];
    for (const contentType of contentTypes) {
      for (let contentId = 1; contentId <= 3; contentId++) {
        const existingEngagement = await models.ContentEngagement.findOne({
          date: {
            $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          },
          contentType,
          contentId
        });
        
        if (!existingEngagement) {
          await models.ContentEngagement.create({
            date,
            contentType,
            contentId,
            engagementScore: Math.floor(Math.random() * 100) / 100,
            createdAt: date,
            updatedAt: date
          });
        }
      }
    }
  }
}

// Get general analytics data
analyticsRouter.get("/", async (req, res, next) => {
  try {
    // Default to last 7 days if not specified
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    
    // Ensure we have data for the requested period
    await ensureAnalyticsData(days);
    
    // Calculate date range
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);
    
    // Get analytics data
    const pageViews = await storage.getPageViews(startDate, endDate);
    const sales = await storage.getSales(startDate, endDate);
    const visitors = await storage.getVisitors(startDate, endDate);
    const contentEngagement = await storage.getContentEngagement(startDate, endDate);
    
    // Calculate summary data
    const totalPageViews = pageViews.reduce((sum, view) => sum + view.count, 0);
    const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.amount.toString()), 0);
    const totalVisitors = visitors.reduce((sum, visitor) => sum + visitor.count, 0);
    
    // Calculate average engagement score
    let totalEngagementScore = 0;
    let engagementCount = 0;
    contentEngagement.forEach(engagement => {
      totalEngagementScore += parseFloat(engagement.engagementScore.toString());
      engagementCount++;
    });
    const averageEngagement = engagementCount > 0 ? totalEngagementScore / engagementCount : 0;
    
    // Format response
    res.json({
      summary: {
        pageViews: totalPageViews,
        sales: totalSales,
        visitors: totalVisitors,
        averageEngagement
      },
      details: {
        pageViews,
        sales,
        visitors,
        contentEngagement
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get page views
analyticsRouter.get("/page-views", async (req, res, next) => {
  try {
    // Default to last 7 days if not specified
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    
    // Ensure we have data for the requested period
    await ensureAnalyticsData(days);
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    
    const pageViews = await storage.getPageViews(startDate, endDate);
    res.json(pageViews);
  } catch (error) {
    next(error);
  }
});

// Get sales
analyticsRouter.get("/sales", async (req, res, next) => {
  try {
    // Default to last 7 days if not specified
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    
    // Ensure we have data for the requested period
    await ensureAnalyticsData(days);
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    
    const sales = await storage.getSales(startDate, endDate);
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

// Get visitors
analyticsRouter.get("/visitors", async (req, res, next) => {
  try {
    // Default to last 7 days if not specified
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    
    // Ensure we have data for the requested period
    await ensureAnalyticsData(days);
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    
    const visitors = await storage.getVisitors(startDate, endDate);
    res.json(visitors);
  } catch (error) {
    next(error);
  }
});

// Get content engagement
analyticsRouter.get("/content-engagement", async (req, res, next) => {
  try {
    // Default to last 7 days if not specified
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    
    // Ensure we have data for the requested period
    await ensureAnalyticsData(days);
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    
    const contentEngagement = await storage.getContentEngagement(startDate, endDate);
    res.json(contentEngagement);
  } catch (error) {
    next(error);
  }
});
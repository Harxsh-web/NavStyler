import { Router } from 'express';
import { db } from './db';
import * as schema from '@shared/schema';
import { eq, desc, and, sql, gte, lte } from 'drizzle-orm';
import { isAdmin } from './auth';

export const analyticsRouter = Router();

// Only admins can access analytics
analyticsRouter.use(isAdmin);

// Get page views data with date range
analyticsRouter.get('/page-views', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const pageViews = await db.select()
      .from(schema.pageView)
      .where(gte(schema.pageView.date, startDate.toISOString().split('T')[0]))
      .orderBy(schema.pageView.date);
    
    res.json(pageViews);
  } catch (error) {
    console.error('Error fetching page views:', error);
    res.status(500).json({ error: 'Failed to fetch page views data' });
  }
});

// Get sales data with date range
analyticsRouter.get('/sales', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const sales = await db.select()
      .from(schema.sale)
      .where(gte(schema.sale.date, startDate.toISOString().split('T')[0]))
      .orderBy(schema.sale.date);
    
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
});

// Get visitors data with date range
analyticsRouter.get('/visitors', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const visitors = await db.select()
      .from(schema.visitor)
      .where(gte(schema.visitor.date, startDate.toISOString().split('T')[0]))
      .orderBy(schema.visitor.date);
    
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors data' });
  }
});

// Get content engagement data with date range
analyticsRouter.get('/content-engagement', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const engagement = await db.select()
      .from(schema.contentEngagement)
      .where(gte(schema.contentEngagement.date, startDate.toISOString().split('T')[0]))
      .orderBy(schema.contentEngagement.date);
    
    res.json(engagement);
  } catch (error) {
    console.error('Error fetching content engagement:', error);
    res.status(500).json({ error: 'Failed to fetch content engagement data' });
  }
});

// Get sales distribution by product type
analyticsRouter.get('/sales-distribution', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const distribution = await db.execute(sql`
      SELECT 
        product_type, 
        SUM(amount) as total_amount, 
        COUNT(*) as total_count 
      FROM sale 
      WHERE date >= ${startDate.toISOString().split('T')[0]}
      GROUP BY product_type
    `);
    
    res.json(distribution.rows);
  } catch (error) {
    console.error('Error fetching sales distribution:', error);
    res.status(500).json({ error: 'Failed to fetch sales distribution data' });
  }
});

// Get all analytics data in one request
analyticsRouter.get('/summary', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysAgo = parseInt(days as string);
    
    if (isNaN(daysAgo)) {
      return res.status(400).json({ error: 'Invalid days parameter' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    const startDateStr = startDate.toISOString().split('T')[0];
    
    // For demo purposes, we'll generate data if none exists
    await ensureAnalyticsData(daysAgo);
    
    // Get all data in parallel
    const [pageViews, sales, visitors, contentEngagement, salesDistribution] = await Promise.all([
      db.select().from(schema.pageView)
        .where(gte(schema.pageView.date, startDateStr))
        .orderBy(schema.pageView.date),
      db.select().from(schema.sale)
        .where(gte(schema.sale.date, startDateStr))
        .orderBy(schema.sale.date),
      db.select().from(schema.visitor)
        .where(gte(schema.visitor.date, startDateStr))
        .orderBy(schema.visitor.date),
      db.select().from(schema.contentEngagement)
        .where(gte(schema.contentEngagement.date, startDateStr))
        .orderBy(schema.contentEngagement.date),
      db.execute(sql`
        SELECT 
          product_type as name, 
          SUM(amount) as value
        FROM sale 
        WHERE date >= ${startDateStr}
        GROUP BY product_type
      `).then(result => result.rows)
    ]);
    
    // Format the data for the frontend
    const formattedPageViews = pageViews.map(view => ({
      date: view.date,
      value: view.count
    }));
    
    const formattedSales = sales.map(sale => ({
      date: sale.date,
      value: Number(sale.amount)
    }));
    
    const formattedVisitors = visitors.map(visitor => ({
      date: visitor.date,
      value: visitor.count
    }));
    
    const formattedEngagement = contentEngagement.map(engagement => ({
      date: engagement.date,
      value: Number(engagement.engagementScore),
      contentType: engagement.contentType,
      contentId: engagement.contentId
    }));
    
    // Combine all data into one response
    res.json({
      pageViews: formattedPageViews,
      sales: formattedSales,
      visitors: formattedVisitors,
      contentEngagement: formattedEngagement,
      bookSales: salesDistribution
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({ error: 'Failed to fetch analytics summary data' });
  }
});

// Record a page view (public endpoint)
analyticsRouter.post('/record-page-view', async (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Check if there's an existing record for this path and date
    const [existingView] = await db.select()
      .from(schema.pageView)
      .where(
        and(
          eq(schema.pageView.path, path),
          eq(schema.pageView.date, today)
        )
      );
    
    if (existingView) {
      // Update the existing count
      await db.update(schema.pageView)
        .set({ 
          count: existingView.count + 1,
          updatedAt: new Date()
        })
        .where(eq(schema.pageView.id, existingView.id));
    } else {
      // Create a new record
      await db.insert(schema.pageView)
        .values({
          path,
          date: today,
          count: 1
        });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error recording page view:', error);
    res.status(500).json({ error: 'Failed to record page view' });
  }
});

// Helper function to ensure analytics data exists for demo purposes
async function ensureAnalyticsData(days: number) {
  try {
    // Check if we have any analytics data
    const [pageViewCount] = await db.select({ count: sql`count(*)` })
      .from(schema.pageView);
    
    if (Number(pageViewCount?.count) > 0) {
      return; // We already have data
    }
    
    // Generate sample data for the requested time period
    const sampleData = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Page views for different paths
      sampleData.push(
        db.insert(schema.pageView).values({
          path: '/',
          date: dateStr,
          count: Math.floor(Math.random() * 300) + 100
        }),
        db.insert(schema.pageView).values({
          path: '/articles',
          date: dateStr,
          count: Math.floor(Math.random() * 150) + 50
        }),
        db.insert(schema.pageView).values({
          path: '/videos',
          date: dateStr,
          count: Math.floor(Math.random() * 100) + 30
        })
      );
      
      // Sales data
      if (Math.random() > 0.3) { // 70% chance of a physical book sale
        sampleData.push(
          db.insert(schema.sale).values({
            date: dateStr,
            amount: (Math.random() * 20 + 30).toFixed(2),
            productType: 'Physical'
          })
        );
      }
      
      if (Math.random() > 0.2) { // 80% chance of an ebook sale
        sampleData.push(
          db.insert(schema.sale).values({
            date: dateStr,
            amount: (Math.random() * 10 + 15).toFixed(2),
            productType: 'eBook'
          })
        );
      }
      
      if (Math.random() > 0.5) { // 50% chance of an audiobook sale
        sampleData.push(
          db.insert(schema.sale).values({
            date: dateStr,
            amount: (Math.random() * 15 + 20).toFixed(2),
            productType: 'Audiobook'
          })
        );
      }
      
      // Visitor data
      sampleData.push(
        db.insert(schema.visitor).values({
          date: dateStr,
          count: Math.floor(Math.random() * 200) + 50
        })
      );
      
      // Content engagement data
      sampleData.push(
        db.insert(schema.contentEngagement).values({
          date: dateStr,
          contentType: 'article',
          contentId: 1,
          engagementScore: (Math.random() * 60 + 40).toFixed(2)
        }),
        db.insert(schema.contentEngagement).values({
          date: dateStr,
          contentType: 'video',
          contentId: 1,
          engagementScore: (Math.random() * 70 + 30).toFixed(2)
        })
      );
    }
    
    // Execute all the inserts
    await Promise.all(sampleData);
    console.log('Sample analytics data generated successfully');
  } catch (error) {
    console.error('Error generating sample analytics data:', error);
  }
}

export default analyticsRouter;
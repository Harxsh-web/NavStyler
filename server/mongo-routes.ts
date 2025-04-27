import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./mongo-auth";
import { WebSocketServer } from "ws";
import { adminRouter } from "./mongo-adminRoutes";
import { themeRouter } from "./mongo-themeRoutes";
import { contentRouter } from "./mongo-contentRoutes";
import { analyticsRouter } from "./mongo-analyticsRoutes";
import { stripeRouter } from "./mongo-stripeRoutes";
import { storage } from "./mongo-storage";
import { Hero, TestimonialSection, Testimonial, User, ThemeSettings } from "@shared/models";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize MongoDB connection
  await storage.initialize();
  
  // Setup authentication with MongoDB
  setupAuth(app);
  
  // Set up API routes
  app.use("/api/admin", adminRouter);
  app.use("/api/themes", themeRouter);
  app.use("/api/content", contentRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api", stripeRouter);
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Set up WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    // Send message when a client connects
    ws.send(JSON.stringify({ type: 'connection', message: 'Connected to server' }));
    
    // Handle client messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Handle specific message types
        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
  
  // Initialize database with default data if needed
  await initializeDatabase();
  
  return httpServer;
}

async function initializeDatabase() {
  try {
    // Check if we need to initialize the database with default data
    const adminUser = await storage.getUserByUsername('admin@example.com');
    
    if (!adminUser) {
      console.log('Creating default admin user...');
      await storage.createUser({
        username: 'admin@example.com',
        email: 'admin@example.com',
        password: '$2b$10$vSVgYU6qCGKdD4DIKrSOMuiLc7XWfYpzTiT6OJ6Vt1h9xTiGV.Oai', // admin123
        isAdmin: true
      });
    }
    
    // Check if we need to create default theme
    const defaultTheme = await storage.getThemeSettingsByName('Default Theme');
    
    if (!defaultTheme) {
      console.log('Creating default theme...');
      await storage.createThemeSettings({
        name: 'Default Theme',
        primaryColor: '#4f46e5',
        secondaryColor: '#0ea5e9',
        accentColor: '#f59e0b',
        textColor: '#111827',
        backgroundColor: '#e6f1fe',
        fontPrimary: 'Inter',
        fontSecondary: 'Merriweather',
        buttonRadius: '0.5rem',
        buttonStyle: 'filled',
        cardStyle: 'shadow',
        layoutStyle: 'modern',
        isDarkMode: false,
        isHighContrast: false,
        headerStyle: 'default',
        footerStyle: 'standard',
        appliesGlobally: true
      });
    }
    
    // Create default hero section if needed
    const heroSection = await storage.getHeroSection();
    
    if (!heroSection) {
      console.log('Creating default hero section...');
      await storage.updateHeroSection({
        title: "Want To Escape Your 9-5 & travel the world? Join Our YouTube Masterclass",
        subtitle: "Discover the proven strategies and blueprints I've developed, that will allow you to quit your 9-5 and succeed on YouTube.",
        buttonText: "Get the Book",
        buttonUrl: "/checkout",
        imageUrl: "https://example.com/book-cover.jpg"
      });
    }
    
    // Create default testimonial section if needed
    const testimonialSection = await storage.getTestimonialSection();
    
    if (!testimonialSection) {
      console.log('Creating default testimonial section...');
      await storage.updateTestimonialSection({
        title: 'What people are saying about the book'
      });
    }
    
    // Add default testimonial if none exist
    const testimonials = await storage.getTestimonials();
    
    if (testimonials.length === 0) {
      console.log('Creating default testimonial...');
      await storage.createTestimonial({
        quote: 'Luke is the absolute master of productivity. This book changed my life!',
        name: 'Jane Smith',
        title: 'CEO, Tech Solutions',
        imageUrl: 'https://example.com/jane.jpg',
        mediaType: 'image',
        showMobile: true
      });
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
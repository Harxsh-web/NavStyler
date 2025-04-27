import { Router } from "express";
import { isAuthenticated } from "./mongo-auth";
import { storage } from "./mongo-storage";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" })
  : null;

export const stripeRouter = Router();

// Create payment intent for one-time payments
stripeRouter.post("/create-payment-intent", async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(400).json({ 
        error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables." 
      });
    }
    
    const { amount } = req.body;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Valid amount is required" });
    }
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      // Verify your integration - used when testing in Stripe
      metadata: { integration_check: "book_purchase" },
    });
    
    // Return the client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
    
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get or create subscription for recurring payments
stripeRouter.post("/get-or-create-subscription", isAuthenticated, async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(400).json({ 
        error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables." 
      });
    }
    
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.getUser(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // If user already has a subscription, return it
    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        
        const paymentIntent = subscription.latest_invoice 
          ? typeof subscription.latest_invoice === 'string'
            ? await stripe.invoices.retrieve(subscription.latest_invoice)
              .then(invoice => typeof invoice.payment_intent === 'string' 
                ? stripe.paymentIntents.retrieve(invoice.payment_intent)
                : invoice.payment_intent)
            : subscription.latest_invoice.payment_intent
          : null;
          
        const clientSecret = paymentIntent && typeof paymentIntent !== 'string' 
          ? paymentIntent.client_secret 
          : null;
        
        return res.json({
          subscriptionId: subscription.id,
          clientSecret
        });
      } catch (error) {
        // If subscription doesn't exist anymore, continue to create a new one
        console.log("Error retrieving subscription:", error);
      }
    }
    
    // If no subscription exists or couldn't be retrieved, create a new one
    
    // First, check if we have the user's email
    if (!user.email) {
      return res.status(400).json({ error: "User email is required" });
    }
    
    // Check if we have a price ID
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return res.status(400).json({ 
        error: "Stripe price ID is not configured. Please set STRIPE_PRICE_ID in your environment variables." 
      });
    }
    
    try {
      // Create or get customer
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.username
        });
        
        customerId = customer.id;
        
        // Update user with new customer ID
        await storage.updateUser(user._id, { stripeCustomerId: customerId });
      }
      
      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Update user with subscription ID
      await storage.updateUser(user._id, { 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id 
      });
      
      // Extract client secret from subscription
      const latestInvoice = subscription.latest_invoice;
      const paymentIntent = latestInvoice && typeof latestInvoice !== 'string' && latestInvoice.payment_intent;
      const clientSecret = paymentIntent && typeof paymentIntent !== 'string' ? paymentIntent.client_secret : null;
      
      return res.json({
        subscriptionId: subscription.id,
        clientSecret
      });
    } catch (error: any) {
      console.error("Stripe subscription error:", error);
      return res.status(400).json({ error: error.message });
    }
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Record a successful payment
stripeRouter.post("/record-payment", async (req, res, next) => {
  try {
    const { amount, productType, stripePaymentId } = req.body;
    
    if (!amount || isNaN(amount) || !productType) {
      return res.status(400).json({ error: "Valid amount and productType are required" });
    }
    
    // Record the sale in our database
    await storage.createSale({
      date: new Date(),
      amount,
      productType,
      stripePaymentId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.status(201).json({ success: true });
  } catch (error: any) {
    console.error("Error recording payment:", error);
    res.status(500).json({ error: error.message });
  }
});
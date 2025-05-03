import express from 'express';
import Stripe from 'stripe';
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const stripeRouter = express.Router();

// Create a payment intent for one-time payments
stripeRouter.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }
    
    // Create a timestamp and unique identifier for the purchase
    const timestamp = new Date().toISOString();
    const purchaseId = `book_purchase_${Date.now()}`;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        productType: 'book',
        bookTitle: 'Feel-Good Productivity',
        purchaseId: purchaseId,
        timestamp: timestamp,
        platform: 'website'
      },
      description: 'Feel-Good Productivity Book Purchase'
    });
    
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: 'Error creating payment intent', 
      message: error.message 
    });
  }
});

// Handle successful payments and add customer to subscribers list
stripeRouter.post('/payment-success', async (req, res) => {
  try {
    const { paymentIntentId, email, name } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment intent ID is required' });
    }
    
    // Verify payment intent exists and check its status
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (stripeError: any) {
      console.error('Error retrieving payment intent:', stripeError);
      return res.status(400).json({ 
        error: 'Invalid payment intent ID', 
        message: stripeError.message 
      });
    }
    
    // Check payment status
    if (paymentIntent.status !== 'succeeded' && paymentIntent.status !== 'processing') {
      return res.status(400).json({ 
        error: 'Payment has not been completed', 
        status: paymentIntent.status 
      });
    }
    
    // If we have an email, add the customer to subscribers with 'customer' source
    if (email) {
      try {
        await storage.addSubscriber(email, name || null, 'customer');
      } catch (subscriberError: any) {
        console.error('Error adding subscriber:', subscriberError);
        // Don't fail the request if we couldn't add the subscriber
        // We still want to acknowledge the payment success
      }
    }
    
    res.json({ 
      success: true, 
      paymentStatus: paymentIntent.status,
      message: 'Payment processed successfully'
    });
  } catch (error: any) {
    console.error('Error processing successful payment:', error);
    res.status(500).json({ 
      error: 'Error processing payment', 
      message: error.message 
    });
  }
});

// Process a subscription sign-up
stripeRouter.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if the subscriber already exists
    const existingSubscriber = await storage.getSubscriberByEmail(email);
    
    if (existingSubscriber) {
      return res.json({ 
        success: true, 
        message: 'Already subscribed', 
        subscriber: existingSubscriber 
      });
    }
    
    // Add new subscriber
    const subscriber = await storage.addSubscriber(email, name || null);
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed', 
      subscriber 
    });
  } catch (error: any) {
    console.error('Error creating subscriber:', error);
    res.status(500).json({ 
      error: 'Error subscribing', 
      message: error.message 
    });
  }
});

// Redirect to checkout
stripeRouter.post('/redirect-to-checkout', async (req, res) => {
  try {
    const { priceId } = req.body;
    
    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/checkout/cancel`,
    });
    
    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Error creating checkout session', 
      message: error.message 
    });
  }
});

export default stripeRouter;
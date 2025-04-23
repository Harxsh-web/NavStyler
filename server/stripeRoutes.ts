import { Router } from 'express';
import Stripe from 'stripe';

export const stripeRouter = Router();

// Initialize Stripe with the secret key if available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe secret key');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil'
  });
};

// Create a payment intent for one-time payments
stripeRouter.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, productName } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // If we don't have a Stripe key, return a mock response for testing
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(200).json({ 
        clientSecret: 'test_client_secret_' + Math.random().toString(36).substring(2),
        message: 'Test mode: Add your Stripe keys to create real payment intents'
      });
    }

    // Create a real payment intent with Stripe
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      // Add metadata for your own tracking
      metadata: {
        productName: productName || 'Feel-Good Productivity Book',
      },
      // You can also add automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    res.status(500).json({ 
      error: 'Failed to create payment intent', 
      message: error.message 
    });
  }
});

// Handle webhook notifications from Stripe
stripeRouter.post('/webhook', async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(200).end();
    }

    const stripe = getStripe();
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;

    if (endpointSecret) {
      // Verify the event came from Stripe
      const signature = req.headers['stripe-signature'] as string;
      
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️ Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      // If no signing secret, assume the event is legitimate (not secure for production)
      event = req.body;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Here you would fulfill the order
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).end();
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook handler failed', message: error.message });
  }
});

export default stripeRouter;
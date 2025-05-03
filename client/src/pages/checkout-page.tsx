import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';

// Check for the Stripe public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Stripe public key is missing. Running in test mode.');
}

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Checkout Error",
        description: "Stripe has not initialized yet. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      setError('Email is required for purchase confirmation');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed. Please try again.');
      setLoading(false);
      toast({
        title: "Payment Failed",
        description: submitError.message || "An error occurred during payment processing",
        variant: "destructive",
      });
    } else {
      // If no redirect happened, payment succeeded
      try {
        // Record the successful payment and add to subscribers
        await apiRequest('POST', '/api/payment-success', {
          email,
          name,
          paymentIntentId: 'pi_success', // This would normally come from the payment
        });
        
        setLocation('/checkout/success');
      } catch (err) {
        console.error('Error recording successful payment:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            We'll send your receipt and book access to this email
          </p>
        </div>
        
        <div>
          <Label htmlFor="name">Name (optional)</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="mt-1"
          />
        </div>
        
        <div className="pt-4">
          <Label>Payment Information</Label>
          <div className="mt-2 border rounded-md p-4 bg-white">
            <PaymentElement />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          disabled={!stripe || loading}
          className="w-full h-12 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            'Complete Purchase'
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setLocation('/')}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </div>
    </form>
  );
};

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();
  
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await apiRequest('POST', '/api/create-payment-intent', {
          amount: 29.99 // Book price in dollars
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Unable to initialize checkout. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentIntent();
  }, []);
  
  // Handle success page display
  if (location === '/checkout/success') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-md w-full mx-auto p-8 rounded-xl bg-white shadow-md text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! We've sent a confirmation email with details on how to access your book.
          </p>
          <Button onClick={() => setLocation('/')} className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Feel-Good Productivity Book</span>
                <span>$29.99</span>
              </div>
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>$29.99</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
            <p>Your purchase includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Digital copy of "Feel-Good Productivity"</li>
              <li>Lifetime access to book updates</li>
              <li>Access to bonus materials</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Initializing checkout...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : clientSecret ? (
            <Elements 
              stripe={stripePromise} 
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#0284c7',
                  },
                },
              }}
            >
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="text-center py-10">
              <p>Unable to initialize payment form. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
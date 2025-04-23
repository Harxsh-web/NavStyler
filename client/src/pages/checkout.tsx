import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Loader2 } from 'lucide-react';

// We'll initialize Stripe with the public key when it's available
const stripePromiseLoader = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  if (!key) {
    console.warn('Stripe public key is missing. Running in test mode.');
    return Promise.resolve(null);
  }
  return loadStripe(key);
};

const stripePromise = stripePromiseLoader();

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const { toast } = useToast();
  
  // Sample book data - in a real app, this would come from your product database
  const book = {
    title: "Feel-Good Productivity",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2574",
    description: "The new book by Luke Mikic on achieving productivity with joy"
  };

  useEffect(() => {
    // Create a payment intent when the page loads
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: book.price,
            productName: book.title 
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast({
          title: "Payment setup failed",
          description: "Running in test mode. Add your Stripe keys to enable payments.",
          variant: "destructive"
        });
        console.error('Error setting up payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [toast, book.price, book.title]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div>
          <OrderSummary book={book} />
        </div>

        {/* Payment Form Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Complete your purchase securely with Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm />
                </Elements>
              ) : (
                <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md">
                  <p className="text-yellow-800">
                    Payment system is in test mode. Please add your Stripe API keys to enable live payments.
                  </p>
                  <Button className="mt-4 w-full" onClick={() => window.location.href = '/'}>
                    Return Home
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                Your payment information is secured by Stripe. We don't store your card details.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
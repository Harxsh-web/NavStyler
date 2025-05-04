import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, CreditCard, HelpCircle, Info, Loader2, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';

// Check for the Stripe public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Stripe public key is missing. Running in test mode.');
}

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Payment card icons
const cardIcons = [
  { name: 'visa', src: 'https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg' },
  { name: 'mastercard', src: 'https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg' },
  { name: 'amex', src: 'https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg' },
  { name: 'discover', src: 'https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg' },
  { name: 'jcb', src: 'https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg' },
  { name: 'unionpay', src: 'https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg' },
];

interface BillingDetails {
  email: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
}

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    email: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'US',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setBillingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Checkout Error",
        description: "Payment system not initialized yet. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!billingDetails.email) {
      setError('Email is required for purchase confirmation');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions to proceed');
      return;
    }

    setLoading(true);
    setError(null);

    // Store billing details for the success page
    try {
      localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
    } catch (e) {
      console.error('Error storing billing details', e);
    }
    
    // Get payment intent ID from the client secret
    const intentId = clientSecret.split('_secret_')[0];
    
    try {
      // Process payment with Stripe
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?payment_intent_id=${intentId}`,
          receipt_email: billingDetails.email,
          payment_method_data: {
            billing_details: {
              name: `${billingDetails.firstName} ${billingDetails.lastName}`,
              email: billingDetails.email,
              address: {
                city: billingDetails.city,
                country: billingDetails.country,
                line1: billingDetails.streetAddress,
                postal_code: billingDetails.postalCode,
                state: billingDetails.state
              }
            }
          }
        },
      });

      // If we get here, it means there's a direct error without redirect
      if (result.error) {
        console.log("Payment confirmation error:", result.error);
        setError(result.error.message || 'Payment failed. Please try again.');
        setLoading(false);
        toast({
          title: "Payment Failed",
          description: result.error.message || "An error occurred during payment processing",
          variant: "destructive",
          className: "bg-red-500 text-white"
        });
        return;
      }
    } catch (error) {
      console.error("Exception during payment confirmation:", error);
      setError('An unexpected error occurred during payment processing. Please try again.');
      setLoading(false);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again or contact support.",
        variant: "destructive",
      });
      return;
    }

    // This part may or may not run depending on if Stripe redirects
    // Most errors are handled above, but we'll try to capture any successful local response
    {
      // This code may not execute as Stripe will redirect the user to the return_url
      try {
        // Record the successful payment and add to subscribers
        await apiRequest('POST', '/api/payment-success', {
          email: billingDetails.email,
          name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          paymentIntentId: intentId,
        });
        
        setLocation('/checkout/success');
      } catch (err) {
        console.error('Error recording successful payment:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information Section */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-5">Your Billing Information</h2>
        
        <div className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              value={billingDetails.email}
              onChange={handleChange}
              placeholder="Email *"
              required
              className="bg-gray-50"
            />
          </div>
          
          <p className="text-sm text-gray-600">
            Your email and card are saved so we can send you email reminders about this order.
            <button type="button" className="text-red-500 hover:underline ml-1">No Thanks</button>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="firstName"
              type="text"
              value={billingDetails.firstName}
              onChange={handleChange}
              placeholder="First name *"
              required
              className="bg-gray-50"
            />
            
            <Input
              id="lastName"
              type="text"
              value={billingDetails.lastName}
              onChange={handleChange}
              placeholder="Last name *"
              required
              className="bg-gray-50"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="streetAddress"
              type="text"
              value={billingDetails.streetAddress}
              onChange={handleChange}
              placeholder="Street address *"
              required
              className="bg-gray-50"
            />
            
            <Input
              id="city"
              type="text"
              value={billingDetails.city}
              onChange={handleChange}
              placeholder="Town / City"
              className="bg-gray-50"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="postalCode"
              type="text"
              value={billingDetails.postalCode}
              onChange={handleChange}
              placeholder="Postcode / ZIP"
              className="bg-gray-50"
            />
            
            <Select 
              value={billingDetails.country} 
              onValueChange={(value) => handleSelectChange('country', value)}
            >
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Country *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
                <SelectItem value="NZ">New Zealand</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              id="state"
              type="text"
              value={billingDetails.state}
              onChange={handleChange}
              placeholder="State / County"
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>
      
      {/* Payment Information Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <p className="text-sm text-gray-600 mb-4">
          All transactions are secure and encrypted via Stripe payment gateway. 
          No card information is ever stored on our site.
        </p>
        
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="creditCard" 
                name="paymentMethod"
                checked
                readOnly
                className="h-4 w-4 text-primary"
              />
              <label htmlFor="creditCard" className="ml-2 text-sm font-medium">Credit or Debit Card</label>
            </div>
            <div className="flex ml-3 space-x-1">
              {cardIcons.map(card => (
                <img 
                  key={card.name}
                  src={card.src}
                  alt={`${card.name} card`}
                  className="h-6 w-auto"
                />
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">Pay using your credit or debit card via Stripe</p>
          
          <div className="mt-4 border rounded-md p-4 bg-white">
            <PaymentElement />
          </div>
          
          <div className="mt-5">
            <p className="text-sm text-gray-600 mb-1">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our 
              <a href="/privacy-policy" className="text-pink-500 hover:underline ml-1">privacy policy</a>.
            </p>
            
            <div className="flex items-start mt-3">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-1"
              />
              <label 
                htmlFor="terms" 
                className="ml-2 text-sm"
              >
                I have read and agree to the website 
                <a href="/terms" className="text-pink-500 hover:underline ml-1 mr-1">terms and conditions</a>*
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || loading || !acceptTerms}
        className="w-full h-12 text-base bg-[#F9966B] hover:bg-[#f8845a] text-white"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          'Buy Feel-Good Productivity Book'
        )}
      </Button>
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
  if (location.startsWith('/checkout/success')) {
    const [paymentSuccessStatus, setPaymentSuccessStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    useEffect(() => {
      const processSuccessfulPayment = async () => {
        try {
          // Extract payment_intent_id from URL if it exists
          const urlParams = new URLSearchParams(window.location.search);
          
          // Check for both possible parameter names Stripe might use
          let paymentIntentId = urlParams.get('payment_intent_id') || urlParams.get('payment_intent');
          
          if (!paymentIntentId) {
            // Try to extract from the URL fragment (Stripe sometimes adds as #payment_intent=pi_...)
            const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
            paymentIntentId = hashParams.get('payment_intent');
          }
          
          if (!paymentIntentId) {
            setPaymentSuccessStatus('error');
            setErrorMessage('No payment information found.');
            return;
          }
          
          // Get the stored billing details from localStorage if available
          const storedBillingDetails = localStorage.getItem('billingDetails');
          let billingInfo: BillingDetails | Record<string, never> = {};
          
          if (storedBillingDetails) {
            try {
              const parsedDetails = JSON.parse(storedBillingDetails);
              if (typeof parsedDetails === 'object' && parsedDetails !== null) {
                billingInfo = parsedDetails as BillingDetails;
              }
            } catch (e) {
              console.error('Error parsing billing details', e);
            }
          }
          
          // Record the successful payment on our backend
          const response = await apiRequest('POST', '/api/payment-success', {
            paymentIntentId,
            email: 'email' in billingInfo ? billingInfo.email : '',
            name: 'firstName' in billingInfo && 'lastName' in billingInfo 
              ? `${billingInfo.firstName} ${billingInfo.lastName}`
              : ''
          });
          
          if (response.ok) {
            setPaymentSuccessStatus('success');
            // Clear the stored billing details
            localStorage.removeItem('billingDetails');
          } else {
            // Payment was processed but we couldn't record it
            setPaymentSuccessStatus('success');
            console.error('Could not record successful payment on backend', await response.text());
          }
        } catch (err) {
          console.error('Error processing successful payment:', err);
          setPaymentSuccessStatus('error');
          setErrorMessage('There was an error processing your payment confirmation.');
        }
      };
      
      processSuccessfulPayment();
    }, []);
    
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-md w-full mx-auto p-8 rounded-xl bg-white shadow-md text-center">
          {paymentSuccessStatus === 'processing' ? (
            <>
              <div className="mb-6">
                <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Processing Your Payment</h1>
              <p className="text-gray-600 mb-6">
                Please wait while we confirm your payment...
              </p>
            </>
          ) : paymentSuccessStatus === 'error' ? (
            <>
              <div className="mb-6">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Oops, Something Went Wrong</h1>
              <p className="text-gray-600 mb-6">
                {errorMessage || 'There was an issue confirming your payment. Please contact support.'}
              </p>
              <Button onClick={() => window.location.href = '/'} className="w-full">
                Return to Home
              </Button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase! We've sent a confirmation email with details on how to access your book.
              </p>
              <Button onClick={() => window.location.href = '/'} className="w-full">
                Return to Home
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-10 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-gray-600">Fill in your billing details and payment information below.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Initializing checkout...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
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
                    colorPrimary: '#F9966B',
                    colorBackground: '#f7f9fc',
                    borderRadius: '6px',
                  },
                },
              }}
            >
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
              <p>Unable to initialize payment form. Please try again later.</p>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
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
            <p className="font-semibold">Your purchase includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Digital copy of "Feel-Good Productivity"</li>
              <li>Lifetime access to book updates</li>
              <li>Access to exclusive bonus materials</li>
              <li>30-day money-back guarantee</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Need help with your order? Email us at 
                <a href="mailto:support@lukemikic.com" className="text-blue-600 ml-1 hover:underline">
                  support@lukemikic.com
                </a>
              </p>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
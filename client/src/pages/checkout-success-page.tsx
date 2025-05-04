import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { BillingDetails } from './checkout-page';

export default function CheckoutSuccessPage() {
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
          console.log("Looking for payment_intent in URL fragment", window.location.hash);
          // Try to extract from the URL fragment (Stripe sometimes adds as #payment_intent=pi_...)
          const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
          paymentIntentId = hashParams.get('payment_intent');
        }
        
        // Try to extract from localStorage as a fallback
        if (!paymentIntentId) {
          const lastPaymentId = localStorage.getItem('lastPaymentIntentId');
          if (lastPaymentId) {
            console.log("Using stored payment intent ID:", lastPaymentId);
            paymentIntentId = lastPaymentId;
          }
        }
        
        if (!paymentIntentId) {
          console.error("No payment intent ID found in URL or storage");
          setPaymentSuccessStatus('error');
          setErrorMessage('We could not locate your payment information. Please contact support if you believe your payment was processed.');
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
        try {
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
            localStorage.removeItem('lastPaymentIntentId');
          } else {
            console.error('Could not record successful payment on backend', await response.text());
            // Still mark as success since the payment may have gone through
            setPaymentSuccessStatus('success');
          }
        } catch (error) {
          console.error("Error recording payment:", error);
          // Still mark as success since the payment likely went through
          // but we couldn't save the subscriber
          setPaymentSuccessStatus('success');
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
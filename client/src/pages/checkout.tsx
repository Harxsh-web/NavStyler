import { useEffect } from 'react';
import { useLocation } from 'wouter';
import CheckoutPage from './checkout-page';

// This is a simple wrapper component to handle checkout redirects
export default function CheckoutWrapper() {
  const [location] = useLocation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // In the future, we can add additional redirection logic here if needed
    if (location === '/payment-success') {
      navigate('/checkout/success');
    }
  }, [location, navigate]);
  
  return <CheckoutPage />;
}
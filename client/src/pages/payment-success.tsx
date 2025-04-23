import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Book } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [_, setLocation] = useLocation();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  
  useEffect(() => {
    // Extract payment_intent from URL if it exists
    const query = new URLSearchParams(window.location.search);
    const paymentIntentParam = query.get('payment_intent');
    
    if (paymentIntentParam) {
      setPaymentIntent(paymentIntentParam);
    }
    
    // In a real app, you would verify the payment with your backend here
  }, []);

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="mb-2 text-lg font-medium">Feel-Good Productivity</p>
            <p className="text-muted-foreground">
              Your book is now ready for download
            </p>
          </div>
          
          {paymentIntent && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs font-mono">Order ID: {paymentIntent}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <Button className="w-full flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" />
              Download eBook (PDF)
            </Button>
            
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" />
              View Reading Instructions
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            A receipt has been sent to your email.
          </p>
          <Button 
            variant="link" 
            onClick={() => setLocation('/')}
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
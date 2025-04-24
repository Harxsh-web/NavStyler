import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import BookFormatSelector, { BookFormat } from '@/components/checkout/BookFormatSelector';
import { Loader2, Book, Tablet, Headphones, ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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

// Book formats available for purchase
const bookFormats: BookFormat[] = [
  {
    id: 'hardcover',
    name: 'Hardcover',
    description: 'Premium hardcover edition with elegant design and durable binding.',
    price: 29.99,
    icon: <Book className="h-5 w-5" />
  },
  {
    id: 'ebook',
    name: 'eBook',
    description: 'Digital edition for Kindle, iPad, and other e-readers. Instant delivery.',
    price: 19.99,
    icon: <Tablet className="h-5 w-5" />
  },
  {
    id: 'audiobook',
    name: 'Audiobook',
    description: 'Listen on-the-go, narrated by the author. 8+ hours of content.',
    price: 24.99,
    icon: <Headphones className="h-5 w-5" />
  }
];

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [activeTab, setActiveTab] = useState('product');
  const [selectedFormatId, setSelectedFormatId] = useState('hardcover');
  const [quantity, setQuantity] = useState(1);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [checkoutProgress, setCheckoutProgress] = useState(0);
  const { toast } = useToast();
  
  // Sample book data - in a real app, this would come from your product database
  const book = {
    title: "Feel-Good Productivity",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2574",
    description: "The new book by Luke Mikic on achieving productivity with joy"
  };

  // Get the selected format
  const selectedFormat = bookFormats.find(format => format.id === selectedFormatId) || bookFormats[0];

  // Format handlers
  const handleSelectFormat = (formatId: string) => {
    setSelectedFormatId(formatId);
  };

  // Quantity handlers
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  // Promo code handlers
  const handleApplyPromo = (code: string, discount: number) => {
    setPromoDiscount(discount);
    toast({
      title: "Promo code applied",
      description: `${code} discount applied successfully!`,
      variant: "default",
    });
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
  };

  // Navigation handlers
  const proceedToPayment = () => {
    setActiveTab('payment');
    // Animate progress bar
    setCheckoutProgress(50);
  };

  useEffect(() => {
    // Create a payment intent when the page loads or when format/quantity changes
    const fetchPaymentIntent = async () => {
      try {
        const totalAmount = selectedFormat.price * quantity * (1 - promoDiscount / 100);
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: totalAmount,
            productName: `${book.title} (${selectedFormat.name})`,
            quantity
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
    // We need to reload the payment intent when these values change
  }, [toast, book.title, selectedFormat, quantity, promoDiscount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.location.href = '/'} 
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        
        <Progress value={checkoutProgress} className="h-2 w-full" />
        
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span className={`${checkoutProgress >= 0 ? 'font-medium text-primary' : ''}`}>Product Selection</span>
          <span className={`${checkoutProgress >= 50 ? 'font-medium text-primary' : ''}`}>Payment Information</span>
          <span className={`${checkoutProgress >= 100 ? 'font-medium text-primary' : ''}`}>Confirmation</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Selection */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Choose Format</CardTitle>
                  <CardDescription>
                    Select your preferred book format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BookFormatSelector 
                    formats={bookFormats}
                    selectedFormat={selectedFormatId}
                    onSelectFormat={handleSelectFormat}
                  />
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  onClick={proceedToPayment} 
                  className="px-8 bg-[#0F7FFF] text-white hover:bg-blue-700"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Continue to Payment
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <OrderSummary 
                book={book}
                selectedFormat={selectedFormat}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                promoDiscount={promoDiscount}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Form Section */}
            <div className="md:order-2">
              <OrderSummary 
                book={book}
                selectedFormat={selectedFormat}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                promoDiscount={promoDiscount}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveTab('product');
                    setCheckoutProgress(0);
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </div>
            </div>
            
            <div className="md:order-1">
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
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Secure payment processing by Stripe</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Your payment data is encrypted and protected</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
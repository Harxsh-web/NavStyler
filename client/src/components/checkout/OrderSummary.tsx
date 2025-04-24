import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import QuantitySelector from './QuantitySelector';
import PromoCodeForm from './PromoCodeForm';
import { BookFormat } from './BookFormatSelector';
import { Shield, Truck, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSummaryProps {
  book: {
    title: string;
    imageUrl: string;
    description: string;
  };
  selectedFormat: BookFormat;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  promoDiscount?: number;
  onApplyPromo: (code: string, discount: number) => void;
  onRemovePromo: () => void;
  shippingCost?: number;
}

export default function OrderSummary({ 
  book, 
  selectedFormat,
  quantity, 
  onQuantityChange,
  promoDiscount = 0,
  onApplyPromo,
  onRemovePromo,
  shippingCost = 0
}: OrderSummaryProps) {
  // Calculations for display
  const subtotal = selectedFormat.price * quantity;
  const formattedSubtotal = `$${subtotal.toFixed(2)}`;
  
  const discountAmount = (subtotal * promoDiscount) / 100;
  const formattedDiscount = promoDiscount > 0 ? `-$${discountAmount.toFixed(2)}` : '$0.00';
  
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  const tax = subtotalAfterDiscount * 0.05; // 5% tax for example
  const formattedTax = `$${tax.toFixed(2)}`;
  
  const formattedShipping = shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE';
  
  const total = subtotalAfterDiscount + tax + shippingCost;
  const formattedTotal = `$${total.toFixed(2)}`;

  // Delivery info based on format
  const deliveryInfo = {
    hardcover: {
      icon: <Truck className="h-4 w-4 text-blue-500" />,
      text: "Free shipping within 2-3 business days"
    },
    ebook: {
      icon: <Download className="h-4 w-4 text-green-500" />,
      text: "Instant download after purchase"
    },
    audiobook: {
      icon: <Download className="h-4 w-4 text-purple-500" />,
      text: "Download or stream after purchase"
    }
  };

  // Get the delivery info for the selected format
  const delivery = deliveryInfo[selectedFormat.id as keyof typeof deliveryInfo] || deliveryInfo.hardcover;

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review your book purchase details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Book Details */}
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-24 h-32 rounded-md overflow-hidden shadow-md">
            <img 
              src={book.imageUrl} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{book.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-primary/10 text-primary">{selectedFormat.name}</Badge>
              {selectedFormat.id === 'hardcover' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Most Popular
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-1">{book.description}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-lg font-semibold">${selectedFormat.price.toFixed(2)}</p>
              <QuantitySelector 
                quantity={quantity} 
                onQuantityChange={onQuantityChange} 
              />
            </div>
          </div>
        </motion.div>

        <div className="bg-slate-50 p-3 rounded-md flex items-start gap-2">
          {delivery.icon}
          <span className="text-sm">{delivery.text}</span>
        </div>

        <Separator />
        
        {/* Promo Code */}
        <PromoCodeForm 
          onApplyPromo={onApplyPromo}
          onRemovePromo={onRemovePromo}
        />
        
        <Separator />
        
        {/* Order Total */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formattedSubtotal}</span>
          </div>
          
          {promoDiscount > 0 && (
            <motion.div 
              className="flex justify-between text-green-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span>Discount ({promoDiscount}%)</span>
              <span>{formattedDiscount}</span>
            </motion.div>
          )}
          
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formattedTax}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formattedShipping}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formattedTotal}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full bg-slate-50 p-3 rounded-md flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-600 mt-0.5" />
          <p className="text-sm text-slate-700">
            {selectedFormat.id === 'hardcover' 
              ? "Satisfaction guaranteed. If you're not completely satisfied with your purchase, return it within 30 days for a full refund." 
              : "100% satisfaction guaranteed. If you're not completely satisfied with your digital purchase, contact us within 30 days for a full refund."}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
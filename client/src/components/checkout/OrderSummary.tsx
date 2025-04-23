import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Book {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface OrderSummaryProps {
  book: Book;
}

export default function OrderSummary({ book }: OrderSummaryProps) {
  // Calculation for display
  const formattedPrice = `$${book.price.toFixed(2)}`;
  const tax = book.price * 0.05; // 5% tax for example
  const formattedTax = `$${tax.toFixed(2)}`;
  const total = book.price + tax;
  const formattedTotal = `$${total.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review your book purchase details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Book Details */}
        <div className="flex gap-4">
          <div className="w-24 h-32 rounded-md overflow-hidden">
            <img 
              src={book.imageUrl} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{book.title}</h3>
            <p className="text-muted-foreground text-sm">{book.description}</p>
            <p className="text-lg font-semibold mt-2">{formattedPrice}</p>
          </div>
        </div>

        <Separator />
        
        {/* Order Total */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formattedPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formattedTax}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground">
          You'll receive access to download your eBook immediately after purchase.
        </p>
      </CardFooter>
    </Card>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PromoCodeFormProps {
  onApplyPromo: (code: string, discount: number) => void;
  onRemovePromo: () => void;
}

export default function PromoCodeForm({ onApplyPromo, onRemovePromo }: PromoCodeFormProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // This is a mock function that would be replaced by a real API call
  const validatePromoCode = (code: string): Promise<{valid: boolean, discount?: number}> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo promo codes
        if (code.toUpperCase() === 'WELCOME15') {
          resolve({ valid: true, discount: 15 });
        } else if (code.toUpperCase() === 'FRIEND10') {
          resolve({ valid: true, discount: 10 });
        } else {
          resolve({ valid: false });
        }
      }, 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await validatePromoCode(promoCode);
      
      if (result.valid && result.discount) {
        setAppliedCode(promoCode);
        onApplyPromo(promoCode, result.discount);
      } else {
        setError('Invalid promo code. Please try another.');
      }
    } catch (err) {
      setError('Failed to apply promo code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCode = () => {
    setAppliedCode(null);
    setPromoCode('');
    onRemovePromo();
  };

  if (appliedCode) {
    return (
      <div className="p-3 border rounded-md bg-primary/5 flex items-center justify-between">
        <div className="flex items-center">
          <Badge variant="outline" className="bg-primary/10 mr-2 flex items-center">
            <Check className="h-3 w-3 mr-1" /> Applied
          </Badge>
          <span className="text-sm font-medium">{appliedCode.toUpperCase()}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRemoveCode}
          className="h-8 px-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Have a promo code?</h3>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1"
        />
        <Button 
          type="submit" 
          variant="outline"
          disabled={isLoading || !promoCode.trim()}
        >
          {isLoading ? 'Applying...' : 'Apply'}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p>Try these demo codes: <span className="font-mono">WELCOME15</span> or <span className="font-mono">FRIEND10</span></p>
      </div>
    </div>
  );
}
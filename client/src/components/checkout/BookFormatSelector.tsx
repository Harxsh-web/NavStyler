import { useState } from 'react';
import { Check, Book, Tablet, Headphones } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export interface BookFormat {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

interface BookFormatSelectorProps {
  formats: BookFormat[];
  selectedFormat: string;
  onSelectFormat: (formatId: string) => void;
}

export default function BookFormatSelector({
  formats,
  selectedFormat,
  onSelectFormat,
}: BookFormatSelectorProps) {
  return (
    <RadioGroup 
      value={selectedFormat} 
      onValueChange={onSelectFormat}
      className="grid grid-cols-1 gap-4 pt-3"
    >
      {formats.map((format) => (
        <div key={format.id} className="relative">
          <RadioGroupItem
            value={format.id}
            id={format.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={format.id}
            className="flex items-start cursor-pointer rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent/50 hover:border-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors"
          >
            <div className="flex gap-4 w-full">
              <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                {format.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium leading-none">{format.name}</div>
                  <div className="text-base font-medium">${format.price.toFixed(2)}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{format.description}</p>
              </div>
              <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white peer-data-[state=checked]:opacity-100 opacity-0">
                <Check className="h-3 w-3" />
              </div>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
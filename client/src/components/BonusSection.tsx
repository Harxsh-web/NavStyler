import React from 'react';
import { GiftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BonusSection as BonusSectionType, BonusItem } from '@shared/schema';
import { navigate } from "wouter/use-browser-location";

interface BonusSectionProps {
  bonusSection?: BonusSectionType;
  bonusItems?: BonusItem[];
}

const BonusSection: React.FC<BonusSectionProps> = ({ bonusSection, bonusItems = [] }) => {
  if (!bonusSection || bonusItems.length === 0) return null;

  return (
    <section 
      id="bonus-section"
      className="py-16 px-4 sm:px-6 lg:px-8" 
      style={{ backgroundColor: bonusSection.backgroundColor || '#E6F1FE' }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center">
            <GiftIcon className="w-10 h-10 mr-2 text-yellow-500" />
            {bonusSection?.title || 'Free Bonuses'}
          </h2>
          <p className="text-lg text-gray-700">{bonusSection.subtitle}</p>
        </div>

        <div className="grid grid-cols-1  gap-8">
          {bonusItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="overflow-hidden border-0 shadow-md"
              style={{ backgroundColor: item.backgroundColor || '#FFE382' }}
            >
              <CardContent className="p-6">
                <div className="font-semibold text-lg mb-2">
                  Free Bonus #{index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-700 mb-6">{item.description}</p>
                
                {item.buttonText && item.buttonUrl && (
                  <div className="flex justify-end">
                    <Button 
                      variant="secondary" 
                      className="group"
                      onClick={() => window.open(item.buttonUrl, '_blank')}
                    >
                      {item.buttonText}
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {/* CTA button */}
          <div className="mt-16 text-center">
            <button className="bg-[#4fc6e0] hover:bg-black hover:text-white text-black px-10 py-3 rounded-full text-lg font-semibold shadow-md" onClick={()=>navigate("/checkout")}>
              Enrol Now For $995
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LandingSection as LandingSectionType } from "@shared/schema";

interface LandingSectionProps {
  data: LandingSectionType;
}

export default function LandingSection({ data }: LandingSectionProps) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically connect to your newsletter service
      // For now we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to the newsletter.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      style={{ backgroundColor: data.backgroundColor || '#F9F6F3' }}
      className="py-12 md:py-16 px-4 md:px-8 my-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{data.heading}</h2>
            <p className="text-lg text-gray-700">{data.subheading}</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
              <h3 className="text-xl font-semibold mb-3">{data.newsletterHeading}</h3>
              <p className="text-gray-600 mb-4">{data.newsletterSubheading}</p>
              
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : data.newsletterCta}
                </Button>
              </form>
              
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>👥 {data.subscribersCount}</span>
                <span>⭐ {data.reviewsCount}</span>
              </div>
            </div>
          </div>
          
          <div className="order-first md:order-last">
            {data.imageUrl && (
              <img 
                src={data.imageUrl}
                alt="Luke Mikic"
                className="w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
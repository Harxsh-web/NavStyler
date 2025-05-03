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
      className="py-12 md:py-16 px-12 mt-0 mb-0"
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
                  className="w-full bg-[#f97316] hover:bg-[#ea580c]"
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
          
          <div className="order-first md:order-last flex justify-center">
            <div className="max-w-[350px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-yellow-400 p-5 text-center rounded-t-xl">
                <p className="text-xs font-medium mb-1">The world's most-followed productivity expert</p>
                <h3 className="text-2xl md:text-3xl font-bold">Luke Mikic</h3>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#30B8C4] text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                  Feel
                </div>
                <div className="bg-red-500 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                  Good
                </div>
              </div>
              <div className="bg-pink-400 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                Productivity
              </div>
              <div className="bg-green-500 text-white p-4 rounded-b-xl text-center">
                <p className="font-medium text-sm md:text-base">How to Do More of<br/>What Matters to You</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
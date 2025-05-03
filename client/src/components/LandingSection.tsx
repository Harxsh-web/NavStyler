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
      className="py-12 md:py-16 px-4 md:px-8 mt-0 mb-0"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hey Friends section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 rounded-full transform -translate-x-4 translate-y-4"></div>
            <div className="relative z-10">
              <img 
                src={data.imageUrl || "/images/authors/luke_mikic.png"}
                alt="Luke Mikic"
                className="rounded-full w-full max-w-md"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <h2 className="text-5xl font-bold">Hey Friends <span className="inline-block ml-2 transform rotate-12">👋</span></h2>
              <div className="absolute bottom-0 left-0 w-56 h-1 bg-[#47c1e1]"></div>
            </div>
            <p className="text-xl">
              I'm Luke. I'm a Doctor turned Entrepreneur, YouTuber, and the author of the New York Times bestseller, <span className="font-bold">Feel-Good Productivity</span>.
            </p>
            <div className="flex items-center">
              <div className="h-10 w-1 bg-orange-400 mr-4"></div>
              <p className="text-lg">{data.subheading}</p>
            </div>
          </div>
        </div>

        {/* Newsletter subscription card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Subscription info */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <h2 className="text-4xl font-bold">Subscribe to <br />LifeNotes</h2>
                  <img src="/images/pen.svg" alt="Pen" className="h-16 ml-2" />
                </div>
                
                <p className="font-medium">
                  Join a growing community of more than<br />
                  <span className="font-bold">{data.subscribersCount}</span>
                </p>
                
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-4">
                    <img src="/images/avatar1.png" alt="Avatar" className="h-8 w-8 rounded-full border-2 border-white" />
                    <img src="/images/avatar2.png" alt="Avatar" className="h-8 w-8 rounded-full border-2 border-white" />
                    <img src="/images/avatar3.png" alt="Avatar" className="h-8 w-8 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                    <p className="text-sm">{data.reviewsCount}</p>
                  </div>
                </div>
              </div>
              
              {/* Right side - Form */}
              <div className="space-y-4">
                <p className="text-gray-700">
                  {data.newsletterSubheading}
                </p>
                
                <form onSubmit={handleSubscribe} className="mt-2">
                  <div className="flex h-[60px] rounded-full overflow-hidden bg-gray-100">
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow rounded-none border-0 bg-gray-100 h-full px-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="rounded-full bg-[#47c1e1] hover:bg-[#38a3c3] text-white px-8 h-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : data.newsletterCta}
                    </Button>
                  </div>
                </form>
                
                <p className="text-xs text-gray-500">
                  By submitting this form, you'll be signed up to my free newsletter, which sometimes
                  includes mentions of my books, apps and courses. You can opt-out at any time with no
                  hard feelings. 👍 Here's our <a href="#" className="underline">privacy policy</a> if you like reading.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <p className="text-sm text-gray-600 text-center md:text-left">As featured in:</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-2">
              <img src="/images/business-insider.svg" alt="Business Insider" className="h-6" />
              <img src="/images/nyt.svg" alt="New York Times" className="h-6" />
              <img src="/images/good-morning-america.svg" alt="Good Morning America" className="h-6" />
              <img src="/images/financial-times.svg" alt="Financial Times" className="h-6" />
              <img src="/images/bbc.svg" alt="BBC Radio" className="h-6" />
              <img src="/images/mens-health.svg" alt="Men's Health" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
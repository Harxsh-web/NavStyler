import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from 'lucide-react';
import { LandingSection as LandingSectionType } from "@shared/schema";

interface LandingSectionProps {
  data: LandingSectionType;
}

export default function LandingSection({ data }: LandingSectionProps) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();

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
         className: "bg-green-500 text-white"
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
      style={{ backgroundColor: '#F9F7F4' }}
      className="py-12 md:py-16 px-4 md:px-8 mt-0 mb-0"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="max-w-4xl mx-auto text-center ">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Join The 9–5 Escape Artist 
            <div className="relative inline-block">
              Academy
              <div className="absolute bottom-1 left-0 right-0 h-1.5 -mb-1 transform translate-y-1 mx-auto" style={{
                background: 'linear-gradient(to right, rgba(182, 153, 255, 0.3) 0%, rgba(182, 153, 255, 0.9) 50%, rgba(182, 153, 255, 0.3) 100%)',
                borderRadius: '9999px',
                width: '106%',
                marginLeft: '-3%'
              }}></div>
            </div>
          </h1>
          
          {/* Image container */}
          <div className="relative flex justify-center w-full mb-8">
            {/* Capsule shape with yellow background - slight offset for visual interest */}
            <div className="absolute w-full h-full bg-yellow-300 rounded-[100px] max-w-md transform translate-x-4 translate-y-4"></div>
            {/* Image container */}
            <div className="relative z-10 w-full max-w-md">
              <div className="aspect-[1.6/1] rounded-[100px] overflow-hidden">
                <img 
                  src={"https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg"}
                  alt="Luke Mikic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Discover the proven strategies and blueprints I’ve developed, that will allow you to quit your 
            <br />without <span className="font-bold"> 9-5 and succeed on YouTube.</span>
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4 mb-4">
            <Button
              size="default"
              className="bg-[#FF9B76] hover:bg-[#FF855A] text-black font-medium rounded-full px-6 md:px-8 py-2 md:py-4 h-auto text-lg md:text-lg w-50 md:w-auto"
              onClick={() => navigate('/checkout')}
            >
              Enrol Now for $995
            </Button>
            
            <Button
              size="default"
              variant="outline"
              className="border-2 font-medium rounded-full px-6 md:px-8 py-2 md:py-4 h-auto text-sm md:text-lg w-50 md:w-auto"
              onClick={() => window.open('https://www.youtube.com/@lukemikic21', '_blank')}
            >
              Join YouTube
            </Button>
          </div>
          
          {/* Animated down arrow */}
          <div className="flex justify-center mb-2">
            <div className="animate-bounce-slow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="#FF9B76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          
        </div>

        {/* 
        <!-- Newsletter subscription card - Commented out for future use -->
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <!-- Left side - Subscription info -->
              <div className="space-y-4 flex flex-col items-center text-center">
                <div className="flex justify-center items-center">
                  <h2 className="text-6xl font-semi-bold">Subscribe to <br /><span className='font-bold'>LifeNotes</span></h2>
                  <img src="https://cdn-icons-png.flaticon.com/128/16273/16273684.png" alt="Pen" className="h-16 ml-2" />
                </div>
                
                <div className="flex items-center justify-center flex-col">
                  <p className="font-medium">
                    Join a growing community of more than<br />
                    <span className="font-bold">{data.subscribersCount}</span>
                  </p>
                  <div className='flex items-center'>
                    <div className="flex -space-x-2 mr-4">
                      <img src="https://aliabdaal.com/wp-content/uploads/2024/09/Avatars.png" alt="Avatar" className="h-10 w-[80] rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <div className="flex text-yellow-400 text-2xl">
                        ★★★★★
                      </div>
                      <p className="text-xl text-[#8D8A91] font-semibold">{data.reviewsCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Right side - Form -->
              <div className="space-y-4 mx-auto w-full max-w-md">
                <p className="text-gray-700 font-semibold text-xl text-center md:text-left">
                  {data.newsletterSubheading}
                </p>
                
                <form onSubmit={handleSubscribe} className="mt-2">
                  <div className="flex h-[60px] rounded-full overflow-hidden bg-gray-100">
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow rounded-none border-0 bg-gray-100 h-full px-6 focus-visible:ring-0 focus-visible:ring-offset-0 text-[#76737C] font-semibold tracking-wide"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="rounded-full bg-[#5DCDF1] hover:bg-[#1B1624] text-black hover:text-white px-8 h-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : data.newsletterCta}
                    </Button>
                  </div>
                </form>
                
                <p className="text-xs text-gray-500 text-center md:text-left">
                  By submitting this form, you'll be signed up to my free newsletter, which sometimes
                  includes mentions of my books, apps and courses. You can opt-out at any time with no
                  hard feelings. 👍 Here's our <a href="#" className="underline">privacy policy</a> if you like reading.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-gray-50 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600 text-center mb-2">As featured in:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <img src="https://aliabdaal.com/wp-content/uploads/2024/09/image-264.png" alt="Business Insider" className="h-6" />
              <img src="https://aliabdaal.com/wp-content/uploads/2024/09/new_york_times.png" alt="New York Times" className="h-6" />
              <img src="https://aliabdaal.com/wp-content/uploads/2025/01/good-morning-america-logo.png" alt="Good Morning America" className="h-6" />
              <img src="https://aliabdaal.com/wp-content/uploads/2025/01/financial-times.png" alt="Financial Times" className="h-6" />
              <img src="https://aliabdaal.com/wp-content/uploads/2024/09/bbc.png" alt="BBC Radio" className="h-6" />
              <img src="https://aliabdaal.com/wp-content/uploads/2024/09/mens_health.png" alt="Men's Health" className="h-6" />
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
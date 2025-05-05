import { Loader2 } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";
import { useState, useEffect } from "react";

export default function TestimonialsDisplay() {
  const { isLoading } = usePublicTestimonials();
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Izzy Sealey",
      title: "624,000 subscribers",
      headline: "Izzy had never made a video before she took our course.",
      subheadline: "She implemented everything she learned, and her channel has grown to 600k+ subscribers since.",
      image: "/attached_assets/image_1746466644436.png",
      chartImage: "/attached_assets/image_1746466630188.png"
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 bg-white">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }
  
  const currentTestimonial = testimonials[activeIndex];
  
  return (
    <div className="py-16 md:py-24 bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main heading */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
          We've helped Beginners shortcut their YouTube learning curve ✋
        </h2>
        
        {/* Testimonial section */}
        <div className="mt-10">
          {/* Testimonial headline */}
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-5xl font-serif font-bold">
              {currentTestimonial.headline}
            </h3>
            <p className="text-lg mt-6 max-w-3xl mx-auto">
              {currentTestimonial.subheadline}
            </p>
          </div>
          
          {/* Profile and chart */}
          <div className="mb-12">
            {/* Profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Profile picture" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
                <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
              </div>
            </div>
            
            {/* Chart */}
            <div className="w-full">
              <img 
                src="/attached_assets/image_1746466630188.png" 
                alt="Growth chart" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
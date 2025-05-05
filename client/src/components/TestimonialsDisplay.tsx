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
            
            {/* Video testimonial section */}
            <div className="mt-16">
              <div className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-lg">
                {/* Left quote side */}
                <div className="w-full md:w-1/2 bg-[#F9F6F3] p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-lg md:text-xl leading-relaxed mb-8">
                    "I think the content is super helpful, especially for a beginner to really 
                    get an idea of the YouTube landscape and how everything works. 
                    Secondly, the amazing community of creators was something I never 
                    expected and has actually been the most valuable takeaway for me."
                  </p>
                  <div>
                    <p className="font-bold text-lg">Izzy Sealey</p>
                    <p className="text-gray-600">(624,000 Subscribers)</p>
                  </div>
                </div>
                
                {/* Right video side */}
                <div className="w-full md:w-1/2 bg-black relative">
                  <img 
                    src="/attached_assets/image_1746467734537.png" 
                    alt="Izzy Sealey video testimonial" 
                    className="w-full h-full object-cover"
                  />
                  {/* Video controls overlay */}
                  <div className="absolute inset-0">
                    {/* Top label */}
                    <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium py-1 px-2 rounded">
                      Izzy Sealey
                    </div>
                    
                    {/* Play button in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Bottom video controls bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white h-10 flex items-center px-2">
                      {/* Play button */}
                      <button className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                      
                      {/* Current time */}
                      <span className="text-xs mr-2">0:41</span>
                      
                      {/* Progress bar */}
                      <div className="h-1 bg-gray-600 flex-grow mx-2 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-1/3 rounded-full"></div>
                      </div>
                      
                      {/* Total time */}
                      <span className="text-xs mx-2">2:14</span>
                      
                      {/* Volume */}
                      <button className="mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </button>
                      
                      {/* CC button */}
                      <button className="mx-1 text-xs font-bold">
                        CC
                      </button>
                      
                      {/* Settings */}
                      <button className="mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                      </button>
                      
                      {/* Fullscreen */}
                      <button className="mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA button */}
            <div className="mt-16 text-center">
              <button className="bg-[#4fc6e0] hover:bg-[#39b4d0] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md">
                Enrol Now For $995
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
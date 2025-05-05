import { Loader2, Quote as QuoteIcon, PlayCircle } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Types for testimonials
interface Testimonial {
  id: number;
  name: string;
  title?: string;
  quote: string;
  mediaType: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  showMobile: boolean;
  subscriberCount?: number;
  viewCount?: number;
  growthChartUrl?: string;
  hasGrowthChart?: boolean;
  growthChartData?: any;
  annotations?: any[];
  headline?: string;
  subheadline?: string;
}

interface ChartAnnotation {
  x: number;
  y: number;
  text: string;
  number: number;
}

export default function TestimonialsDisplay() {
  const { data: testimonialsData, isLoading: testimonialsLoading } = usePublicTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Default testimonials to use if none are found
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Izzy Sealey",
      title: "624,000 subscribers",
      headline: "Izzy had never made a video before she took our course.",
      subheadline: "She implemented everything she learned, and her channel has grown to 600k+ subscribers since.",
      quote: "I think the content is super helpful, especially for a beginner to really get an idea of the YouTube landscape and how everything works. Secondly, the amazing community of creators was something I never expected and has actually been the most valuable takeaway for me.",
      mediaType: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - replace with actual video
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      hasGrowthChart: true,
      growthChartUrl: "https://placehold.co/800x400/blue/white?text=Growth+Chart",
      showMobile: true
    },
    {
      id: 2,
      name: "Ellie-Jean Royden",
      title: "Body & Style | 243,000 subscribers",
      headline: "Ellie-Jean was (almost) a complete beginner when she joined PTYA.",
      subheadline: "Almost as soon as she started posting, her channel started to take off. She took the course a second time a few months later to consolidate her learnings, and to get more feedback.",
      quote: "I found loads of really great resources through the Academy. It's really helped me to think about capturing everything I see and putting it somewhere I can return to it. I'd recommend others to join because it's such an amazing community.",
      mediaType: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - replace with actual video
      imageUrl: "https://randomuser.me/api/portraits/women/35.jpg",
      hasGrowthChart: true,
      growthChartUrl: "https://placehold.co/800x400/blue/white?text=Growth+Chart",
      annotations: [
        { number: 1, text: "Ellie-Jean learned how to consistently make good videos in Cohort 5", x: 10, y: 60 },
        { number: 2, text: "By the time she joined a second Cohort...", x: 30, y: 40 },
        { number: 3, text: "Her growth was unstoppable.", x: 60, y: 20 }
      ],
      showMobile: true
    }
  ];

  const testimonials = testimonialsData && testimonialsData.length > 0 
    ? testimonialsData 
    : defaultTestimonials;
    
  // Set up autoplay
  useEffect(() => {
    if (autoplay && testimonials.length > 1) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, testimonials.length]);
  
  // Pause autoplay when user interacts
  const pauseAutoplay = () => {
    setAutoplay(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };
  
  if (testimonialsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }
  
  const currentTestimonial = testimonials[activeIndex];
  
  return (
    <div className="relative overflow-hidden pb-16">
      {/* Main carousel */}
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Feature-style testimonial with headline */}
            {currentTestimonial.headline && (
              <div className="text-center mb-8 max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">{currentTestimonial.headline}</h3>
                {currentTestimonial.subheadline && (
                  <p className="text-lg text-gray-700 mb-12">{currentTestimonial.subheadline}</p>
                )}
              </div>
            )}
            
            {/* Growth chart and user info layout */}
            {currentTestimonial.hasGrowthChart ? (
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
                  {/* Author profile section */}
                  <div className="w-full lg:w-auto flex items-center gap-3 mb-4 lg:mb-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={currentTestimonial.imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
                      {currentTestimonial.title && (
                        <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
                      )}
                      {currentTestimonial.viewCount && (
                        <p className="text-sm text-gray-500">{currentTestimonial.viewCount.toLocaleString()} views</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Growth chart with annotations */}
                  <div className="w-full relative">
                    <div className="w-full rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={currentTestimonial.growthChartUrl || "https://placehold.co/800x400/blue/white?text=Growth+Chart"} 
                        alt={`Growth chart for ${currentTestimonial.name}`}
                        className="w-full h-auto"
                      />
                      
                      {/* Render annotations if they exist */}
                      {currentTestimonial.annotations && currentTestimonial.annotations.length > 0 && (
                        <div className="absolute inset-0">
                          {currentTestimonial.annotations.map((annotation: ChartAnnotation, index: number) => (
                            <div 
                              key={index} 
                              className="absolute"
                              style={{ 
                                left: `${annotation.x}%`, 
                                top: `${annotation.y}%` 
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                  {annotation.number}
                                </div>
                                <div className="bg-blue-100 text-blue-800 p-2 rounded-md text-sm font-medium max-w-[220px]">
                                  {annotation.text}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            {/* Testimonial content section */}
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              {/* Video and Quote layout section */}
              {currentTestimonial.mediaType === 'video' && currentTestimonial.videoUrl ? (
                <>
                  <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl overflow-hidden">
                    <div className="relative aspect-video w-full">
                      {/* Video embed */}
                      {currentTestimonial.videoUrl.includes('youtube.com/watch') ? (
                        <iframe
                          src={currentTestimonial.videoUrl.replace('watch?v=', 'embed/')}
                          title={`Testimonial by ${currentTestimonial.name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : currentTestimonial.videoUrl.includes('youtube.com/shorts') ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${currentTestimonial.videoUrl.split('/shorts/')[1].split('?')[0]}`}
                          title={`Testimonial by ${currentTestimonial.name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : currentTestimonial.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${currentTestimonial.videoUrl.split('/').pop()}`}
                          title={`Testimonial by ${currentTestimonial.name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <video
                          src={currentTestimonial.videoUrl}
                          controls
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  </div>
                
                  <div className="w-full md:w-1/2 p-6 bg-gray-50 rounded-2xl">
                    <div className="mb-4">
                      <QuoteIcon size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-800 text-lg mb-6">
                      "{currentTestimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={currentTestimonial.imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{currentTestimonial.name}</p>
                        {currentTestimonial.title && (
                          <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full p-8 bg-white rounded-xl shadow-lg">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={currentTestimonial.imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                        <QuoteIcon size={14} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 text-xl text-center mb-6 font-serif italic">
                    "{currentTestimonial.quote}"
                  </p>
                  
                  <div className="text-center">
                    <h4 className="font-bold text-xl text-blue-800">{currentTestimonial.name}</h4>
                    {currentTestimonial.title && (
                      <p className="text-gray-600">{currentTestimonial.title}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Enroll button */}
        <div className="mt-12">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
            Enrol Now For $995
          </Button>
        </div>
        
        {/* Pagination dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  pauseAutoplay();
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Navigation arrows - only show if more than one testimonial */}
        {testimonials.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => {
                setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                pauseAutoplay();
              }}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
                pauseAutoplay();
              }}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
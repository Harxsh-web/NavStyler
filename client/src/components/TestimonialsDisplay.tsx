import { Loader2, Quote as QuoteIcon } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      name: "Dr Julie Smith",
      title: "Clinical Psychologist",
      quote: "Luke is the absolute master on how to be productive without sacrificing your own happiness. This is the book we've all been waiting for.",
      mediaType: "image",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      showMobile: true
    },
    {
      id: 2,
      name: "Steven Bartlett",
      title: "BBC's Dragon's Den and host of The Diary of a CEO",
      quote: "Luke is the master of productivity. Nobody has a talent for distilling complicated ideas into fun, accessible and actionable insights quite like him.",
      mediaType: "image",
      imageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
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
      }, 6000);
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
  
  return (
    <div className="relative overflow-hidden">
      {/* Main carousel */}
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative mx-auto mb-8">
              {/* Quote icon */}
              <div className="absolute -top-6 -left-6 opacity-10">
                <QuoteIcon size={64} className="text-gray-400" />
              </div>
              
              {/* Testimonial content */}
              <div className="py-10 px-8 bg-white rounded-xl shadow-lg">
                {/* Media - Video or Image */}
                <div className="flex justify-center mb-8">
                  {testimonials[activeIndex].mediaType === 'video' ? (
                    <div className="w-full max-w-[320px] aspect-video rounded-lg overflow-hidden shadow-md">
                      {testimonials[activeIndex].videoUrl && testimonials[activeIndex].videoUrl.includes('youtube.com/watch') ? (
                        <iframe
                          src={testimonials[activeIndex].videoUrl.replace('watch?v=', 'embed/')}
                          title={`Testimonial by ${testimonials[activeIndex].name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : testimonials[activeIndex].videoUrl && testimonials[activeIndex].videoUrl.includes('youtube.com/shorts') ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${testimonials[activeIndex].videoUrl.split('/shorts/')[1].split('?')[0]}`}
                          title={`Testimonial by ${testimonials[activeIndex].name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : testimonials[activeIndex].videoUrl && testimonials[activeIndex].videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${testimonials[activeIndex].videoUrl.split('/').pop()}`}
                          title={`Testimonial by ${testimonials[activeIndex].name}`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : testimonials[activeIndex].videoUrl ? (
                        <video
                          src={testimonials[activeIndex].videoUrl}
                          controls
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          <p className="text-sm text-gray-500">Video unavailable</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={testimonials[activeIndex].imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/100x100?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                        <QuoteIcon size={16} />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quote */}
                <p className="text-gray-800 text-xl text-center mb-6 font-serif italic">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                {/* Author */}
                <div className="text-center">
                  <h4 className="font-bold text-xl text-blue-800">{testimonials[activeIndex].name}</h4>
                  {testimonials[activeIndex].title && (
                    <p className="text-gray-600">{testimonials[activeIndex].title}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Pagination dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
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
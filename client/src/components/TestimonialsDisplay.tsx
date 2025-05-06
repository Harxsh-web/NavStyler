import { Loader2 } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";
import { useState, useEffect } from "react";
import { Testimonial } from "@shared/schema";

// Define interface type for testimonial data in display component
interface TestimonialDisplayItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  headline?: string;
  subheadline?: string;
  imageUrl: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
  growthChartUrl?: string;
  hasGrowthChart?: boolean;
  subscriberCount?: number;
}

// VideoPlayer component with YouTube-style controls
interface VideoPlayerProps {
  name?: string;
  videoSrc?: string;
}

const VideoPlayer = ({ 
  name = "Steven Bartlett", 
  videoSrc = "/attached_assets/image_1746467734537.png" 
}: VideoPlayerProps) => {
  // Check if source is a YouTube URL
  const isYouTubeVideo = videoSrc && (
    videoSrc.includes('youtube.com') || 
    videoSrc.includes('youtu.be') ||
    videoSrc.includes('youtube') ||
    videoSrc.includes('shorts')
  );

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return '';
    
    // Handle youtu.be format
    if (url.includes('youtu.be')) {
      return url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    // Handle youtube.com/shorts format
    if (url.includes('/shorts/')) {
      return url.split('/shorts/')[1]?.split('?')[0];
    }
    
    // Handle regular youtube.com format
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    return match && match[1] ? match[1] : '';
  };

  // Create embed URL for YouTube
  const youtubeEmbedUrl = isYouTubeVideo ? 
    `https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=0&rel=0` : 
    '';

  if (isYouTubeVideo) {
    return (
      <div className="bg-black relative w-full h-full aspect-video">
        <iframe
          src={youtubeEmbedUrl}
          title={`${name} Testimonial Video`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  // Fallback to image display with YouTube-style controls
  return (
    <div className="bg-black relative h-full">
      <img 
        src={videoSrc}
        alt={`${name} video testimonial`} 
        className="w-full h-full object-cover"
      />
      {/* Video controls overlay */}
      <div className="absolute inset-0">
        {/* Top bar with YouTube-style controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center">
            {/* YouTube-style icon */}
            <div className="bg-red-600 w-8 h-6 rounded flex items-center justify-center mr-2">
              <svg viewBox="0 0 24 24" width="16" height="12" fill="white">
                <path d="M10 15L15 12 10 9z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Play button in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-black/30 hover:bg-black/50 w-12 h-12 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
        
        {/* Bottom control bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white flex flex-col">
          {/* Progress bar */}
          <div className="h-1 w-full bg-black">
            <div className="h-full bg-red-600 w-1/3"></div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center">
              {/* Play button */}
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Volume control */}
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
              
              {/* CC button */}
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                  <path d="M8 13h3M15 13h2"></path>
                </svg>
              </button>
              
              {/* Settings */}
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button>
              
              {/* Fullscreen */}
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This component has been integrated directly in the layout

// Growth Chart component with YouTube analytics
const GrowthChart = ({ imageUrl = "/attached_assets/image_1746469561985.png", alt = "YouTube Growth Analytics" }) => {
  return (
    <div className="w-full">
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-auto rounded-md shadow-md border border-gray-200"
      />
    </div>
  );
}

export default function TestimonialsDisplay() {
  // Fetch testimonials from API
  const { data, isLoading } = usePublicTestimonials();
  
  // Set up state for testimonials with an empty array that will be populated from API
  const [testimonials, setTestimonials] = useState<TestimonialDisplayItem[]>([]);
  
  // Update testimonials when data is loaded
  useEffect(() => {
    if (data && data.length > 0) {
      // Map API data to our format
      const formattedTestimonials = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        title: item.title || "YouTube Creator",
        quote: item.quote,
        headline: item.headline || `${item.name} transformed their YouTube channel with our course.`,
        subheadline: item.subheadline || "Learn the strategies that helped creators like them grow their channels.",
        imageUrl: item.imageUrl || "https://randomuser.me/api/portraits/women/65.jpg",
        videoUrl: item.videoUrl || "/attached_assets/image_1746467734537.png",
        mediaType: item.mediaType || "image",
        growthChartUrl: item.growthChartUrl || "/attached_assets/image_1746469561985.png", 
        hasGrowthChart: item.hasGrowthChart || false,
        subscriberCount: item.subscriberCount
      }));
      
      if (formattedTestimonials.length > 0) {
        setTestimonials(formattedTestimonials);
      }
    }
  }, [data]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 bg-[#F9F6F3]">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }
  
  return (
    <div className="py-16 md:py-24 bg-white w-full">
        {/* Main heading */}
      <div className="bg-[#F9F6F3] w-full py-1">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
          We've helped Beginners shortcut their YouTube learning curve <span className="text-amber-500">✋</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        
        {/* All Testimonials - Displayed One Below Another */}
        <div className="mt-10 space-y-24">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-item">
              {/* Testimonial headline */}
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-5xl font-serif font-bold">
                  {testimonial.headline}
                </h3>
                <p className="text-lg mt-6 max-w-3xl mx-auto">
                  {testimonial.subheadline}
                </p>
              </div>
              
              {/* Growth Chart - Using full-width YouTube analytics */}
              {testimonial.hasGrowthChart && (
                <div className="mb-16">
                  <GrowthChart 
                    imageUrl={testimonial.growthChartUrl} 
                    alt={`${testimonial.name}'s YouTube channel growth`} 
                  />
                </div>
              )}

              <div>
              <p className="text-lg  mx-auto font-serif">
              Brandon’s channel has since grown from 700 subs to over 10,000 subs in past 18 months we’ve been working together.
              <br/>
              Brandon saw a 6300% increase in views <b>OVERNIGHT, </b> in the first 12 weeks working together, most importantly, without doing any extra work.
                <br/>


              In the 12 weeks before working with us he was averaging around 90 views per video.
                <br/>
              In the first 12 weeks working together, we averaged 5,700 views per video. 
                <br/>
            <b>  Yes, that’s a 6300% increase in views, overnight.</b>
</p>
              </div>
              
              
              {/* Video testimonial section - matching the provided image layout */}
              <div className="mt-8">
                <div className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-lg bg-[#f8f6f3]">
                  {/* Always show quote on the left, video on the right - like the provided reference image */}
                  <>
                    {/* Left quote side with light background */}
                    <div className="w-full md:w-1/2 bg-[#f8f6f3]">
                      <div className="p-8 md:p-10 flex flex-col justify-center h-full">
                        <p className="text-lg md:text-xl leading-relaxed mb-8">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-gray-600">
                            {testimonial.title || ""}
                            {testimonial.subscriberCount ? `(${testimonial.subscriberCount} subscriber)` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right video side */}
                    <div className="w-full md:w-1/2">
                      <VideoPlayer 
                        name={testimonial.name}
                        videoSrc={testimonial.videoUrl}
                      />
                    </div>
                  </>
                  
                </div>
              </div>
            </div>
          ))}
          
          {/* CTA button */}
          <div className="mt-16 text-center">
            <button className="bg-[#4fc6e0] hover:bg-black hover:text-white text-black px-10 py-3 rounded-full text-lg font-semibold shadow-md">
              Enrol Now For $995
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
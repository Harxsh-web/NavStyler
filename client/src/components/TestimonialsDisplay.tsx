import { Loader2 } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";

export default function TestimonialsDisplay() {
  const { data: testimonialsData, isLoading: testimonialsLoading } = usePublicTestimonials();
  
  if (testimonialsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }
  
  // If no testimonials found or error fetching, show default testimonials
  if (!testimonialsData || testimonialsData.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-center mb-6">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Dr Julie Smith" 
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <p className="text-gray-800 text-lg text-center mb-4">
            Luke is the absolute master on how to be productive without sacrificing your own happiness. This is the book we've all been waiting for.
          </p>
          <div className="text-center">
            <h4 className="font-semibold text-lg">Dr Julie Smith</h4>
            <p className="text-gray-500">Clinical Psychologist</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-center mb-6">
            <img 
              src="https://randomuser.me/api/portraits/men/35.jpg" 
              alt="Steven Bartlett" 
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <p className="text-gray-800 text-lg text-center mb-4">
            Luke is the master of productivity. Nobody has a talent for distilling complicated ideas into fun, accessible and actionable insights quite like him.
          </p>
          <div className="text-center">
            <h4 className="font-semibold text-lg">Steven Bartlett</h4>
            <p className="text-gray-500">BBC's Dragon's Den and host of The Diary of a CEO</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Display testimonials from database with support for videos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonialsData.map((testimonial: any) => (
        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-center mb-6">
            {testimonial.mediaType === 'video' ? (
              <div className="w-full max-w-[240px] aspect-video rounded-lg overflow-hidden">
                {/* Handle YouTube or direct video URLs */}
                {testimonial.videoUrl && testimonial.videoUrl.includes('youtube.com') ? (
                  <iframe
                    src={testimonial.videoUrl.replace('watch?v=', 'embed/')}
                    title={`Testimonial by ${testimonial.name}`}
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : testimonial.videoUrl && testimonial.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonial.videoUrl.split('/').pop()}`}
                    title={`Testimonial by ${testimonial.name}`}
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : testimonial.videoUrl ? (
                  <video 
                    src={testimonial.videoUrl} 
                    controls 
                    className="w-full h-full"
                  ></video>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <p className="text-sm text-gray-500">Video unavailable</p>
                  </div>
                )}
              </div>
            ) : (
              <img 
                src={testimonial.imageUrl || "https://placehold.co/100x100?text=No+Image"} 
                alt={testimonial.name} 
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/100x100?text=No+Image";
                }}
              />
            )}
          </div>
          <p className="text-gray-800 text-lg text-center mb-4">
            {testimonial.quote}
          </p>
          <div className="text-center">
            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
            {testimonial.title && (
              <p className="text-gray-500">{testimonial.title}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
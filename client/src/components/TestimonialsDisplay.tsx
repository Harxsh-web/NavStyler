import { Loader2 } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/use-public-content";

export default function TestimonialsDisplay() {
  const { isLoading } = usePublicTestimonials();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 bg-[#F9F6F3]">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }
  
  return (
    <div className="py-16 md:py-24 bg-[#F9F6F3] w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center">
          We've helped Beginners shortcut their YouTube learning curve ✋
        </h2>
      </div>
    </div>
  );
}
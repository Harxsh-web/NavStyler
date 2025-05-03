import { LandingSection as LandingSectionType } from "@shared/schema";

interface LandingSectionProps {
  data: LandingSectionType;
}

export default function LandingSection({ data }: LandingSectionProps) {
  return (
    <section 
      style={{ backgroundColor: data.backgroundColor || '#F9F6F3' }}
      className="py-12 md:py-16 px-4 md:px-8 mt-0 mb-0"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hey Friends section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
      </div>
    </section>
  );
}
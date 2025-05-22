import img from './attached_assets/growth_chart1.png'
import test2 from './attached_assets/testimonial2.png'
import growthchart from './attached_assets/growth_chart2.png'
import test from './attached_assets/testimonial1.png'
import test4 from './attached_assets/img4.png'
import test3 from './attached_assets/testimonial3.png'

import growth1 from './attached_assets/chart3.png'
import test5 from './attached_assets/img-5.png'
// Define interface type for testimonial data in display component
interface TestimonialDisplayItem {
  id: number;
  name: string;
  title: string;
  quote?: string;
  headline?: string;
  subheadline?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
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
  name = "Testimonial",
  videoSrc
}: VideoPlayerProps) => {
  if (!videoSrc) {
    return null;
  }

  const isYouTubeVideo = videoSrc &&
    (videoSrc.includes('youtube.com') ||
      videoSrc.includes('youtu.be') ||
      videoSrc.includes('youtube') ||
      videoSrc.includes('shorts'));

  const isImage = videoSrc &&
    (videoSrc.endsWith('.jpg') ||
      videoSrc.endsWith('.jpeg') ||
      videoSrc.endsWith('.png') ||
      videoSrc.endsWith('.gif') ||
      videoSrc.endsWith('.webp') ||
      videoSrc.startsWith('/uploads/'));

  const getYouTubeId = (url: string) => {
    if (!url) return '';
    if (url.includes('youtu.be')) {
      return url.split('youtu.be/')[1]?.split('?')[0];
    }
    if (url.includes('/shorts/')) {
      return url.split('/shorts/')[1]?.split('?')[0];
    }
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    return match && match[1] ? match[1] : '';
  };

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

  if (isImage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f8f6f3]">
        <img
          src={videoSrc}
          alt={`${name} testimonial image`}
          className="w-full h-full object-contain max-h-[400px]"
        />
      </div>
    );
  }

  return null;
}

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

// STATIC testimonials data for display
const STATIC_TESTIMONIALS: TestimonialDisplayItem[] = [
  {
    id: 1,
    name: "",
    title: "",
    quote: "Brandon’s channel has since grown from 700 subs to over 10,000 subs in past 18 months we’ve been working together.Brandon saw a 6300% increase in views OVERNIGHT, in the first 12 weeks working together, most importantly, without doing any extra work.In the 12 weeks before working with us he was averaging around 90 views per video.In the first 12 weeks working together, we averaged 5,700 views per video. Yes, that’s a 6300% increase in views, overnight.",
    headline: "Brandon was about to give up on YouTube before working with us.",
    subheadline: "It took Brandon 379 videos, and 3 years to grow to 700 subscribers before working with us in September 2023…",
    imageUrl: test,
    mediaType: "image",
    growthChartUrl: img,
    hasGrowthChart: true,
    subscriberCount: undefined
  },
  {
    id: 2,
    name: "",
    title: "Youtuber Creator",
    quote: "In the 12 weeks before working with us he was averaging around 172 views per video.In the first 8 weeks working together, we averaged 13,000 views per video.",
    headline: "Sean Was Able To Monetise His YouTube Channel Working With Us.",
    subheadline: " ",
    imageUrl: test2,
    videoUrl: "/attached_assets/image_1746467734537.png",
    mediaType: "image",
    hasGrowthChart: false,
    subscriberCount: undefined
  },
  {
    id: 3,
    name: "",
    title: "",
    quote: "After working together again in early 2025, Brandon is now consistently getting 10,000 views per interview and recently passed 5,000 subscribers.We’ve grown from 1,200 subscribers since beginning together in August, while only posting 1 interview every 2 weeks. ",
    headline: "Brandon’s Become One of The Fastest Growing Channels In His Niche. ",
    subheadline: "Brandon had been grinding for 2 years before we did a 90 day accelerator course with him in September 2024. ",
    imageUrl: test3,
    videoUrl: "https://youtu.be/9bZkp7q19f0",
    mediaType: "image",
    growthChartUrl: growthchart,
    hasGrowthChart: true,
    subscriberCount: undefined
  },
  {
    id: 4,
    name: "",
    title: "",
    quote: "Brandon now is getting the most view per interview in the Bitcoin space, despite being 20x smaller than other competitors in the space.  ",
    headline: " ",
    subheadline: " ",
    imageUrl: test4,
    videoUrl: "https://youtu.be/9bZkp7q19f0",
    mediaType: "image",
    hasGrowthChart: false,
    subscriberCount: undefined
  },
    {
    id: 5,
    name: "",
    title: "",
    // quote omitted
    headline: " ",
    subheadline: "",
    // imageUrl omitted
    // videoUrl omitted
    mediaType: "image",
    growthChartUrl: growth1,
    hasGrowthChart: true,
    subscriberCount: undefined
  },
  {
    id: 6,
    name: "",
    title: "",
    // quote omitted
    headline: " Simply Bitcoin Came To Me in August 2024, wanting to jump from the 4th to biggest creator in their space.",
    subheadline: "I began working with Simply Bitcoin in August of 2024, and at the time they were getting around 350,000 views per month, and 700 subscribers for the month. ",
    // imageUrl omitted
    // videoUrl omitted
    mediaType: "image",
    growthChartUrl: test5,
    hasGrowthChart: true,
    subscriberCount: undefined
  },
 

];

// Static section data (optional)
const STATIC_SECTION_TITLE = "We've helped Beginners shortcut their YouTube learning curve";

export default function Testimonials() {
  const testimonials = STATIC_TESTIMONIALS;
  const sectionTitle = STATIC_SECTION_TITLE;

  return (
    <div className="py-16 md:py-24 bg-white w-full">
      <div className="bg-[#F9F6F3] w-full py-1">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
          {sectionTitle} <span className="text-amber-500">✋</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mt-10 space-y-24">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-item">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-5xl font-serif font-bold">
                  {testimonial?.headline || "Brandon was about to give up on YouTube before working with us."}
                </h3>
                <p className="text-lg mt-6 max-w-3xl mx-auto">
                  {testimonial?.subheadline}
                </p>
              </div>
              {testimonial.hasGrowthChart && (
                <div className="mb-16">
                  <GrowthChart
                    imageUrl={testimonial.growthChartUrl}
                    alt={`${testimonial.name}'s YouTube channel growth`}
                  />
                </div>
              )}
              {(testimonial.quote || testimonial.imageUrl || testimonial.videoUrl) && (
                <div className="mt-8">
                  <div className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-lg bg-[#f8f6f3]">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-full md:w-1/2 bg-[#f8f6f3]">
                          <div className="p-8 md:p-10 flex flex-col justify-center h-full">
                            {testimonial.quote && (
                              <p className="text-lg md:text-xl leading-relaxed mb-8">
                                {testimonial.quote}
                              </p>
                            )}
                            <div>
                              {testimonial.name && (
                                <p className="font-bold text-lg">{testimonial.name}</p>
                              )}
                              {(testimonial.title || testimonial.subscriberCount) && (
                                <p className="text-gray-600">
                                  {testimonial.title || ""}
                                  {testimonial.subscriberCount ? ` (${testimonial.subscriberCount} subscriber${testimonial.subscriberCount !== 1 ? 's' : ''})` : ""}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {(testimonial.imageUrl || testimonial.videoUrl) && (
                          <div className="w-full md:w-1/2">
                            <VideoPlayer
                              name={testimonial.name}
                              videoSrc={testimonial.mediaType === 'image'
                                ? testimonial.imageUrl
                                : testimonial.videoUrl}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {(testimonial.imageUrl || testimonial.videoUrl) && (
                          <div className="w-full md:w-1/2">
                            <VideoPlayer
                              name={testimonial.name}
                              videoSrc={testimonial.mediaType === 'image'
                                ? testimonial.imageUrl
                                : testimonial.videoUrl}
                            />
                          </div>
                        )}
                        <div className="w-full md:w-1/2 bg-[#f8f6f3]">
                          <div className="p-8 md:p-10 flex flex-col justify-center h-full">
                            {testimonial.quote && (
                              <p className="text-lg md:text-xl leading-relaxed mb-8">
                                {testimonial.quote}
                              </p>
                            )}
                            <div>
                              {testimonial.name && (
                                <p className="font-bold text-lg">{testimonial.name}</p>
                              )}
                              {(testimonial.title || testimonial.subscriberCount) && (
                                <p className="text-gray-600">
                                  {testimonial.title || ""}
                                  {testimonial.subscriberCount ? ` (${testimonial.subscriberCount} subscriber${testimonial.subscriberCount !== 1 ? 's' : ''})` : ""}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-16 text-center">
            <a
              href="/checkout"
              className="bg-[#4fc6e0] hover:bg-black hover:text-white text-black px-10 py-3 rounded-full text-lg font-semibold shadow-md inline-block"
            >
              Enrol Now For $995
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
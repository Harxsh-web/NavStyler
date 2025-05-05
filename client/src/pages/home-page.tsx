import Footer from "@/components/Footer";
import { FaAward, FaBook } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { Loader2 } from "lucide-react";
import { 
  usePublicLandingSection,
  usePublicHeroSection, 
  usePublicQuoteSection, 
  usePublicAboutBookSection,
  usePublicAuthorSection,
  usePublicBonusSection,
  usePublicBonusItems,
  usePublicGuaranteeSection,
  usePublicScholarshipSection,
  usePublicYoutubeFrameworkSection,
  usePublicQuestionsSection
} from "@/hooks/use-public-content";
import { BonusItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import TestimonialsDisplay from "@/components/TestimonialsDisplay";
import BonusSection from "@/components/BonusSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import ScholarshipSection from "@/components/ScholarshipSection";
import YoutubeFrameworkSection from "@/components/YoutubeFrameworkSection";
import QuestionsSection from "@/components/QuestionsSection";
import LandingSection from "@/components/LandingSection";

export default function HomePage() {
  // Fetch data from the API
  const { data: landingData, isLoading: landingLoading } = usePublicLandingSection();
  const { data: heroData, isLoading: heroLoading } = usePublicHeroSection();
  const { data: quoteData, isLoading: quoteLoading } = usePublicQuoteSection();
  const { data: authorData, isLoading: authorLoading } = usePublicAuthorSection();
  const { data: bonusSectionData, isLoading: bonusSectionLoading } = usePublicBonusSection();
  const { data: bonusItemsData, isLoading: bonusItemsLoading } = usePublicBonusItems();
  const { data: guaranteeSectionData, isLoading: guaranteeSectionLoading } = usePublicGuaranteeSection();
  const { data: scholarshipSectionData, isLoading: scholarshipSectionLoading } = usePublicScholarshipSection();
  const { data: youtubeFrameworkSectionData, isLoading: youtubeFrameworkSectionLoading } = usePublicYoutubeFrameworkSection();
  const { data: questionsSectionData, isLoading: questionsSectionLoading } = usePublicQuestionsSection();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Landing Section */}
        {landingLoading ? (
          <div className="flex justify-center items-center py-20 bg-[#F9F6F3]">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : landingData ? (
          <LandingSection data={landingData} />
        ) : null}
        
        {/* Author Section */}
        <section id="author-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <TbHeartHandshake className="text-cyan-500 text-4xl mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2">About The Author</h2>
            </div>

            {authorLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
                <div className="md:w-1/3 relative">
                  {/* Circular background with accent */}
                  <div className="absolute w-full h-full rounded-full bg-[#5DCDF1] transform translate-x-2 translate-y-2">
                    {/* Curved accent line */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-[10%]">
                      <svg width="20" height="80" viewBox="0 0 20 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2C8 2 2 20 2 40C2 60 8 78 18 78" stroke="#5DCDF1" strokeWidth="4" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {/* Curved accent for bottom right */}
                    <div className="absolute right-0 bottom-5 transform translate-x-[30%]">
                      <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 38C15 38 35 32 48 2" stroke="#5DCDF1" strokeWidth="4" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Author image */}
                  <div className="relative z-10 overflow-hidden rounded-full aspect-square">
                    <img 
                      src={authorData?.imageUrl || "https://randomuser.me/api/portraits/men/44.jpg"} 
                      alt={authorData?.name || "Luke Mikic"} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-3xl font-bold mb-6 text-[#1a202c] relative inline-block">
                    {authorData?.name || "Luke Mikic"}
                    <span className="absolute bottom-0 left-0 h-1 bg-[#5DCDF1] w-3/4"></span>
                  </h3>
                  
                  <div className="text-gray-700 space-y-5 leading-relaxed">
                    {authorData?.bio ? (
                      <div className="prose prose-lg max-w-none">
                        {/* Replace text pattern with styled version */}
                        {authorData.bio.split(/\*\*(.*?)\*\*/g).map((part, index) => 
                          index % 2 === 0 ? (
                            <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
                          ) : (
                            <span key={index} className="font-semibold text-[#5DCDF1]">{part}</span>
                          )
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-[#1a202c]">
                          Luke Mikic is a doctor, entrepreneur, amateur magician, and the world's most-followed productivity expert.
                        </p>
                        <div className="pl-4 border-l-4 border-[#5DCDF1] italic">
                          <p className="text-gray-700">
                            "I'm passionate about helping people escape the 9-5 grind and build the YouTube career of their dreams."
                          </p>
                        </div>
                        <p>
                          Luke became intrigued by the science of productivity while juggling the demands of medical training at Cambridge University with building his business. While working as a doctor in the UK's National Health Service, Luke started to document his journey towards living a healthier, happier, more productive life online.
                        </p>
                        <p>
                          In the years since, Luke's <span className="font-semibold text-[#5DCDF1]">evidence-based videos, podcasts and articles</span> about the human mind have reached hundreds of millions of people all around the world.
                        </p>
                        <p className="font-medium">
                          In 2021, Luke took a break from his medical career to focus on creating content. He now runs a team of 20+ people across his businesses, helping millions of people live happier, healthier, and more productive lives.
                        </p>
                      </>
                    )}
                    
                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href="https://www.youtube.com/@lukemikic21"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 bg-[#5DCDF1] text-white rounded-md hover:bg-[#4BAAD8] transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube Channel
                      </a>
                      <a
                        href="#bonus-section" 
                        className="inline-flex items-center px-4 py-2 border border-[#5DCDF1] text-[#5DCDF1] rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Hero Section */}
        <section id="book-section" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            {heroLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                  <div className="mb-6">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                      {/* Use dynamic content or fallback if not available */}
                      {heroData?.title || "Feel-Good"} <span className="text-black relative inline-block">
                       
                      </span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-8">
                      {heroData?.subtitle || "The science-based guide to achieving more while feeling good in the process."}
                    </h2>
                  </div>
                  
                  {/* <div className="flex flex-wrap gap-4 items-center mb-8">
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/63a6770e3e6bcc9e7c6aaa9ad9f3f0f9.png" alt="New York Times" className="h-6" />
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/ca22e1850226ddb886bc2cf69290c8dc.png" alt="Sunday Times" className="h-6" />
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/adf7bc3af650d4fefbd310e1cebf6d6e.png" alt="Financial Times" className="h-6" />
                  </div> */}
                  
                  <div className="flex items-center gap-4">
                    <a
                      href={heroData?.buttonUrl || "/checkout"} 
                      className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                      {heroData?.buttonText || "Get the Book"}
                    </a>
                    <a href="#bonus-section" className="text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200">
                      Learn More
                    </a>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="bg-amber-100 rounded-xl p-4 max-w-md mx-auto">
                    <img 
                      src={heroData?.imageUrl || "https://images.squarespace-cdn.com/content/v1/60bd6ea1c39d1e35837d56c1/f1d4b73c-8a28-4854-9b0e-6291a3e86410/FeelGoodProductivityCover.jpg"} 
                      alt="Feel-Good Productivity Book Cover" 
                      className="w-full h-auto rounded-lg shadow-md"
                      onError={(e) => {
                        console.error("Failed to load hero image:", heroData?.imageUrl);
                        // Fallback to default image if the hero image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.squarespace-cdn.com/content/v1/60bd6ea1c39d1e35837d56c1/f1d4b73c-8a28-4854-9b0e-6291a3e86410/FeelGoodProductivityCover.jpg";
                      }}
                    />
                    {/* Debug: Show image URL for troubleshooting */}
                    <div className="mt-2 text-xs text-gray-500 hidden">
                      Image source: {heroData?.imageUrl}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4 max-w-4xl">
            {quoteLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              </div>
            ) : (
              <blockquote className="text-center">
                <p className="text-xl md:text-3xl font-medium italic text-gray-800 mb-4">
                  "{quoteData?.text || "Productivity isn't about how much you do, it's about how"} <span className="relative inline-block">
                    good
                    <span className="absolute bottom-1 left-0 w-full h-1.5 bg-yellow-300"></span>
                  </span> {quoteData?.text2 || "you feel about what you're doing."}"
                </p>
                <cite className="text-gray-600 text-lg font-normal">— {quoteData?.author || "Luke Mikic"}</cite>
              </blockquote>
            )}
          </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What people are saying...</h2>
            
            <TestimonialsDisplay />
          </div>
        </section>

        
        {/* Bonus Section */}
        {!bonusSectionLoading && !bonusItemsLoading && (
          <BonusSection 
            bonusSection={bonusSectionData} 
            bonusItems={bonusItemsData?.sort((a: BonusItem, b: BonusItem) => ((a.order || 0) - (b.order || 0)))} 
          />
        )}

        {/* Guarantee Section */}
        {!guaranteeSectionLoading && (
          <GuaranteeSection
            guaranteeSection={guaranteeSectionData}
          />
        )}
        
        {/* YouTube Framework Section */}
        {!youtubeFrameworkSectionLoading && (
          <YoutubeFrameworkSection
            youtubeFrameworkSection={youtubeFrameworkSectionData}
          />
        )}

        {/* Scholarship Section */}
        {!scholarshipSectionLoading && (
          <ScholarshipSection 
            scholarshipSection={scholarshipSectionData}
          />
        )}
        
        {/* Questions Section */}
        {!questionsSectionLoading && (
          <QuestionsSection 
            questionsSection={questionsSectionData}
          />
        )}
        {/* About Book Section */}
        {/* <section className="py-16 bg-white" id="learn-more">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center mb-10">
              <FaBook className="text-cyan-500 text-4xl mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                About <span className="relative inline-block">
                  Feel-Good Productivity
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-cyan-400"></span>
                </span>
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/5">
                <div className="sticky top-8">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/60bd6ea1c39d1e35837d56c1/f1d4b73c-8a28-4854-9b0e-6291a3e86410/FeelGoodProductivityCover.jpg" 
                    alt="Feel-Good Productivity Book Cover" 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>
              
              <div className="md:w-3/5">
                <h3 className="text-2xl font-bold mb-5">Introduction</h3>
                <h4 className="text-xl font-semibold mb-3">The Art & Science of Feel-Good Productivity</h4>
                <p className="text-gray-700 mb-6">
                  Luke shares his journey from stressed-out doctor to successful entrepreneur, and how he discovered the science of Feel-Good Productivity. You'll understand the psychological and neuroscientific evidence for why positive emotions fuel success, and explore how <span className="italic">feeling good</span> in your work can boost your energy, reduce your stress, and enrich your life.
                </p>
                
                <h3 className="text-2xl font-bold mb-5">Part 1</h3>
                <h4 className="text-xl font-semibold mb-3">Energise</h4>
                <p className="text-gray-700 mb-6">
                  Luke shares the three fundamental energizers that make us feel good and lead to true productivity. You'll discover the strategies that Nobel laureates and trailblazing founders of multimillion-dollar enterprises use to maintain motivation and outperform expectations, all by finding the fun in their projects.
                </p>
                
                <h3 className="text-2xl font-bold mb-5">Part 2</h3>
                <h4 className="text-xl font-semibold mb-3">Unblock</h4>
                <p className="text-gray-700 mb-6">
                  This section outlines a groundbreaking method for beating procrastination that <span className="italic">doesn't</span> rely on temporary motivation or painful discipline. You'll learn about the three biggest blockers that run down our feel-good emotions and so derail our productivity – as well as the simple strategies you can use to stay focused and consistent.
                </p>
                
                <div className="mt-8">
                  <a 
                    href={heroData?.buttonUrl || "#buy"} 
                    className="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-200 inline-block"
                  >
                    {heroData?.buttonText || "Get the Book"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
         */}
     
      </main>
      
      <Footer />
    </div>
  );
}
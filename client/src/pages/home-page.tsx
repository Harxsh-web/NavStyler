import Footer from "@/components/Footer";
import { FaAward } from "react-icons/fa";
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
                  <h3 className="text-2xl font-bold mb-4">{authorData?.name || "Luke Mikic"}</h3>
                  <div className="text-gray-700 space-y-4">
                    {authorData?.bio ? (
                      <div dangerouslySetInnerHTML={{ __html: authorData.bio }} className="prose prose-lg max-w-none" />
                    ) : (
                      <>
                        <p>
                        there is no data available for the author bio.
                        </p>
                      
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-0 bg-white">
          <TestimonialsDisplay />
        </section>
        
        {/* Hero Section Removed */}
        
        {/* Quote Section removed as requested */}

        
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
        {/* About Book Section - Removed */}
     
      </main>
      
      <Footer />
    </div>
  );
}
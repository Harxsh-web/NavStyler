import Footer from "@/components/Footer";
import { FaAward, FaBook } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { Loader2 } from "lucide-react";
import { 
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
import { Button } from "@/components/ui/button";
import TestimonialsDisplay from "@/components/TestimonialsDisplay";
import BonusSection from "@/components/BonusSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import ScholarshipSection from "@/components/ScholarshipSection";
import YoutubeFrameworkSection from "@/components/YoutubeFrameworkSection";
import QuestionsSection from "@/components/QuestionsSection";

// This component is identical to HomePage but will be accessed via the /my-book route
export default function BookPage() {
  // Fetch data from the API
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
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            {heroLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                  <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      {heroData?.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      {heroData?.subtitle}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full py-6 px-8 shadow-lg transition transform hover:scale-105"
                      asChild
                    >
                      <a href={heroData?.ctaLink} target="_blank" rel="noopener noreferrer">
                        {heroData?.ctaText}
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  {heroData?.imageUrl && (
                    <div className="relative">
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg blur-lg opacity-60 animate-pulse"></div>
                      <img 
                        src={heroData.imageUrl} 
                        alt="Luke Mikic YouTube Course"
                        className="relative z-10 rounded-lg shadow-2xl max-w-full h-auto max-h-[500px] object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsDisplay />

        {/* YouTube Framework Section */}
        {youtubeFrameworkSectionLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          youtubeFrameworkSectionData && (
            <YoutubeFrameworkSection data={youtubeFrameworkSectionData} />
          )
        )}

        {/* Bonus Section */}
        {bonusSectionLoading || bonusItemsLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          bonusSectionData && bonusItemsData && (
            <BonusSection 
              sectionData={bonusSectionData} 
              bonusItems={bonusItemsData}
            />
          )
        )}

        {/* Guarantee Section */}
        {guaranteeSectionLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          guaranteeSectionData && (
            <GuaranteeSection data={guaranteeSectionData} />
          )
        )}

        {/* Scholarship Section */}
        {scholarshipSectionLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          scholarshipSectionData && (
            <ScholarshipSection data={scholarshipSectionData} />
          )
        )}

        {/* Questions Section */}
        {questionsSectionLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          questionsSectionData && (
            <QuestionsSection data={questionsSectionData} />
          )
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your YouTube Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of successful creators who have transformed their online presence.
            </p>
            {heroData && (
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full py-6 px-10 shadow-xl transition transform hover:scale-105"
                asChild
              >
                <a href={heroData?.ctaLink} target="_blank" rel="noopener noreferrer">
                  {heroData?.ctaText}
                </a>
              </Button>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
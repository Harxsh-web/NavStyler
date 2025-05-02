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
import { useEffect } from "react";

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
  
  // Set the page title
  useEffect(() => {
    document.title = "Luke Mikic - YouTube Masterclass";
  }, []);
  
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
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-gray-900">
                      {heroData?.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700">
                      {heroData?.subtitle}
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      className="font-bold text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <a href={heroData?.ctaLink || "#buy"}>
                        {heroData?.ctaText || "Enroll Now - $995"}
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  {heroData?.imageUrl && (
                    <img 
                      src={heroData.imageUrl} 
                      alt="Book Cover" 
                      className="rounded-lg shadow-xl w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Author & About Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            {authorLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              </div>
            ) : authorData ? (
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  {authorData?.name}
                </h2>
                <div className="max-w-3xl prose prose-lg" dangerouslySetInnerHTML={{ __html: authorData?.bio || "" }} />
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="font-medium"
                    asChild
                  >
                    <a href="https://www.youtube.com/@LukeMikic/featured" target="_blank" rel="noopener noreferrer">
                      Join 270k+ subscribers
                    </a>
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* YouTube Framework Section */}
        {!youtubeFrameworkSectionLoading && (
          <YoutubeFrameworkSection
            youtubeFrameworkSection={youtubeFrameworkSectionData}
          />
        )}

        {/* Quote Section */}
        {quoteLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : quoteData && Object.keys(quoteData).length > 0 ? (
          <section className="py-16 md:py-24 bg-gray-900 text-white">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <blockquote className="text-2xl md:text-3xl italic font-medium mb-8">
                "{quoteData.text}"
              </blockquote>
              <p className="text-xl font-bold">— {quoteData.author}</p>
            </div>
          </section>
        ) : null}

        {/* Testimonials Display */}
        <TestimonialsDisplay />

        {/* Subscribe Button */}
        <section className="py-16 bg-gray-50 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Ready to improve your life with the YouTube Masterclass method?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="font-bold text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a href="#buy">
                  Enroll Now - $995
                </a>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="font-medium px-8 py-6"
                asChild
              >
                <a href="https://www.youtube.com/@LukeMikic/featured" target="_blank" rel="noopener noreferrer">
                  Join 270k+ subscribers
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Bonus Section */}
        {!bonusSectionLoading && !bonusItemsLoading && (
          <BonusSection 
            bonusSection={bonusSectionData} 
            bonusItems={bonusItemsData?.sort((a: any, b: any) => (a.orderIndex || 0) - (b.orderIndex || 0))} 
          />
        )}

        {/* Guarantee Section */}
        {!guaranteeSectionLoading && (
          <GuaranteeSection
            guaranteeSection={guaranteeSectionData}
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
      </main>
      <Footer />
    </div>
  );
}
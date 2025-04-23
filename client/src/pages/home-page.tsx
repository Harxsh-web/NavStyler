import Footer from "@/components/Footer";
import { FaAward, FaBook } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { Loader2, RefreshCw } from "lucide-react";
import { 
  usePublicHeroSection, 
  usePublicQuoteSection, 
  usePublicLearningPoints,
  usePublicTestimonials,
  usePublicAboutBookSection,
  usePublicAuthorSection,
  useRefreshPublicContent
} from "@/hooks/use-public-content";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // Fetch data from the API
  const { data: heroData, isLoading: heroLoading } = usePublicHeroSection();
  const { data: quoteData, isLoading: quoteLoading } = usePublicQuoteSection();
  const { data: authorData, isLoading: authorLoading } = usePublicAuthorSection();
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
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                      {/* Use dynamic content or fallback if not available */}
                      {heroData?.title || "Feel-Good"} <span className="text-black relative inline-block">
                        Productivity
                        <span className="absolute bottom-1 left-0 w-full h-1.5 bg-cyan-400"></span>
                      </span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-8">
                      {heroData?.subtitle || "The science-based guide to achieving more while feeling good in the process."}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center mb-8">
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/63a6770e3e6bcc9e7c6aaa9ad9f3f0f9.png" alt="New York Times" className="h-6" />
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/ca22e1850226ddb886bc2cf69290c8dc.png" alt="Sunday Times" className="h-6" />
                    <img src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/10/adf7bc3af650d4fefbd310e1cebf6d6e.png" alt="Financial Times" className="h-6" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a href="#buy" className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200">
                      {heroData?.ctaText || "Get the Book"}
                    </a>
                    <a href="#learn-more" className="text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200">
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
                    />
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
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">10 Things This Book Will Teach You</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                This book is your guide to achieving more without sacrificing your happiness and wellbeing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  num: 1,
                  title: "The Energize Framework",
                  description: "Discover the three fundamental energizers that make us feel good and lead to true productivity."
                },
                {
                  num: 2,
                  title: "Beating Procrastination",
                  description: "Learn a groundbreaking method for beating procrastination that doesn't rely on temporary motivation or painful discipline."
                },
                {
                  num: 3,
                  title: "Emotional regulation",
                  description: "Understand the psychological and neuroscientific evidence for why positive emotions fuel success."
                },
                {
                  num: 4,
                  title: "Finding joy in work",
                  description: "Learn how feeling good in your work can boost your energy, reduce stress, and enrich your life."
                },
                {
                  num: 5,
                  title: "Practical strategies",
                  description: "Get simple, actionable techniques you can use to stay focused and consistent with your goals."
                },
                {
                  num: 6,
                  title: "Motivation mastery",
                  description: "Learn the strategies used by Nobel laureates and trailblazing founders to maintain motivation."
                },
                {
                  num: 7,
                  title: "Combating blockers",
                  description: "Identify the three biggest blockers that run down your feel-good emotions and derail productivity."
                },
                {
                  num: 8,
                  title: "Sustainable progress",
                  description: "Create systems for consistent progress that don't rely on willpower or burnout-inducing work habits."
                },
                {
                  num: 9,
                  title: "Applying science",
                  description: "Apply evidence-based techniques from psychology and neuroscience to your daily work routine."
                },
                {
                  num: 10,
                  title: "Life transformation",
                  description: "Transform not just how you work, but how you approach your entire life for greater fulfillment."
                }
              ].map((item) => (
                <div key={item.num} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded-full mb-3 inline-block">
                    #{item.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What people are saying...</h2>
            
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
                  Ali is the absolute master on how to be productive without sacrificing your own happiness. This is the book we've all been waiting for.
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
                  Ali is the master of productivity. Nobody has a talent for distilling complicated ideas into fun, accessible and actionable insights quite like him.
                </p>
                <div className="text-center">
                  <h4 className="font-semibold text-lg">Steven Bartlett</h4>
                  <p className="text-gray-500">BBC's Dragon's Den and host of The Diary of a CEO</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Book Section */}
        <section className="py-16 bg-white" id="learn-more">
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
                  Ali shares the three fundamental energizers that make us feel good and lead to true productivity. You'll discover the strategies that Nobel laureates and trailblazing founders of multimillion-dollar enterprises use to maintain motivation and outperform expectations, all by finding the fun in their projects.
                </p>
                
                <h3 className="text-2xl font-bold mb-5">Part 2</h3>
                <h4 className="text-xl font-semibold mb-3">Unblock</h4>
                <p className="text-gray-700 mb-6">
                  This section outlines a groundbreaking method for beating procrastination that <span className="italic">doesn't</span> rely on temporary motivation or painful discipline. You'll learn about the three biggest blockers that run down our feel-good emotions and so derail our productivity – as well as the simple strategies you can use to stay focused and consistent.
                </p>
                
                <div className="mt-8">
                  <a href="#buy" className="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-200 inline-block">
                    Get the Book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Author Section */}
        <section className="py-16 bg-gray-50">
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
                <div className="md:w-1/3">
                  <img 
                    src={authorData?.imageUrl || "https://images.squarespace-cdn.com/content/v1/612d6a724e45b00a001f2501/1650285544747-5YVXL8ZSVBGXFUTK85EN/Ali_Abdaal_Headshots_30.jpg"} 
                    alt={authorData?.name || "Luke Mikic"} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{authorData?.name || "Luke Mikic"}</h3>
                  <div className="text-gray-700 space-y-4">
                    {authorData?.bio ? (
                      <div dangerouslySetInnerHTML={{ __html: authorData.bio }} />
                    ) : (
                      <>
                        <p>
                          Luke Mikic is a doctor, entrepreneur, amateur magician, and the world's most-followed productivity expert.
                        </p>
                        <p>
                          Ali became intrigued by the science of productivity while juggling the demands of medical training at Cambridge University with building his business. While working as a doctor in the UK's National Health Service, Ali started to document his journey towards living a healthier, happier, more productive life online. In the years since, Ali's evidence-based videos, podcasts and articles about the human mind have reached hundreds of millions of people all around the world.
                        </p>
                        <p>
                          In 2021, Ali took a break from his medical career to focus on creating content. He now runs a team of 20+ people across his businesses, helping millions of people live happier, healthier, and more productive lives.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
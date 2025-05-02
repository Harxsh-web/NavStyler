import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect } from "react";
import { 
  usePublicArticles,
  usePublicVideos,
  usePublicSiteSettings
} from "@/hooks/use-public-content";
import { FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

export default function HomePage() {
  // Fetch data from the API
  const { data: articlesData, isLoading: articlesLoading } = usePublicArticles();
  const { data: videosData, isLoading: videosLoading } = usePublicVideos();
  const { data: siteSettings, isLoading: settingsLoading } = usePublicSiteSettings();
  
  // Set the page title
  useEffect(() => {
    document.title = "Luke Mikic - Home";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  Luke Mikic
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8">
                  YouTube Creator, Entrepreneur, and Digital Nomad
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="font-medium px-8 py-6"
                    asChild
                  >
                    <Link href="/my-book">
                      YouTube Masterclass
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="font-medium px-8 py-6"
                    asChild
                  >
                    <a href="https://www.youtube.com/@LukeMikic/featured" target="_blank" rel="noopener noreferrer">
                      Watch My Videos
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/uploads/1745867607892-571912983.jpg" 
                  alt="Luke Mikic" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Me</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                I'm Luke Mikic, a seasoned YouTube creator and entrepreneur who's passionate about helping others escape the 9-5 grind and build successful online businesses.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                After quitting my job to pursue content creation full-time, I've built a community of over 270,000 subscribers and developed proven strategies to help others succeed on YouTube.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                My mission is to empower aspiring creators with the knowledge and skills they need to build successful YouTube channels that generate passive income and create freedom in their lives.
              </p>
              <div className="mt-8 text-center">
                <Button 
                  size="lg"
                  className="font-medium"
                  asChild
                >
                  <Link href="/my-book">
                    Learn About My YouTube Masterclass
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Videos Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Recent Videos</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>
            
            {videosLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videosData?.slice(0, 3).map((video: any) => (
                  <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    {video.thumbnailUrl && (
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">{video.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{video.description}</p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        asChild
                      >
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          Watch Now
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Button 
                variant="outline"
                size="lg"
                className="font-medium"
                asChild
              >
                <a href="https://www.youtube.com/@LukeMikic/videos" target="_blank" rel="noopener noreferrer">
                  View All Videos
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Articles Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Recent Articles</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>
            
            {articlesLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articlesData?.slice(0, 4).map((article: any) => (
                  <div key={article.id} className="bg-gray-50 rounded-lg p-6 shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                      asChild
                    >
                      <a href={article.url || "#"}>
                        Read More →
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your YouTube journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Learn my proven strategies to quit your 9-5 and succeed on YouTube with my comprehensive masterclass.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="font-medium px-8 py-6 bg-white text-blue-700 hover:bg-gray-100"
              asChild
            >
              <Link href="/my-book">
                Explore the Masterclass
              </Link>
            </Button>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Connect With Me</h2>
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.youtube.com/@LukeMikic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                <FaYoutube size={40} />
              </a>
              <a 
                href="https://twitter.com/lukemikic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={40} />
              </a>
              <a 
                href="https://www.instagram.com/lukemikic/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaInstagram size={40} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Article, Video } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useSiteSettings } from "@/hooks/use-site-settings";

export default function NotFound() {
  const { data: siteSettings } = useSiteSettings();
  
  // Fetch recent articles
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/content/articles"],
    queryFn: async () => {
      const res = await fetch("/api/content/articles?limit=3");
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    }
  });
  
  // Fetch recent videos
  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ["/api/content/videos"],
    queryFn: async () => {
      const res = await fetch("/api/content/videos?limit=3");
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    }
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, 
          or never existed.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      {/* Recent Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        {/* Recent Articles */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Recent Articles</h3>
          <div className="space-y-6">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="border border-border rounded-lg p-5 hover:shadow-md transition">
                  <a 
                    href={article.slug ? `/articles/${article.slug}` : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium group-hover:text-primary transition">
                        {article.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {article.excerpt || "No excerpt available"}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.publishedAt ? (
                        <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                      ) : (
                        <span>Date not available</span>
                      )}
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No articles found</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Videos */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Recent Videos</h3>
          <div className="space-y-6">
            {videos && videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                  {video.thumbnailUrl && (
                    <div className="relative aspect-video">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-600">
                        Watch Video 
                      </Badge>
                    </div>
                  )}
                  <div className="p-4">
                    <a 
                      href={video.videoUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h4 className="text-lg font-medium group-hover:text-primary transition line-clamp-2 mb-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {video.publishedAt ? (
                          <span>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
                        ) : (
                          <span>Date not available</span>
                        )}
                      </div>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No videos found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      {siteSettings?.enableNewsletter === "true" && (
        <div className="mt-24 bg-muted p-8 rounded-lg">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-3">Join the Newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest articles, videos, and resources delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
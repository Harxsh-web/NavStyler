import { useEffect, useState } from "react";
import { SeoMetadata } from "@shared/schema";
import { useLocation } from "wouter";

interface SEOHeadProps {
  pagePath?: string;
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

export function SEOHead({ 
  pagePath,
  title,
  description,
  image,
  children
}: SEOHeadProps) {
  const [location] = useLocation();
  const [metadata, setMetadata] = useState<SeoMetadata | null>(null);
  const path = pagePath || location;
  
  // Fetch SEO metadata for the current page
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const encodedPath = encodeURIComponent(path);
        const response = await fetch(`/api/seo/page/${encodedPath}`);
        
        if (response.ok) {
          const data: SeoMetadata = await response.json();
          setMetadata(data);
        } else {
          // If no specific metadata is found for this page, try to get the default
          const defaultResponse = await fetch('/api/seo/default');
          if (defaultResponse.ok) {
            const defaultData: SeoMetadata = await defaultResponse.json();
            setMetadata(defaultData);
          }
        }
      } catch (error) {
        console.error("Error fetching SEO metadata:", error);
      }
    };
    
    fetchMetadata();
  }, [path]);
  
  // Set document title based on metadata or props
  useEffect(() => {
    const pageTitle = title || metadata?.metaTitle || "Feel-Good Productivity - Luke Mikic";
    document.title = pageTitle;
  }, [title, metadata]);
  
  // If no metadata and no props, return only children
  if (!metadata && !title && !description) {
    return children ? <>{children}</> : null;
  }
  
  // Extract the final values to use, prioritizing props over metadata
  const finalTitle = title || metadata?.metaTitle || "Feel-Good Productivity - Luke Mikic";
  const finalDescription = description || metadata?.metaDescription || "Discover how to achieve success without burning out. In his book 'Feel-Good Productivity', Luke Mikic shares practical strategies for sustainable productivity with joy.";
  const finalImageUrl = image || metadata?.ogImageUrl || "/images/book-cover.jpg";
  
  // Generate the meta tags
  return (
    <>
      {/* Insert meta tags into document head */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Basic SEO
            document.querySelector('meta[name="description"]')?.remove();
            const metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = ${JSON.stringify(finalDescription)};
            document.head.appendChild(metaDesc);
            
            // Canonical URL
            document.querySelector('link[rel="canonical"]')?.remove();
            if (${JSON.stringify(metadata?.canonicalUrl || null)}) {
              const canonicalLink = document.createElement('link');
              canonicalLink.rel = 'canonical';
              canonicalLink.href = ${JSON.stringify(metadata?.canonicalUrl || '')};
              document.head.appendChild(canonicalLink);
            }
            
            // Keywords
            document.querySelector('meta[name="keywords"]')?.remove();
            if (${JSON.stringify(metadata?.keywords || null)}) {
              const keywordsTag = document.createElement('meta');
              keywordsTag.name = 'keywords';
              keywordsTag.content = ${JSON.stringify(metadata?.keywords || '')};
              document.head.appendChild(keywordsTag);
            }
            
            // Open Graph tags
            const ogTags = {
              'og:title': ${JSON.stringify(metadata?.ogTitle || finalTitle)},
              'og:description': ${JSON.stringify(metadata?.ogDescription || finalDescription)},
              'og:image': ${JSON.stringify(metadata?.ogImageUrl || finalImageUrl)},
              'og:url': window.location.href,
              'og:type': 'website'
            };
            
            for (const [property, content] of Object.entries(ogTags)) {
              document.querySelector(\`meta[property="\${property}"]\`)?.remove();
              const tag = document.createElement('meta');
              tag.setAttribute('property', property);
              tag.content = content;
              document.head.appendChild(tag);
            }
            
            // Twitter Card tags
            const twitterTags = {
              'twitter:card': 'summary_large_image',
              'twitter:title': ${JSON.stringify(metadata?.twitterTitle || metadata?.ogTitle || finalTitle)},
              'twitter:description': ${JSON.stringify(metadata?.twitterDescription || metadata?.ogDescription || finalDescription)},
              'twitter:image': ${JSON.stringify(metadata?.twitterImageUrl || metadata?.ogImageUrl || finalImageUrl)}
            };
            
            for (const [name, content] of Object.entries(twitterTags)) {
              document.querySelector(\`meta[name="\${name}"]\`)?.remove();
              const tag = document.createElement('meta');
              tag.name = name;
              tag.content = content;
              document.head.appendChild(tag);
            }
            
            // Structured Data
            document.querySelector('script[type="application/ld+json"]')?.remove();
            if (${JSON.stringify(metadata?.structuredData || null)}) {
              try {
                const structuredDataJson = ${JSON.stringify(metadata?.structuredData || '')};
                if (structuredDataJson) {
                  const script = document.createElement('script');
                  script.type = 'application/ld+json';
                  script.textContent = structuredDataJson;
                  document.head.appendChild(script);
                }
              } catch (e) {
                console.error('Error parsing structured data JSON:', e);
              }
            }
          `,
        }}
      />
      {children}
    </>
  );
}
import { Helmet } from 'react-helmet';
import { useSeoMetadata } from '@/hooks/use-seo-metadata';

interface SEOHeadProps {
  pagePath?: string;
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

export function SEOHead({ 
  pagePath = '/', 
  title,
  description,
  image,
  children 
}: SEOHeadProps) {
  const { data: seo, isLoading, error } = useSeoMetadata(pagePath);
  
  // Use provided props or fall back to SEO data from the database
  const metaTitle = title || seo?.metaTitle || 'Feel-Good Productivity';
  const metaDescription = description || seo?.metaDescription || 'Learn how to be productive without burning out';
  const metaImage = image || seo?.ogImage || '/images/default-og-image.jpg';
  
  const url = typeof window !== 'undefined' ? window.location.origin + pagePath : '';
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo?.ogTitle || metaTitle} />
      <meta property="og:description" content={seo?.ogDescription || metaDescription} />
      <meta property="og:image" content={metaImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seo?.twitterTitle || metaTitle} />
      <meta name="twitter:description" content={seo?.twitterDescription || metaDescription} />
      <meta name="twitter:image" content={seo?.twitterImage || metaImage} />
      
      {/* Canonical URL */}
      {seo?.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
      
      {/* Structured data */}
      {seo?.structuredData && (
        <script type="application/ld+json">
          {seo.structuredData}
        </script>
      )}
      
      {/* Additional metadata */}
      {children}
    </Helmet>
  );
}
import { useQuery } from "@tanstack/react-query";
import { SeoMetadata } from "@shared/schema";

/**
 * Hook to fetch SEO metadata for a specific page
 * @param pagePath The path of the page to fetch metadata for
 */
export function useSeoMetadata(pagePath: string = '/') {
  return useQuery<SeoMetadata>({
    queryKey: ['/api/seo/page', pagePath],
    queryFn: async () => {
      const res = await fetch(`/api/seo/page/${encodeURIComponent(pagePath)}`);
      
      if (!res.ok) {
        // If no specific metadata for this page, try to get the default metadata
        const defaultRes = await fetch('/api/seo/default');
        if (!defaultRes.ok) {
          throw new Error('Failed to fetch SEO metadata');
        }
        return defaultRes.json();
      }
      
      return res.json();
    },
  });
}

/**
 * Hook to fetch all SEO metadata entries for admin use
 */
export function useAllSeoMetadata() {
  return useQuery<SeoMetadata[]>({
    queryKey: ['/api/seo'],
    queryFn: async () => {
      const res = await fetch('/api/seo');
      if (!res.ok) {
        throw new Error('Failed to fetch all SEO metadata');
      }
      return res.json();
    },
  });
}
import { useQuery } from '@tanstack/react-query';
import { SeoMetadata } from '@shared/schema';

/**
 * Hook to fetch SEO metadata for a specific page
 * @param pagePath The path of the page to fetch metadata for (e.g., '/', '/about')
 * @returns The SEO metadata for the specified page or the default metadata if not found
 */
export function useSeoMetadata(pagePath: string) {
  const encodedPath = encodeURIComponent(pagePath);
  
  return useQuery<SeoMetadata>({
    queryKey: ['/api/seo/page', encodedPath],
    queryFn: async () => {
      const response = await fetch(`/api/seo/page/${encodedPath}`);
      if (!response.ok) {
        // If no specific metadata for this page, try to get default metadata
        const defaultResponse = await fetch('/api/seo/default');
        if (!defaultResponse.ok) {
          throw new Error('Failed to fetch SEO metadata');
        }
        return await defaultResponse.json();
      }
      return await response.json();
    },
  });
}

/**
 * Hook to fetch all SEO metadata (admin only)
 * @returns Array of all SEO metadata entries
 */
export function useAllSeoMetadata() {
  return useQuery<SeoMetadata[]>({
    queryKey: ['/api/seo'],
    queryFn: async () => {
      const response = await fetch('/api/seo');
      if (!response.ok) {
        throw new Error('Failed to fetch SEO metadata list');
      }
      return await response.json();
    },
  });
}
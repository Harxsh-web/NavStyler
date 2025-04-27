import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for fetching the hero section content for the public page
 */
export function usePublicHeroSection() {
  return useQuery({
    queryKey: ["/api/content/hero"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/hero");
      if (!response.ok) {
        return null; // Return null instead of throwing to handle gracefully on the frontend
      }
      return await response.json();
    },
    // Keep cached data for 5 minutes but always refetch in the background
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the quote section content for the public page
 */
export function usePublicQuoteSection() {
  return useQuery({
    queryKey: ["/api/content/quote"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/quote");
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the learning points for the public page
 */
export function usePublicLearningPoints() {
  return useQuery({
    queryKey: ["/api/content/learning-points"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/learning-points");
      if (!response.ok) {
        return [];
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching testimonials for the public page
 */
export function usePublicTestimonials() {
  return useQuery({
    queryKey: ["/api/content/testimonials"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/testimonials");
      if (!response.ok) {
        return [];
      }
      // API now returns the testimonials array directly
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the about book section for the public page
 */
export function usePublicAboutBookSection() {
  return useQuery({
    queryKey: ["/api/content/about-book"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/about-book");
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the author section for the public page
 */
export function usePublicAuthorSection() {
  return useQuery({
    queryKey: ["/api/content/author"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/author");
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the bonus section content for the public page
 */
export function usePublicBonusSection() {
  return useQuery({
    queryKey: ["/api/content/bonus-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/bonus-section");
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching the bonus items for the public page
 */
export function usePublicBonusItems() {
  return useQuery({
    queryKey: ["/api/content/bonus-items"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/bonus-items");
      if (!response.ok) {
        return [];
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching all public content in one call
 */
export function useAllPublicContent() {
  return useQuery({
    queryKey: ["/api/content"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content");
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for refreshing all public content
 */
export function useRefreshPublicContent() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async () => {
      // This is just a function that will trigger a refetch of all content
      return true;
    },
    onSuccess: () => {
      // Invalidate all content queries to force a fresh fetch
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/hero"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/quote"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/learning-points"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/about-book"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/author"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/bonus-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/bonus-items"] });
      
      toast({
        title: "Content refreshed",
        description: "The latest content has been loaded from the database.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error refreshing content",
        description: error instanceof Error ? error.message : "Failed to refresh content",
        variant: "destructive",
      });
    },
  });
}
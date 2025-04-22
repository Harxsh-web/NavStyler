import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

// Hero section hook
export function useHeroSection() {
  return useQuery({
    queryKey: ["/api/content/hero"],
    queryFn: getQueryFn()
  });
}

// Featured section hook
export function useFeaturedSection() {
  return useQuery({
    queryKey: ["/api/content/featured"],
    queryFn: getQueryFn()
  });
}

// Quote section hook
export function useQuoteSection() {
  return useQuery({
    queryKey: ["/api/content/quote"],
    queryFn: getQueryFn()
  });
}

// Learning points section hook
export function useLearningPointsSection() {
  return useQuery({
    queryKey: ["/api/content/learning-points-section"],
    queryFn: getQueryFn()
  });
}

// Learning points hook
export function useLearningPoints() {
  return useQuery({
    queryKey: ["/api/content/learning-points"],
    queryFn: getQueryFn()
  });
}

// Testimonial section hook
export function useTestimonialSection() {
  return useQuery({
    queryKey: ["/api/content/testimonial-section"],
    queryFn: getQueryFn()
  });
}

// Testimonials hook
export function useTestimonials() {
  return useQuery({
    queryKey: ["/api/content/testimonials"],
    queryFn: getQueryFn()
  });
}

// Book sections hook
export function useBookSections() {
  return useQuery({
    queryKey: ["/api/content/book-sections"],
    queryFn: getQueryFn()
  });
}

// About book section hook
export function useAboutBookSection() {
  return useQuery({
    queryKey: ["/api/content/about-book-section"],
    queryFn: getQueryFn()
  });
}

// Author section hook
export function useAuthorSection() {
  return useQuery({
    queryKey: ["/api/content/author-section"],
    queryFn: getQueryFn()
  });
}

// Footer categories hook
export function useFooterCategories() {
  return useQuery({
    queryKey: ["/api/content/footer-categories"],
    queryFn: getQueryFn()
  });
}

// Footer links hook
export function useFooterLinks() {
  return useQuery({
    queryKey: ["/api/content/footer-links"],
    queryFn: getQueryFn()
  });
}

// Social links hook
export function useSocialLinks() {
  return useQuery({
    queryKey: ["/api/content/social-links"],
    queryFn: getQueryFn()
  });
}

// Site settings hook
export function useSiteSettings() {
  return useQuery({
    queryKey: ["/api/content/site-settings"],
    queryFn: getQueryFn()
  });
}
import { useQuery } from "@tanstack/react-query";
import { 
  Hero, 
  Featured, 
  Quote, 
  LearningPoint, 
  LearningPointsSection, 
  Testimonial, 
  TestimonialSection,
  BookSection,
  AboutBookSection,
  AuthorSection,
  FooterCategory,
  FooterLink,
  SocialLink
} from "@shared/schema";
import { getQueryFn } from "../lib/queryClient";

// Type for all content combined
export interface WebsiteContent {
  hero?: Hero;
  featured?: Featured;
  quote?: Quote;
  learningPointsSection?: LearningPointsSection;
  learningPoints: LearningPoint[];
  testimonialSection?: TestimonialSection;
  testimonials: Testimonial[];
  mobileTestimonials: Testimonial[];
  bookSections: BookSection[];
  aboutBook?: AboutBookSection;
  author?: AuthorSection;
  footerCategories: FooterCategory[];
  footerLinks: FooterLink[];
  footerLinksByCategory: (FooterCategory & { links: FooterLink[] })[];
  socialLinks: SocialLink[];
  siteSettings: Record<string, string>;
}

// Hook to fetch all content at once
export function useAllContent() {
  return useQuery<WebsiteContent, Error>({
    queryKey: ["/api/content/content"],
    queryFn: getQueryFn({}),
  });
}

// Hooks for individual content sections
export function useHeroSection() {
  return useQuery<Hero, Error>({
    queryKey: ["/api/content/hero"],
    queryFn: getQueryFn({}),
  });
}

export function useFeaturedSection() {
  return useQuery<Featured, Error>({
    queryKey: ["/api/content/featured"],
    queryFn: getQueryFn({}),
  });
}

export function useQuoteSection() {
  return useQuery<Quote, Error>({
    queryKey: ["/api/content/quote"],
    queryFn: getQueryFn({}),
  });
}

export function useLearningPoints() {
  return useQuery<{ section: LearningPointsSection, points: LearningPoint[] }, Error>({
    queryKey: ["/api/content/learning-points"],
    queryFn: getQueryFn({}),
  });
}

export function useTestimonials(mobile?: boolean) {
  return useQuery<{ section: TestimonialSection, testimonials: Testimonial[] }, Error>({
    queryKey: ["/api/content/testimonials", mobile ? "mobile" : "all"],
    queryFn: getQueryFn({ 
      searchParams: mobile ? { mobile: "true" } : undefined 
    }),
  });
}

export function useBookSections() {
  return useQuery<BookSection[], Error>({
    queryKey: ["/api/content/book-sections"],
    queryFn: getQueryFn({}),
  });
}

export function useAboutBookSection() {
  return useQuery<AboutBookSection, Error>({
    queryKey: ["/api/content/about-book"],
    queryFn: getQueryFn({}),
  });
}

export function useAuthorSection() {
  return useQuery<AuthorSection, Error>({
    queryKey: ["/api/content/author"],
    queryFn: getQueryFn({}),
  });
}

export function useFooter() {
  return useQuery<{
    categories: FooterCategory[],
    links: FooterLink[],
    linksByCategory: (FooterCategory & { links: FooterLink[] })[],
    socialLinks: SocialLink[]
  }, Error>({
    queryKey: ["/api/content/footer"],
    queryFn: getQueryFn({}),
  });
}

export function useSiteSettings() {
  return useQuery<Record<string, string>, Error>({
    queryKey: ["/api/content/site-settings"],
    queryFn: getQueryFn({}),
  });
}
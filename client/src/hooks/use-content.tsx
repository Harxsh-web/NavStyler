import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRefreshPublicContent } from "@/hooks/use-public-content";
import { LandingSection } from "@shared/schema";

/**
 * Hook for refreshing content in admin components
 * This ensures that both admin state and public content are refreshed
 */
export function useRefreshAdminContent() {
  const { toast } = useToast();
  // Get the public content refresh mutation
  const refreshPublicContent = useRefreshPublicContent();
  
  return useMutation({
    mutationFn: async () => {
      // This is just a function to trigger refresh
      return true;
    },
    onSuccess: () => {
      // Invalidate all admin content queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quote"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonial-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/about-book"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/author"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-settings"] });
      
      // Also trigger the public content refresh
      refreshPublicContent.mutate();
      
      toast({
        title: "Content refreshed",
        description: "All content has been refreshed from the database.",
        variant: "success",
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

/**
 * Hook for managing footer-related content
 */
export function useFooterContent() {
  const { toast } = useToast();

  // Since we're using a static Footer, we'll just return empty arrays and loading states
  return {
    footerCategories: [],
    footerLinks: [],
    socialLinks: [],
    siteSettings: {},
    isLoadingCategories: false,
    isLoadingLinks: false,
    isLoadingSocialLinks: false,
    isLoadingSiteSettings: false
  };
}

/**
 * Hook for managing site settings
 */
export function useSiteSettings() {
  const { toast } = useToast();
  
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["/api/admin/site-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/site-settings");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch site settings");
      }
      return await response.json();
    }
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ name, value }: { name: string, value: string }) => {
      const response = await apiRequest("PUT", `/api/admin/site-settings/${name}`, { value });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update setting");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-settings"] });
      toast({
        title: "Success",
        description: "Site setting updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update site setting",
        variant: "destructive",
      });
    }
  });

  return {
    data,
    isLoading,
    error,
    updateSettingMutation
  };
}

/**
 * Hook for managing footer categories
 */
export function useFooterCategories() {
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/footer-categories"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/footer-categories");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch footer categories");
      }
      return await response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/admin/footer-categories", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create footer category");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-categories"] });
      toast({
        title: "Success",
        description: "Footer category created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create footer category",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: any }) => {
      const res = await apiRequest("PUT", `/api/admin/footer-categories/${id}`, values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update footer category");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-categories"] });
      toast({
        title: "Success",
        description: "Footer category updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update footer category",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/footer-categories/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete footer category");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-categories"] });
      toast({
        title: "Success",
        description: "Footer category deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete footer category",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  };
}

/**
 * Hook for managing footer links
 */
export function useFooterLinks() {
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/footer-links"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/footer-links");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch footer links");
      }
      return await response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/admin/footer-links", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create footer link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-links"] });
      toast({
        title: "Success",
        description: "Footer link created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create footer link",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: any }) => {
      const res = await apiRequest("PUT", `/api/admin/footer-links/${id}`, values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update footer link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-links"] });
      toast({
        title: "Success",
        description: "Footer link updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update footer link",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/footer-links/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete footer link");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-links"] });
      toast({
        title: "Success",
        description: "Footer link deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete footer link",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  };
}

/**
 * Hook for managing social links
 */
export function useSocialLinks() {
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/social-links"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/social-links");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch social links");
      }
      return await response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/admin/social-links", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create social link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-links"] });
      toast({
        title: "Success",
        description: "Social link created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create social link",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: any }) => {
      const res = await apiRequest("PUT", `/api/admin/social-links/${id}`, values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update social link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-links"] });
      toast({
        title: "Success",
        description: "Social link updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update social link",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/social-links/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete social link");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-links"] });
      toast({
        title: "Success",
        description: "Social link deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete social link",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  };
}

/**
 * Hook for managing quote section
 */
export function useQuoteSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/quote"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/quote");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch quote section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/quote", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update quote section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quote"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/quote"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Invalidate the main content endpoint
      toast({
        title: "Success",
        description: "Quote section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update quote section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}





/**
 * Hook for managing testimonial section
 */
export function useTestimonialSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/testimonial-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/testimonial-section");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch testimonial section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/testimonial-section", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update testimonial section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonial-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Testimonial section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update testimonial section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}

/**
 * Hook for managing testimonials
 */
export function useTestimonials() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/testimonials"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/testimonials");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch testimonials");
      }
      return await response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/admin/testimonials", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create testimonial");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Testimonial created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create testimonial",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: any }) => {
      const res = await apiRequest("PUT", `/api/admin/testimonials/${id}`, values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update testimonial");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update testimonial",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete testimonial");
      }
      return true;
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete testimonial",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  };
}

/**
 * Hook for managing author section
 */
export function useAuthorSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/author"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/author");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch author section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/author", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update author section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/author"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/author"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Author section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update author section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}

/**
 * Hook for managing YouTube Framework section
 */
export function useYoutubeFrameworkSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/youtube-framework-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/youtube-framework-section");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch YouTube Framework section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/youtube-framework-section", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update YouTube Framework section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/youtube-framework-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/youtube-framework-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "YouTube Framework section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update YouTube Framework section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}

/**
 * Hook for managing Scholarship section
 */
export function useScholarshipSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/scholarship-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/scholarship-section");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch Scholarship section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/scholarship-section", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update Scholarship section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/scholarship-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/scholarship-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Scholarship section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update Scholarship section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}

/**
 * Hook for managing landing section content
 */
export function useLandingSection() {
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/admin/landing"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/admin/landing");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch landing section:", errorData);
          throw new Error(errorData.error || "Failed to fetch landing section");
        }
        const data = await response.json();
        console.log("Landing section data loaded successfully:", data);
        return data;
      } catch (error) {
        console.error("Error in useLandingSection hook:", error);
        throw error; // Re-throw to let React Query handle it
      }
    },
    // Don't keep trying on 401/403 errors
    retry: (failureCount, error: any) => {
      // If API returns 401/403, stop retrying
      if (error.status === 401 || error.status === 403) {
        return false;
      }
      // Otherwise retry a few times
      return failureCount < 3;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      console.log("Updating landing section with values:", values);
      const res = await apiRequest("PUT", "/api/admin/landing", values);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to update landing section:", errorData);
        throw new Error(errorData.error || "Failed to update landing section");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/landing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/landing"] });
      toast({
        title: "Success",
        description: "Landing section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      console.error("Error in landing section update mutation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update landing section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    updateMutation
  };
}

/**
 * Hook for managing hero section content
 */
export function useHeroSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/hero"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/hero");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch hero section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/hero", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update hero section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/hero"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] }); // Main content endpoint
      toast({
        title: "Success",
        description: "Hero section updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero section",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation
  };
}
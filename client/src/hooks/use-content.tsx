import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quote"] });
      toast({
        title: "Success",
        description: "Quote section updated successfully",
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
 * Hook for managing learning points section
 */
export function useLearningPointsSection() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/learning-points-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/learning-points-section");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch learning points section");
      }
      return await response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("PUT", "/api/admin/learning-points-section", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update learning points section");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/learning-points-section"] });
      toast({
        title: "Success",
        description: "Learning points section updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update learning points section",
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
 * Hook for managing learning points
 */
export function useLearningPoints() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/admin/learning-points"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/learning-points");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch learning points");
      }
      return await response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/admin/learning-points", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create learning point");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/learning-points"] });
      toast({
        title: "Success",
        description: "Learning point created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create learning point",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: number, values: any }) => {
      const res = await apiRequest("PUT", `/api/admin/learning-points/${id}`, values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update learning point");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/learning-points"] });
      toast({
        title: "Success",
        description: "Learning point updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update learning point",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/learning-points/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete learning point");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/learning-points"] });
      toast({
        title: "Success",
        description: "Learning point deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete learning point",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonial-section"] });
      toast({
        title: "Success",
        description: "Testimonial section updated successfully",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({
        title: "Success",
        description: "Testimonial created successfully",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/author"] });
      toast({
        title: "Success",
        description: "Author section updated successfully",
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero"] });
      toast({
        title: "Success",
        description: "Hero section updated successfully",
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
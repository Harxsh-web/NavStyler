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
  
  return {
    data: [],
    isLoading: false,
    error: null,
    createMutation: {
      mutate: () => {},
      isPending: false
    },
    updateMutation: {
      mutate: () => {},
      isPending: false
    },
    deleteMutation: {
      mutate: () => {},
      isPending: false
    }
  };
}

/**
 * Hook for managing social links
 */
export function useSocialLinks() {
  const { toast } = useToast();
  
  return {
    data: [],
    isLoading: false,
    error: null,
    createMutation: {
      mutate: () => {},
      isPending: false
    },
    updateMutation: {
      mutate: () => {},
      isPending: false
    },
    deleteMutation: {
      mutate: () => {},
      isPending: false
    }
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
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SeoMetadata, InsertSeoMetadata } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSeoMetadata(id?: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: seoMetadata,
    isLoading,
    error,
  } = useQuery<SeoMetadata[]>({
    queryKey: ["/api/seo", id],
    queryFn: async () => {
      const url = id ? `/api/seo/${id}` : "/api/seo";
      const res = await apiRequest("GET", url);
      return res.json();
    },
    enabled: !!id,
  });

  // Get default SEO metadata
  const {
    data: defaultSeoMetadata,
    isLoading: isDefaultLoading,
  } = useQuery<SeoMetadata>({
    queryKey: ["/api/seo/default"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/seo/default");
      return res.json();
    },
    enabled: !id,
  });

  // Get metadata for a specific page
  const getSeoMetadataByPage = async (pagePath: string) => {
    const encodedPath = encodeURIComponent(pagePath);
    try {
      const res = await apiRequest("GET", `/api/seo/page/${encodedPath}`);
      return await res.json();
    } catch (error) {
      console.error(`Error fetching SEO metadata for page ${pagePath}:`, error);
      return null;
    }
  };

  // Create new SEO metadata
  const createSeoMetadataMutation = useMutation({
    mutationFn: async (data: InsertSeoMetadata) => {
      const res = await apiRequest("POST", "/api/seo", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      toast({
        title: "Success",
        description: "SEO metadata created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to create SEO metadata: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update existing SEO metadata
  const updateSeoMetadataMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertSeoMetadata> }) => {
      const res = await apiRequest("PATCH", `/api/seo/${id}`, data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      queryClient.invalidateQueries({ queryKey: ["/api/seo", variables.id] });
      if (variables.data.isDefault) {
        queryClient.invalidateQueries({ queryKey: ["/api/seo/default"] });
      }
      toast({
        title: "Success",
        description: "SEO metadata updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to update SEO metadata: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete SEO metadata
  const deleteSeoMetadataMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/seo/${id}`);
      return res.status === 204;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      toast({
        title: "Success",
        description: "SEO metadata deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to delete SEO metadata: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    seoMetadata: id ? seoMetadata : defaultSeoMetadata,
    isLoading: id ? isLoading : isDefaultLoading,
    error,
    getSeoMetadataByPage,
    createSeoMetadata: createSeoMetadataMutation.mutate,
    updateSeoMetadata: updateSeoMetadataMutation.mutate,
    deleteSeoMetadata: deleteSeoMetadataMutation.mutate,
    isCreating: createSeoMetadataMutation.isPending,
    isUpdating: updateSeoMetadataMutation.isPending,
    isDeleting: deleteSeoMetadataMutation.isPending,
  };
}
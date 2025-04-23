import { useQuery } from "@tanstack/react-query";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["/api/content/site-settings"],
    queryFn: async () => {
      const res = await fetch("/api/content/site-settings");
      if (!res.ok) throw new Error("Failed to fetch site settings");
      return res.json();
    }
  });
};
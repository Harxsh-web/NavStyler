import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

type FetcherOptions = {
  on401?: "throw" | "returnNull";
  searchParams?: Record<string, string>;
};

export function getQueryFn(options: FetcherOptions = {}) {
  return async ({ queryKey }: { queryKey: readonly any[] }) => {
    let url = queryKey[0] as string;
    
    // Handle search params if provided
    if (options.searchParams) {
      const params = new URLSearchParams();
      Object.entries(options.searchParams).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (response.status === 401 && options.on401 === "returnNull") {
      return null;
    }
    
    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || `Request failed with status ${response.status}`;
      } catch (e) {
        errorMessage = `Request failed with status ${response.status}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  };
}

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options);
}
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useToast } from '@/hooks/use-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      // Could add global error handling here
      console.error("Query error:", error);
    },
  }),
});

type FetchOptions = {
  on401?: "throw" | "returnNull";
};

export function getQueryFn(options: FetchOptions = {}) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    const [endpoint, ...params] = queryKey;
    let url = endpoint;
    
    // If there are params and the endpoint ends with a slash, add them
    if (params.length > 0 && endpoint.endsWith("/")) {
      url = `${endpoint}${params.join("/")}`;
    // If there are params and the endpoint doesn't end with a slash, add a slash and params
    } else if (params.length > 0) {
      url = `${endpoint}/${params.join("/")}`;
    }

    const response = await fetch(url);

    if (response.status === 401 && options.on401 === "returnNull") {
      return null;
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<TData>(
  method: HttpMethod,
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

  const response = await fetch(endpoint, {
    method,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  clearTimeout(id);
  return response;
}
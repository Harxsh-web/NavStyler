import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Base fetch function for API requests
export async function apiRequest(
  method: HttpMethod,
  url: string,
  body?: any,
  options: RequestInit = {}
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    credentials: "same-origin",
    ...options,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  return response;
}

type GetQueryFnOptions = {
  on401?: "returnNull" | "throw";
};

// Query function generator for TanStack Query
export function getQueryFn(options: GetQueryFnOptions = {}) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    const url = queryKey[0];
    const response = await apiRequest("GET", url);

    if (response.status === 401) {
      if (options.on401 === "returnNull") {
        return null;
      }
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "An error occurred");
    }

    return response.json();
  };
}
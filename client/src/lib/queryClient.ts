import { QueryClient } from "@tanstack/react-query";

export type FetchError = Error & { status?: number; info?: any };

type ApiRequestOptions = {
  on401?: "throw" | "returnNull";
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export function getQueryFn(options: ApiRequestOptions = {}) {
  return async function queryFn({ queryKey: [url] }: { queryKey: string[] }) {
    const response = await fetch(url as string);

    if (response.status === 401 && options.on401 === "returnNull") {
      return null;
    }

    if (!response.ok) {
      const error = new Error(
        `Error fetching data from ${url}: ${response.statusText}`
      ) as FetchError;
      error.status = response.status;
      throw error;
    }

    return response.json();
  };
}

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
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

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error(
      `API error: ${response.status} ${response.statusText}`
    ) as FetchError;
    
    try {
      error.info = await response.json();
    } catch {
      // If the error isn't valid JSON, just continue
    }
    
    error.status = response.status;
    throw error;
  }

  return response;
}
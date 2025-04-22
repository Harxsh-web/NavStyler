import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { getQueryFn, apiRequest } from '@/lib/queryClient';

// Type definitions for footer entities
export interface FooterCategory {
  id: number;
  name: string;
}

export interface FooterLink {
  id: number;
  text: string;
  url: string;
  categoryId: number;
}

export interface SocialLink {
  id: number;
  type: string;
  url: string;
}

export interface SiteSetting {
  id: number;
  name: string;
  value: string;
}

// Hooks for footer categories
export function useFooterCategories() {
  return useQuery<FooterCategory[], Error>({
    queryKey: ['/api/content/footer-categories'],
    queryFn: getQueryFn(),
  });
}

export function useFooterCategory(id: number) {
  return useQuery<FooterCategory, Error>({
    queryKey: ['/api/content/footer-categories', id],
    queryFn: getQueryFn(),
    enabled: !!id,
  });
}

// Hooks for footer links
export function useFooterLinks() {
  return useQuery<FooterLink[], Error>({
    queryKey: ['/api/content/footer-links'],
    queryFn: getQueryFn(),
  });
}

export function useFooterLink(id: number) {
  return useQuery<FooterLink, Error>({
    queryKey: ['/api/content/footer-links', id],
    queryFn: getQueryFn(),
    enabled: !!id,
  });
}

// Hooks for social links
export function useSocialLinks() {
  return useQuery<SocialLink[], Error>({
    queryKey: ['/api/content/social-links'],
    queryFn: getQueryFn(),
  });
}

export function useSocialLink(id: number) {
  return useQuery<SocialLink, Error>({
    queryKey: ['/api/content/social-links', id],
    queryFn: getQueryFn(),
    enabled: !!id,
  });
}

// Hooks for site settings
export function useSiteSettings() {
  return useQuery<SiteSetting[], Error>({
    queryKey: ['/api/content/site-settings'],
    queryFn: getQueryFn(),
  });
}

export function useSiteSetting(name: string) {
  return useQuery<SiteSetting, Error>({
    queryKey: ['/api/content/site-settings', name],
    queryFn: getQueryFn(),
    enabled: !!name,
  });
}

// Content client
export const contentClient = {
  // Categories
  createCategory: async (data: Omit<FooterCategory, 'id'>) => {
    const res = await apiRequest('POST', '/api/admin/footer-categories', data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create category');
    }
    return await res.json();
  },
  
  updateCategory: async (id: number, data: Partial<Omit<FooterCategory, 'id'>>) => {
    const res = await apiRequest('PATCH', `/api/admin/footer-categories/${id}`, data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update category');
    }
    return await res.json();
  },
  
  deleteCategory: async (id: number) => {
    const res = await apiRequest('DELETE', `/api/admin/footer-categories/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete category');
    }
    return id;
  },
  
  // Links
  createLink: async (data: Omit<FooterLink, 'id'>) => {
    const res = await apiRequest('POST', '/api/admin/footer-links', data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create link');
    }
    return await res.json();
  },
  
  updateLink: async (id: number, data: Partial<Omit<FooterLink, 'id'>>) => {
    const res = await apiRequest('PATCH', `/api/admin/footer-links/${id}`, data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update link');
    }
    return await res.json();
  },
  
  deleteLink: async (id: number) => {
    const res = await apiRequest('DELETE', `/api/admin/footer-links/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete link');
    }
    return id;
  },
  
  // Social links
  createSocialLink: async (data: Omit<SocialLink, 'id'>) => {
    const res = await apiRequest('POST', '/api/admin/social-links', data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create social link');
    }
    return await res.json();
  },
  
  updateSocialLink: async (id: number, data: Partial<Omit<SocialLink, 'id'>>) => {
    const res = await apiRequest('PATCH', `/api/admin/social-links/${id}`, data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update social link');
    }
    return await res.json();
  },
  
  deleteSocialLink: async (id: number) => {
    const res = await apiRequest('DELETE', `/api/admin/social-links/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete social link');
    }
    return id;
  },
  
  // Site settings
  updateSiteSetting: async (name: string, value: string) => {
    const res = await apiRequest('PUT', `/api/admin/site-settings/${name}`, { value });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update site setting');
    }
    return await res.json();
  },
};
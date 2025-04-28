import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useAllSeoMetadata } from '@/hooks/use-seo-metadata';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SeoMetadata } from '@shared/schema';

// Form schema for SEO metadata
const formSchema = z.object({
  pagePath: z.string().min(1, { message: 'Page path is required' }),
  metaTitle: z.string().min(1, { message: 'Meta title is required' }),
  metaDescription: z.string().min(1, { message: 'Meta description is required' }),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
  twitterTitle: z.string().nullable().optional(),
  twitterDescription: z.string().nullable().optional(),
  twitterImage: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),
  structuredData: z.string().nullable().optional(),
  isDefault: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function SeoEditor() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: allMetadata, isLoading, error } = useAllSeoMetadata();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pagePath: '/',
      metaTitle: '',
      metaDescription: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      canonicalUrl: '',
      structuredData: '',
      isDefault: false,
    },
  });
  
  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest('POST', '/api/seo', data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo'] });
      toast({
        title: 'SEO settings saved',
        description: 'Your SEO metadata has been created successfully.',
        variant: 'success',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to save SEO settings',
        description: error.message || 'An error occurred while saving SEO metadata',
        variant: 'destructive',
      });
    },
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!selectedId) throw new Error('No SEO entry selected');
      const response = await apiRequest('PATCH', `/api/seo/${selectedId}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo'] });
      toast({
        title: 'SEO settings updated',
        description: 'Your SEO metadata has been updated successfully.',
        variant: 'success',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update SEO settings',
        description: error.message || 'An error occurred while updating SEO metadata',
        variant: 'destructive',
      });
    },
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!selectedId) throw new Error('No SEO entry selected');
      const response = await apiRequest('DELETE', `/api/seo/${selectedId}`);
      return response.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo'] });
      toast({
        title: 'SEO settings deleted',
        description: 'SEO metadata has been deleted successfully.',
        variant: 'success',
      });
      form.reset();
      setSelectedId(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete SEO settings',
        description: error.message || 'An error occurred while deleting SEO metadata',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (values: FormValues) => {
    if (selectedId) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };
  
  const handleSelectExisting = (seoId: number) => {
    const selectedSeo = allMetadata?.find(item => item.id === seoId);
    if (selectedSeo) {
      setSelectedId(seoId);
      // Convert null values to empty strings for form
      form.reset({
        pagePath: selectedSeo.pagePath,
        metaTitle: selectedSeo.metaTitle,
        metaDescription: selectedSeo.metaDescription,
        ogTitle: selectedSeo.ogTitle || '',
        ogDescription: selectedSeo.ogDescription || '',
        ogImage: selectedSeo.ogImage || '',
        twitterTitle: selectedSeo.twitterTitle || '',
        twitterDescription: selectedSeo.twitterDescription || '',
        twitterImage: selectedSeo.twitterImage || '',
        canonicalUrl: selectedSeo.canonicalUrl || '',
        structuredData: selectedSeo.structuredData || '',
        isDefault: selectedSeo.isDefault,
      });
    }
  };
  
  const handleReset = () => {
    form.reset();
    setSelectedId(null);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        Error loading SEO data: {error.message}
      </div>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SEO Metadata</CardTitle>
        <CardDescription>
          Manage SEO settings for your website pages. These settings control how your pages appear in search results and social media.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select 
            value={selectedId?.toString() || ''} 
            onValueChange={(value) => handleSelectExisting(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a page to edit or create new" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Create New SEO Entry</SelectItem>
              {allMetadata?.map((metadata: SeoMetadata) => (
                <SelectItem key={metadata.id} value={metadata.id.toString()}>
                  {metadata.pagePath} {metadata.isDefault ? '(Default)' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="pagePath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Path</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="/" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Page Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Brief description of the page content" 
                          className="min-h-[100px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Set as Default</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Use this metadata as the default for pages without specific SEO settings
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="opengraph" className="space-y-4">
                <FormField
                  control={form.control}
                  name="ogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Graph Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title for social sharing (Facebook, LinkedIn)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Graph Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Description for social sharing" 
                          className="min-h-[100px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Graph Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="twitter" className="space-y-4">
                <FormField
                  control={form.control}
                  name="twitterTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title for Twitter sharing" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitterDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Description for Twitter sharing" 
                          className="min-h-[100px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitterImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <FormField
                  control={form.control}
                  name="canonicalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canonical URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/canonical-page" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="structuredData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Structured Data (JSON-LD)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}' 
                          className="min-h-[200px] font-mono text-sm" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex justify-between px-0 pb-0">
              <div>
                {selectedId && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate()}
                    disabled={createMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
                  >
                    {deleteMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {selectedId ? 'Update' : 'Create'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
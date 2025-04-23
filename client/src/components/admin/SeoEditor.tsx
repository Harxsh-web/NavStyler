import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

// Schema for SEO form
const seoSchema = z.object({
  metaTitle: z.string().min(1, "Meta title is required").max(60, "Meta title should be 60 characters or less"),
  metaDescription: z.string().min(1, "Meta description is required").max(160, "Meta description should be 160 characters or less"),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  canonicalUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  keywords: z.string().optional(),
  structuredData: z.string().optional(),
});

type SeoFormValues = z.infer<typeof seoSchema>;

export function SeoEditor() {
  const { toast } = useToast();
  
  // Placeholder for real data fetching and updating
  const isLoading = false;
  
  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      metaTitle: "Feel-Good Productivity: How to Organize Your Work and Life | Luke Mikic",
      metaDescription: "A practical guide to achieving more by trying less and enjoying the process. Learn productivity techniques that don't sacrifice your well-being.",
      ogTitle: "Feel-Good Productivity by Luke Mikic",
      ogDescription: "A revolutionary approach to productivity that focuses on joy and fulfillment",
      ogImageUrl: "https://example.com/images/og-image.jpg",
      twitterTitle: "",
      twitterDescription: "",
      twitterImageUrl: "",
      canonicalUrl: "https://feelgoodproductivity.com",
      keywords: "productivity, book, Luke Mikic, feel-good, work life balance, organization",
      structuredData: "",
    },
  });

  const onSubmit = (values: SeoFormValues) => {
    // This would be a mutation that sends data to the API
    console.log("Submitting SEO settings:", values);
    
    toast({
      title: "SEO settings saved",
      description: "Your SEO metadata has been updated successfully.",
    });
  };

  // Calculate character counts
  const metaTitleLength = form.watch("metaTitle")?.length || 0;
  const metaDescriptionLength = form.watch("metaDescription")?.length || 0;
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Metadata</CardTitle>
        <CardDescription>
          Optimize your site for search engines and social media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">General SEO</h3>
              
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meta title" {...field} />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormDescription>
                        Title shown in search engine results
                      </FormDescription>
                      <span className={`text-xs ${metaTitleLength > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {metaTitleLength}/60
                      </span>
                    </div>
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
                        placeholder="Enter meta description" 
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormDescription>
                        Description shown in search engine results
                      </FormDescription>
                      <span className={`text-xs ${metaDescriptionLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {metaDescriptionLength}/160
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter keywords separated by commas" {...field} />
                    </FormControl>
                    <FormDescription>
                      Keywords related to your content (e.g., productivity, book, organization)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="canonicalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Canonical URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      The preferred URL for this page to avoid duplicate content issues
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Open Graph (Facebook/LinkedIn)</h3>
              
              <FormField
                control={form.control}
                name="ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title for social sharing" {...field} />
                    </FormControl>
                    <FormDescription>
                      Title shown when sharing on Facebook, LinkedIn, etc. (leave blank to use Meta Title)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ogDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter description for social sharing" 
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Description shown when sharing on Facebook, LinkedIn, etc. (leave blank to use Meta Description)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ogImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Image shown when sharing on Facebook, LinkedIn, etc. (1200×630 pixels recommended)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Twitter</h3>
              
              <FormField
                control={form.control}
                name="twitterTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title for Twitter" {...field} />
                    </FormControl>
                    <FormDescription>
                      Title shown when sharing on Twitter (leave blank to use OG Title)
                    </FormDescription>
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
                        placeholder="Enter description for Twitter" 
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Description shown when sharing on Twitter (leave blank to use OG Description)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="twitterImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/twitter-image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Image shown when sharing on Twitter (leave blank to use OG Image)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Advanced</h3>
              
              <FormField
                control={form.control}
                name="structuredData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Structured Data (JSON-LD)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter JSON-LD structured data" 
                        className="min-h-32 font-mono text-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Advanced structured data for search engines (JSON-LD format)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <Button type="submit" className="w-full sm:w-auto">
                Save SEO Settings
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
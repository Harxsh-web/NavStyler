import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRefreshAdminContent, useSiteSettings } from "@/hooks/use-content";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Loader2, RefreshCw } from "lucide-react";
import { AdminCard } from "./AdminCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Schema for site settings form
const siteSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteTagline: z.string().optional(),
  contactEmail: z.string().email("Must be a valid email address"),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  faviconUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  enablePreorders: z.boolean().default(true),
  preorderUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  copyrightText: z.string().optional(),
  maintenanceMode: z.boolean().default(false),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

export function SiteSettingsEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");
  const [formInitialized, setFormInitialized] = useState(false);
  const refreshContentMutation = useRefreshAdminContent();
  
  // Use our custom hook to manage site settings
  const { data: siteSettings = [], isLoading, updateSettingMutation } = useSiteSettings();
  
  // Create form with default values
  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "Feel-Good Productivity",
      siteTagline: "How to Organize Your Work and Life",
      contactEmail: "contact@example.com",
      logoUrl: "",
      faviconUrl: "",
      enablePreorders: true,
      preorderUrl: "https://amazon.com/books/feel-good-productivity",
      copyrightText: "© 2023 Luke Mikic. All rights reserved.",
      maintenanceMode: false,
    },
  });

  // Initialize form with values from database
  useEffect(() => {
    if (siteSettings.length > 0 && !formInitialized) {
      const formValues: Partial<SiteSettingsFormValues> = {};
      
      // Process each setting
      siteSettings.forEach((setting: { name: string, value: string }) => {
        // Convert boolean strings to actual booleans
        if (setting.value === 'true' || setting.value === 'false') {
          (formValues as any)[setting.name] = setting.value === 'true';
        } else {
          (formValues as any)[setting.name] = setting.value;
        }
      });
      
      // Reset form with values from database
      form.reset({
        ...form.getValues(), // Keep default values for any missing fields
        ...formValues // Override with values from database
      });
      
      setFormInitialized(true);
    }
  }, [siteSettings, form, formInitialized]);

  // Handle form submission - save each setting individually
  const onSubmit = async (values: SiteSettingsFormValues) => {
    try {
      // Convert each form value to a setting update
      const updates = Object.entries(values).map(([name, value]) => {
        // Convert boolean values to strings for storage
        const stringValue = typeof value === 'boolean' ? String(value) : value || '';
        return { name, value: stringValue };
      });
      
      // Save each setting
      for (const update of updates) {
        await updateSettingMutation.mutateAsync(update);
      }
      
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      });
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  // Handle form refresh
  const handleManualRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/site-settings"] });
    setFormInitialized(false);
    toast({
      title: "Settings refreshed",
      description: "Site settings have been refreshed from the database."
    });
  };

  // Preview site
  const handlePreview = () => {
    window.open("/", "_blank");
  };

  if (isLoading) {
    return (
      <AdminCard title="Site Settings">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard 
      title="Site Settings" 
      description="Configure general settings for your website"
    >
      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleManualRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Settings
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full gap-4">
        <TabsList className="mb-6 space-x-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preorders">Pre-orders</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="space-y-6">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter site name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="siteTagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter site tagline" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short phrase that appears beneath the site name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="copyrightText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copyright Text</FormLabel>
                    <FormControl>
                      <Input placeholder="© 2023 Your Name. All rights reserved." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full URL to your site's logo image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="faviconUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favicon URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/favicon.ico" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full URL to your site's favicon (browser tab icon)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="preorders" className="space-y-6">
              <FormField
                control={form.control}
                name="enablePreorders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Pre-orders</FormLabel>
                      <FormDescription>
                        Show pre-order links and CTAs on the website
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="preorderUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-order URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/preorder" 
                        {...field}
                        disabled={!form.watch("enablePreorders")} 
                      />
                    </FormControl>
                    <FormDescription>
                      The link where users can pre-order the book
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <FormField
                control={form.control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Maintenance Mode</FormLabel>
                      <FormDescription>
                        Enable maintenance mode to show a temporary page to visitors
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <div className="pt-4 border-t border-gray-200 flex gap-2">
              <Button type="submit" className="w-full sm:w-auto">
                Save Settings
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={handlePreview}
              >
                Preview Site
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </AdminCard>
  );
}
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("general");
  
  // Placeholder for real data fetching and updating
  const isLoading = false;
  
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

  const onSubmit = (values: SiteSettingsFormValues) => {
    // This would be a mutation that sends data to the API
    console.log("Submitting site settings:", values);
    
    toast({
      title: "Settings saved",
      description: "Your site settings have been updated successfully.",
    });
  };

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
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>
          Configure general settings for your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
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
              
              <div className="pt-4 border-t border-gray-200">
                <Button type="submit" className="w-full sm:w-auto">
                  Save Settings
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
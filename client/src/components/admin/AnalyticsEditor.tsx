import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AnalyticsPanel } from "./AnalyticsPanel";

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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Schema for analytics settings form
const analyticsSchema = z.object({
  enableGoogleAnalytics: z.boolean().default(false),
  googleAnalyticsId: z.string().optional(),
  enableFacebookPixel: z.boolean().default(false),
  facebookPixelId: z.string().optional(),
  enableHotjar: z.boolean().default(false),
  hotjarId: z.string().optional(),
  customHeadCode: z.string().optional(),
  customBodyCode: z.string().optional(),
});

type AnalyticsFormValues = z.infer<typeof analyticsSchema>;

export function AnalyticsEditor() {
  const { toast } = useToast();
  
  // Placeholder for real data fetching and updating
  const isLoading = false;
  
  const form = useForm<AnalyticsFormValues>({
    resolver: zodResolver(analyticsSchema),
    defaultValues: {
      enableGoogleAnalytics: false,
      googleAnalyticsId: "",
      enableFacebookPixel: false,
      facebookPixelId: "",
      enableHotjar: false,
      hotjarId: "",
      customHeadCode: "",
      customBodyCode: "",
    },
  });

  const onSubmit = (values: AnalyticsFormValues) => {
    // This would be a mutation that sends data to the API
    console.log("Submitting analytics settings:", values);
    
    toast({
      title: "Analytics settings saved",
      description: "Your analytics configuration has been updated successfully.",
      className: "bg-green-50 border-green-200",
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
    <Tabs defaultValue="dashboard" className="w-full ">
      <TabsList className="mb-4 space-x-3">
        <TabsTrigger value="dashboard">Analytics Dashboard</TabsTrigger>
        <TabsTrigger value="settings">Tracking Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <AnalyticsPanel />
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Tracking</CardTitle>
            <CardDescription>
              Configure analytics tools and tracking codes for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Google Analytics</h3>
                  
                  <FormField
                    control={form.control}
                    name="enableGoogleAnalytics"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Google Analytics</FormLabel>
                          <FormDescription>
                            Add Google Analytics tracking to your website
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
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X" 
                            {...field}
                            disabled={!form.watch("enableGoogleAnalytics")}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your Google Analytics tracking ID (e.g., G-XXXXXXXXXX or UA-XXXXXXXX-X)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Facebook Pixel</h3>
                  
                  <FormField
                    control={form.control}
                    name="enableFacebookPixel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Facebook Pixel</FormLabel>
                          <FormDescription>
                            Add Facebook conversion tracking to your website
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
                    name="facebookPixelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Pixel ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="XXXXXXXXXXXXXXXXXX" 
                            {...field}
                            disabled={!form.watch("enableFacebookPixel")}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your Facebook Pixel ID
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Hotjar</h3>
                  
                  <FormField
                    control={form.control}
                    name="enableHotjar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Hotjar</FormLabel>
                          <FormDescription>
                            Add Hotjar behavior analytics to your website
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
                    name="hotjarId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hotjar Site ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="XXXXXXX" 
                            {...field}
                            disabled={!form.watch("enableHotjar")}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your Hotjar Site ID
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Custom Code</h3>
                  
                  <FormField
                    control={form.control}
                    name="customHeadCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Head Code</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="<!-- Enter custom code for the <head> section -->" 
                            className="min-h-32 font-mono text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Custom scripts or code to add to the <code>&lt;head&gt;</code> section
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customBodyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Body Code</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="<!-- Enter custom code for the end of the <body> section -->" 
                            className="min-h-32 font-mono text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Custom scripts or code to add at the end of the <code>&lt;body&gt;</code> section
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    Save Analytics Settings
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLandingSectionSchema, LandingSection } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MediaUploader } from "@/components/ui/MediaUploader";

interface LandingEditorProps {
  data: LandingSection | undefined;
}

export default function LandingEditor({ data }: LandingEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState<string>(data?.backgroundColor || "#F9F6F3");

  const form = useForm({
    resolver: zodResolver(insertLandingSectionSchema.partial()),
    defaultValues: {
      heading: data?.heading || "",
      subheading: data?.subheading || "",
      imageUrl: data?.imageUrl || "",
      newsletterHeading: data?.newsletterHeading || "",
      newsletterSubheading: data?.newsletterSubheading || "",
      newsletterCta: data?.newsletterCta || "Subscribe",
      subscribersCount: data?.subscribersCount || "",
      reviewsCount: data?.reviewsCount || "",
      backgroundColor: data?.backgroundColor || "#F9F6F3",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: Partial<LandingSection>) => {
      console.log("Submitting values:", values);
      const response = await apiRequest("PUT", "/api/admin/landing", values);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Landing section updated",
        description: "Your changes have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/landing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/landing"] });
    },
    onError: (error) => {
      toast({
        title: "Error updating landing section",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: Partial<LandingSection>) => {
    // Make sure to include the color value from the color picker
    updateMutation.mutate({
      ...values,
      backgroundColor: selectedColor,
    });
  };

  const handleImageUploaded = (url: string) => {
    form.setValue("imageUrl", url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Landing Section</CardTitle>
        <CardDescription>Edit the landing section content that appears at the top of the page.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="heading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heading</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter heading text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subheading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subheading</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter subheading text" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <FormControl>
                        <div className="flex space-x-2 items-center">
                          <Input 
                            placeholder="#F9F6F3" 
                            {...field} 
                            value={selectedColor}
                            onChange={(e) => {
                              setSelectedColor(e.target.value);
                              field.onChange(e);
                            }}
                          />
                          <div 
                            className="h-10 w-10 rounded-md border border-input" 
                            style={{ backgroundColor: selectedColor }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Image</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <MediaUploader 
                            value={field.value} 
                            onChange={handleImageUploaded} 
                            accept="image/*"
                          />
                          <Input {...field} className="hidden" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        This is the circular image that appears in the "Hey Friends" section
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="newsletterHeading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Newsletter Heading</FormLabel>
                      <FormControl>
                        <Input placeholder="Subscribe to LifeNotes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletterSubheading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Newsletter Subheading</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Each week, I share actionable productivity tips..." 
                          {...field} 
                          rows={3} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletterCta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Newsletter Button Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Subscribe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="subscribersCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscribers Count</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 270,000+ subscribers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reviewsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reviews Count</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 200+ reviews" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pb-0 pt-6">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
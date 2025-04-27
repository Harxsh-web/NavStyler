import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHeroSection, useRefreshAdminContent } from "@/hooks/use-content";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ui/image-upload";
import { AdminCard } from "./AdminCard";

const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().url("Must be a valid URL").optional(),
  imageUrl: z.string().optional(), // Allow any string - could be URL or data URL from image upload
});

type HeroFormValues = z.infer<typeof heroSchema>;

export function HeroEditor() {
  const { data: hero, isLoading, error } = useHeroSection();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      buttonText: "",
      buttonUrl: "",
      imageUrl: "",
    },
  });

  // Update form when data is loaded
  if (hero && !isEditing) {
    form.reset({
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      buttonText: hero.buttonText || "",
      buttonUrl: hero.buttonUrl || "",
      imageUrl: hero.imageUrl || "",
    });
    setIsEditing(true);
  }

  const updateHeroMutation = useMutation({
    mutationFn: async (values: HeroFormValues) => {
      const res = await apiRequest("PUT", "/api/admin/hero", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update hero section");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate both admin and public content endpoints
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/hero"] });
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero section",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: HeroFormValues) => {
    updateHeroMutation.mutate(values);
  };

  // Get refresh mutation
  const refreshContentMutation = useRefreshAdminContent();

  if (isLoading) {
    return (
      <AdminCard title="Hero Section">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminCard>
    );
  }

  if (error) {
    return (
      <AdminCard title="Hero Section">
        <p className="text-destructive">Error loading hero section: {error.message}</p>
        <Button 
          variant="outline" 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/content/hero"] })}
          className="mt-4"
        >
          Retry
        </Button>
      </AdminCard>
    );
  }

  return (
    <AdminCard 
      title="Edit Hero Section"
      description="Update the hero section displayed at the top of the homepage"
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buttonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Get the Book" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buttonUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {/* Standard URL input for external URLs */}
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                      />
                      
                      {/* Divider with text */}
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-3 text-gray-400 text-sm">or upload image</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                      </div>
                      
                      {/* Image upload component */}
                      <ImageUpload 
                        onImageChange={(imageUrl) => {
                          if (imageUrl) {
                            field.onChange(imageUrl);
                          }
                        }}
                        currentImage={field.value}
                        aspectRatio="wide"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (hero) {
                    form.reset({
                      title: hero.title || "",
                      subtitle: hero.subtitle || "",
                      buttonText: hero.buttonText || "",
                      buttonUrl: hero.buttonUrl || "",
                      imageUrl: hero.imageUrl || "",
                    });
                  }
                }}
              >
                Reset
              </Button>
              
              {/* Save and Preview button - saves changes then opens the homepage */}
              <Button
                type="button"
                variant="secondary"
                disabled={updateHeroMutation.isPending}
                onClick={() => {
                  const values = form.getValues();
                  updateHeroMutation.mutate(values, {
                    onSuccess: () => {
                      refreshContentMutation.mutate();
                      // Open homepage in new tab
                      setTimeout(() => window.open('/', '_blank'), 500);
                    }
                  });
                }}
              >
                {updateHeroMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Save & Preview
                  </>
                )}
              </Button>
              
              {/* Regular Save button */}
              <Button
                type="submit"
                disabled={updateHeroMutation.isPending}
              >
                {updateHeroMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
    </AdminCard>
  );
}
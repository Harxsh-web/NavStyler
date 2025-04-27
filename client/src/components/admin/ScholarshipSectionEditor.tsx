import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { backgroundColorOptions } from "@/lib/constants";

const scholarshipSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  buttonText: z.string().min(1, "Button text is required"),
  buttonUrl: z.string().min(1, "Button URL is required"),
  backgroundColor: z.string().optional(),
});

type ScholarshipSectionFormValues = z.infer<typeof scholarshipSectionSchema>;

const ScholarshipSectionEditor = ({ initialData }: { initialData?: any }) => {
  const { toast } = useToast();
  
  const form = useForm<ScholarshipSectionFormValues>({
    resolver: zodResolver(scholarshipSectionSchema),
    defaultValues: {
      title: initialData?.title || "Can't Afford The $995?",
      subtitle: initialData?.subtitle || "Scholarship Application",
      description: initialData?.description || 
        "If you truly cannot afford the full price but are committed to building your YouTube channel, I'm offering scholarships based on need and dedication. Submit your application explaining your situation and YouTube goals.",
      imageUrl: initialData?.imageUrl || "/student-scholarship.jpg",
      buttonText: initialData?.buttonText || "Apply for Scholarship",
      buttonUrl: initialData?.buttonUrl || "#scholarship-application",
      backgroundColor: initialData?.backgroundColor || "bg-amber-50",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ScholarshipSectionFormValues) => {
      const res = await apiRequest("PUT", "/api/admin/scholarship", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Scholarship section has been updated",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/scholarship"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ScholarshipSectionFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scholarship Section</CardTitle>
        <CardDescription>
          Edit the scholarship application section that appears on the homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section title" {...field} />
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
                    <Input placeholder="Enter section subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter section description" 
                      {...field} 
                      className="min-h-[120px]" 
                    />
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
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
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
                      <Input placeholder="Enter button text" {...field} />
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
                    <FormLabel>Button URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter button URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a background color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {backgroundColorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScholarshipSectionEditor;
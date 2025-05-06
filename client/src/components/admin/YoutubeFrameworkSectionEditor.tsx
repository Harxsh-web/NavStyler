import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Trash2, Plus } from "lucide-react";
import { backgroundColorOptions } from "@/lib/constants";
import RichTextEditor from "@/components/ui/RichTextEditor";

const stepSchema = z.object({
  number: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const youtubeFrameworkSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  steps: z.array(stepSchema).min(1, "At least one step is required"),
  finalNote: z.string().optional(),
  buttonText: z.string().min(1, "Button text is required"),
  buttonUrl: z.string().min(1, "Button URL is required"),
  backgroundColor: z.string().optional(),
});

type Step = z.infer<typeof stepSchema>;
type YoutubeFrameworkSectionFormValues = z.infer<typeof youtubeFrameworkSectionSchema>;

const YoutubeFrameworkSectionEditor = ({ initialData }: { initialData?: any }) => {
  const { toast } = useToast();
  
  const form = useForm<YoutubeFrameworkSectionFormValues>({
    resolver: zodResolver(youtubeFrameworkSectionSchema),
    defaultValues: {
      title: initialData?.title || "My Simple 3 Step YouTube Framework",
      subtitle: initialData?.subtitle || "How I Grew My Channel to 4,000,000 Subscribers",
      description: initialData?.description || 
        "This is the exact framework I used to grow my YouTube channel from 0 to over 4 million subscribers and generate 8 figures in revenue - all while maintaining my medical career.",
      steps: initialData?.steps || [
        { 
          number: 1, 
          title: "Find Your Validated Content Angle", 
          description: "Learn how to identify content topics people are actively searching for, and position yourself as the perfect creator to deliver what they need." 
        },
        { 
          number: 2, 
          title: "Create Value-First Content", 
          description: "Master my step-by-step process for creating content that genuinely helps viewers while building your authority and subscriber base." 
        },
        { 
          number: 3, 
          title: "Build Simple Systems for Growth", 
          description: "Implement my proven framework for consistently growing your channel and turning viewers into loyal fans and customers." 
        }
      ],
      finalNote: initialData?.finalNote || "This framework is what I teach my students who have gone on to build 6 and 7-figure YouTube channels and businesses - and now I'm sharing it with you.",
      buttonText: initialData?.buttonText || "Get The Full Framework",
      buttonUrl: initialData?.buttonUrl || "#buy",
      backgroundColor: initialData?.backgroundColor || "bg-gray-50",
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const mutation = useMutation({
    mutationFn: async (data: YoutubeFrameworkSectionFormValues) => {
      // Ensure steps have sequential numbers
      data.steps = data.steps.map((step, index) => ({
        ...step,
        number: index + 1
      }));
      
      const res = await apiRequest("PUT", "/api/admin/youtube-framework", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "YouTube framework section has been updated",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/youtube-framework"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: YoutubeFrameworkSectionFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Framework Section</CardTitle>
        <CardDescription>
          Edit the YouTube framework section that appears on the homepage
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
                    <div className="rich-text-wrapper">
                      <RichTextEditor 
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Enter section description" 
                        className="min-h-[120px]" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Framework Steps</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ 
                    number: fields.length + 1, 
                    title: "", 
                    description: "" 
                  })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
              
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Step {index + 1}</h4>
                      <Button
                        type="button"
                         className="delete-button"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 " />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`steps.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter step title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`steps.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <div className="rich-text-wrapper">
                                <RichTextEditor 
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                  placeholder="Enter step description" 
                                  className="min-h-[80px]" 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <FormField
              control={form.control}
              name="finalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Note</FormLabel>
                  <FormControl>
                    <div className="rich-text-wrapper">
                      <RichTextEditor 
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Enter final note" 
                        className="min-h-[80px]" 
                      />
                    </div>
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

export default YoutubeFrameworkSectionEditor;
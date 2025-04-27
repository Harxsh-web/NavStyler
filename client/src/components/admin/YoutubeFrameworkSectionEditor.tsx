import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus, Save, ArrowUp, ArrowDown } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import YoutubeFrameworkSection from "../YoutubeFrameworkSection";

// Define the schema for the Step type
const stepSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1, "Step title is required"),
  description: z.string().min(1, "Step description is required"),
});

// Define the schema for the form
const youtubeFrameworkSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional().nullable(),
  description: z.string().min(1, "Description is required"),
  steps: z.array(stepSchema),
  finalNote: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonUrl: z.string().optional().nullable(),
  backgroundColor: z.string().optional().nullable(),
});

type Step = z.infer<typeof stepSchema>;
type YoutubeFrameworkSectionFormValues = z.infer<typeof youtubeFrameworkSectionSchema>;

const YoutubeFrameworkSectionEditor: React.FC = () => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: frameworkSection, isLoading } = useQuery({
    queryKey: ["/api/admin/youtube-framework-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/youtube-framework-section");
      if (!response.ok) {
        throw new Error("Failed to fetch YouTube framework section");
      }
      return await response.json();
    },
  });

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<YoutubeFrameworkSectionFormValues>({
    resolver: zodResolver(youtubeFrameworkSectionSchema),
    defaultValues: {
      title: "My Simple 3 Step YouTube Framework To Gain 10,000 Subscribers in 100 Days",
      subtitle: "The Simple \"Secret\" Formula to 100,000+ Subscribers",
      description: "So over the last 7 years, I've learned a lot about what it takes to build an audience from scratch, provide value consistently, and monetise in a non-spammy way.",
      steps: [
        { number: 1, title: "Creating", description: "videos that people find valuable" },
        { number: 2, title: "Posting", description: "them on YouTube at least once a week" },
        { number: 3, title: "Repeating", description: "this for at least 2 years" }
      ],
      finalNote: "I personally guarantee that if you follow this 3-part formula, your life will change in ways you can't imagine. You'll learn incredibly useful skills, you'll make friends with amazing people from all over the world and you'll start to generate 'passive' income. You might even get messages from people about how your videos have changed their lives 😳 It seems simple in theory, but the execution is slightly more difficult.",
      buttonText: "Enrol Now for $995",
      buttonUrl: "#enroll-now",
      backgroundColor: "#faf7f2",
    },
  });

  const { fields: stepsFields, append: appendStep, remove: removeStep, move: moveStep } = useFieldArray({
    control,
    name: "steps",
  });

  useEffect(() => {
    if (frameworkSection) {
      reset({
        title: frameworkSection.title,
        subtitle: frameworkSection.subtitle || "",
        description: frameworkSection.description,
        steps: frameworkSection.steps || [
          { number: 1, title: "Creating", description: "videos that people find valuable" },
          { number: 2, title: "Posting", description: "them on YouTube at least once a week" },
          { number: 3, title: "Repeating", description: "this for at least 2 years" }
        ],
        finalNote: frameworkSection.finalNote || "",
        buttonText: frameworkSection.buttonText || "",
        buttonUrl: frameworkSection.buttonUrl || "",
        backgroundColor: frameworkSection.backgroundColor || "#faf7f2",
      });
    }
  }, [frameworkSection, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: YoutubeFrameworkSectionFormValues) => {
      const response = await apiRequest("PUT", "/api/admin/youtube-framework-section", data);
      if (!response.ok) {
        throw new Error("Failed to update YouTube framework section");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "YouTube framework section updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/youtube-framework-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/youtube-framework-section"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update YouTube framework section",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: YoutubeFrameworkSectionFormValues) => {
    // Ensure steps have the correct number based on their position
    const updatedData = {
      ...data,
      steps: data.steps.map((step, index) => ({
        ...step,
        number: index + 1,
      })),
    };
    updateMutation.mutate(updatedData);
  };

  const watchedValues = watch();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">YouTube Framework Section Editor</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreviewing(!isPreviewing)}
          >
            {isPreviewing ? "Edit" : "Preview"}
          </Button>
          {!isPreviewing && (
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateMutation.isPending ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-white rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {isPreviewing ? (
        <div className="border rounded-lg p-4 mb-8 bg-gray-50">
          <YoutubeFrameworkSection 
            title={watchedValues.title}
            subtitle={watchedValues.subtitle || undefined}
            description={watchedValues.description}
            steps={watchedValues.steps}
            finalNote={watchedValues.finalNote || undefined}
            buttonText={watchedValues.buttonText || undefined}
            buttonUrl={watchedValues.buttonUrl || undefined}
            backgroundColor={watchedValues.backgroundColor || undefined}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input id="title" {...register("title")} className="mt-1" />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                <Input id="subtitle" {...register("subtitle")} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="description">Main Description</Label>
                <Textarea 
                  id="description" 
                  {...register("description")} 
                  rows={3} 
                  className="mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="finalNote">Final Note (Optional)</Label>
                <Textarea 
                  id="finalNote" 
                  {...register("finalNote")} 
                  rows={4} 
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="buttonText">Button Text (Optional)</Label>
                <Input id="buttonText" {...register("buttonText")} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="buttonUrl">Button URL (Optional)</Label>
                <Input id="buttonUrl" {...register("buttonUrl")} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-3 mt-1">
                  <Input 
                    id="backgroundColor" 
                    type="text"
                    {...register("backgroundColor")} 
                  />
                  <Input 
                    type="color" 
                    {...register("backgroundColor")} 
                    className="w-12 h-10 p-1" 
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Framework Steps</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendStep({
                    number: stepsFields.length + 1,
                    title: "",
                    description: ""
                  })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Step
                </Button>
              </div>

              <div className="space-y-4">
                {stepsFields.map((field, index) => (
                  <Card key={field.id} className="relative">
                    <CardContent className="pt-6">
                      <div className="absolute top-3 right-3 flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index > 0 && moveStep(index, index - 1)}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index < stepsFields.length - 1 && moveStep(index, index + 1)}
                          disabled={index === stepsFields.length - 1}
                          className="h-8 w-8"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(index)}
                          disabled={stepsFields.length <= 1}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor={`steps.${index}.title`}>Step Title</Label>
                          <Input
                            id={`steps.${index}.title`}
                            {...register(`steps.${index}.title` as const)}
                            className="mt-1"
                          />
                          {errors.steps?.[index]?.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.steps[index]?.title?.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor={`steps.${index}.description`}>Step Description</Label>
                          <Textarea
                            id={`steps.${index}.description`}
                            {...register(`steps.${index}.description` as const)}
                            className="mt-1"
                          />
                          {errors.steps?.[index]?.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.steps[index]?.description?.message}</p>
                          )}
                        </div>

                        <input 
                          type="hidden" 
                          {...register(`steps.${index}.number` as const)} 
                          value={index + 1} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateMutation.isPending ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-white rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default YoutubeFrameworkSectionEditor;
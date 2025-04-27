import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus, Save } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ScholarshipSection from "../ScholarshipSection";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const scholarshipSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string().min(1, "Requirement is required")),
  applicationProcess: z.array(z.string().min(1, "Application step is required")),
  buttonText: z.string().optional().nullable(),
  buttonUrl: z.string().optional().nullable(),
  backgroundColor: z.string().optional().nullable(),
});

type ScholarshipSectionFormValues = z.infer<typeof scholarshipSectionSchema>;

const ScholarshipSectionEditor: React.FC = () => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: scholarshipSection, isLoading } = useQuery({
    queryKey: ["/api/admin/scholarship-section"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/scholarship-section");
      if (!response.ok) {
        throw new Error("Failed to fetch scholarship section");
      }
      return await response.json();
    },
  });

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ScholarshipSectionFormValues>({
    resolver: zodResolver(scholarshipSectionSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: [""],
      applicationProcess: [""],
      buttonText: "",
      buttonUrl: "",
      backgroundColor: "#f9fafe",
    },
  });

  const { fields: requirementsFields, append: appendRequirement, remove: removeRequirement } = useFieldArray({
    control,
    name: "requirements",
  });

  const { fields: applicationProcessFields, append: appendApplicationStep, remove: removeApplicationStep } = useFieldArray({
    control,
    name: "applicationProcess",
  });

  useEffect(() => {
    if (scholarshipSection) {
      reset({
        title: scholarshipSection.title,
        description: scholarshipSection.description,
        requirements: scholarshipSection.requirements && scholarshipSection.requirements.length > 0 
          ? scholarshipSection.requirements 
          : [""],
        applicationProcess: scholarshipSection.applicationProcess && scholarshipSection.applicationProcess.length > 0 
          ? scholarshipSection.applicationProcess 
          : [""],
        buttonText: scholarshipSection.buttonText || "",
        buttonUrl: scholarshipSection.buttonUrl || "",
        backgroundColor: scholarshipSection.backgroundColor || "#f9fafe",
      });
    }
  }, [scholarshipSection, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: ScholarshipSectionFormValues) => {
      const response = await apiRequest("PUT", "/api/admin/scholarship-section", data);
      if (!response.ok) {
        throw new Error("Failed to update scholarship section");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Scholarship section updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/scholarship-section"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/scholarship-section"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update scholarship section",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ScholarshipSectionFormValues) => {
    updateMutation.mutate(data);
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
        <h2 className="text-2xl font-bold">Scholarship Section Editor</h2>
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
          <ScholarshipSection 
            title={watchedValues.title}
            description={watchedValues.description}
            requirements={watchedValues.requirements.filter(Boolean)}
            applicationProcess={watchedValues.applicationProcess.filter(Boolean)}
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
                <Label htmlFor="description">Section Description</Label>
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

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Requirements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendRequirement("")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Requirement
                  </Button>
                </div>

                <div className="space-y-3">
                  {requirementsFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Textarea
                        {...register(`requirements.${index}` as const)}
                        placeholder={`Requirement ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                        disabled={requirementsFields.length === 1}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Application Process Steps</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendApplicationStep("")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Step
                  </Button>
                </div>

                <div className="space-y-3">
                  {applicationProcessFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Textarea
                        {...register(`applicationProcess.${index}` as const)}
                        placeholder={`Step ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeApplicationStep(index)}
                        disabled={applicationProcessFields.length === 1}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
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

export default ScholarshipSectionEditor;
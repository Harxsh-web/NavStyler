import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Define the Zod schema for validation
const guaranteeSectionFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  content: z.string().min(1, "Content is required"),
  backgroundColor: z.string().optional(),
});

type GuaranteeSectionFormValues = z.infer<typeof guaranteeSectionFormSchema>;

export default function GuaranteeSectionEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Fetch the current guarantee section data
  const { data: guaranteeSection, isLoading } = useQuery({
    queryKey: ["/api/content/guarantee-section"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/content/guarantee-section");
      const data = await res.json();
      return data;
    },
  });

  // Set up the form with default values
  const form = useForm<GuaranteeSectionFormValues>({
    resolver: zodResolver(guaranteeSectionFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      backgroundColor: "#F9F9F7",
    },
    values: guaranteeSection || undefined,
  });

  // Update the guarantee section
  const mutation = useMutation({
    mutationFn: async (data: GuaranteeSectionFormValues) => {
      const res = await apiRequest("PUT", "/api/admin/guarantee-section", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Guarantee section has been saved.",
        className: "bg-green-500 text-white border-none",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/guarantee-section"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to save: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GuaranteeSectionFormValues) => {
    mutation.mutate(data);
  };

  const handleSaveAndPreview = () => {
    const values = form.getValues();
    mutation.mutate(values, {
      onSuccess: () => {
        setIsPreviewOpen(true);
        window.open("/", "_blank");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guarantee Section</CardTitle>
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter section content"
                      className="min-h-[200px]"
                      {...field}
                    />
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
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="#F9F9F7"
                        {...field}
                        value={field.value || "#F9F9F7"}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        type="color"
                        className="w-12 p-1 h-10"
                        {...field}
                        value={field.value || "#F9F9F7"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveAndPreview}
                disabled={mutation.isPending}
              >
                Save and Preview
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
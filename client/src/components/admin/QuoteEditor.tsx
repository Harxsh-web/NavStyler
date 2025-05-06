import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Schema for quote form
const quoteSchema = z.object({
  content: z.string().optional(),
  heading: z.string().optional(),
  backgroundColor: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteEditor() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/admin/quote"],
  });
  
  const updateMutation = useMutation({
    mutationFn: async (values: QuoteFormValues) => {
      const res = await apiRequest("POST", "/api/admin/quote", values);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quote"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/quote"] });
    },
  });
  
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Form for section data
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      content: "",
      heading: "",
      backgroundColor: "#fffcf1",
    },
  });

  // Update form when data is loaded
  if (data && !isEditing) {
    form.reset({
      content: data.content || "",
      heading: data.heading || "",
      backgroundColor: data.backgroundColor || "#fffcf1",
    });
    setIsEditing(true);
  }

  const onSubmit = (values: QuoteFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Quote updated successfully",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to update quote",
          variant: "destructive",
        });
      },
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
        <CardTitle>Featured Quote</CardTitle>
        <CardDescription>
          Edit the quote displayed in the quote section
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Productivity isn't about how much you do, it's about how good you feel about what you're doing."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Luke Mikic" {...field} />
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
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <div 
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: field.value }}
                    />
                    <FormControl>
                      <Input 
                        type="color" 
                        {...field} 
                        className="w-12 h-10 p-1" 
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default QuoteEditor;
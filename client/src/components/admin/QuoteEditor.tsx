import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useQuoteSection } from "@/hooks/use-content";
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

// Schema for quote section form
const quoteSchema = z.object({
  quote: z.string().min(1, "Quote is required"),
  author: z.string().min(1, "Author is required"),
  authorTitle: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteEditor() {
  const { data: quote, isLoading, error, updateMutation } = useQuoteSection();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      quote: "",
      author: "",
      authorTitle: "",
    },
  });

  // Update form when data is loaded
  if (quote && !isEditing) {
    form.reset({
      quote: quote.quote || "",
      author: quote.author || "",
      authorTitle: quote.authorTitle || "",
    });
    setIsEditing(true);
  }

  const onSubmit = (values: QuoteFormValues) => {
    updateMutation.mutate(values);
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

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Error loading quote section: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Quote Section</CardTitle>
        <CardDescription>Update the quote displayed on the home page</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter quote text..." 
                      className="min-h-28"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Title/Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author title or description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full sm:w-auto"
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
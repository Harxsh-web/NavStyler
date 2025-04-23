import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthorSection } from "@/hooks/use-content";
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

// Schema for author section form
const authorSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  bio: z.string().min(1, "Author bio is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  jobTitle: z.string().optional(),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
  linkedinHandle: z.string().optional(),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

export function AuthorEditor() {
  const { data: author, isLoading, error, updateMutation } = useAuthorSection();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: "",
      bio: "",
      imageUrl: "",
      jobTitle: "",
      twitterHandle: "",
      instagramHandle: "",
      linkedinHandle: "",
      websiteUrl: "",
    },
  });

  // Update form when data is loaded
  if (author && !isEditing) {
    form.reset({
      name: author.name || "",
      bio: author.bio || "",
      imageUrl: author.imageUrl || "",
      jobTitle: author.jobTitle || "",
      twitterHandle: author.twitterHandle || "",
      instagramHandle: author.instagramHandle || "",
      linkedinHandle: author.linkedinHandle || "",
      websiteUrl: author.websiteUrl || "",
    });
    setIsEditing(true);
  }

  const onSubmit = (values: AuthorFormValues) => {
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
          <p className="text-destructive">Error loading author section: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Author Information</CardTitle>
        <CardDescription>Update the author details for the book</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title/Role (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Author, Productivity Expert, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Biography</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter author's biography..." 
                      className="min-h-32"
                      {...field} 
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
                  <FormLabel>Author Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/author-image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Social Media & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="twitterHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Handle (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="@username (without the @)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instagramHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram Handle (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="username (without the @)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="linkedinHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Handle (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
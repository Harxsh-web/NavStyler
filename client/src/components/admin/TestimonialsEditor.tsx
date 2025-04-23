import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTestimonials, useTestimonialSection } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Loader2, Plus, Edit, Trash2, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Schema for section title
const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
});

// Schema for testimonial
const testimonialSchema = z.object({
  author: z.string().min(1, "Author name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1, "Testimonial content is required"),
  rating: z.number().int().min(1).max(5).optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type SectionFormValues = z.infer<typeof sectionSchema>;
type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export function TestimonialsEditor() {
  const { 
    data: section, 
    isLoading: sectionLoading, 
    updateMutation: updateSectionMutation 
  } = useTestimonialSection();
  
  const { 
    data: testimonials, 
    isLoading: testimonialsLoading,
    createMutation: createTestimonialMutation,
    updateMutation: updateTestimonialMutation,
    deleteMutation: deleteTestimonialMutation
  } = useTestimonials();
  
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Form for section title
  const sectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Form for adding/editing testimonials
  const testimonialForm = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      author: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      avatarUrl: "",
    },
  });

  // Update section form when data is loaded
  if (section && !isEditing) {
    sectionForm.reset({
      title: section.title || "",
      description: section.description || "",
    });
    setIsEditing(true);
  }

  const onSectionSubmit = (values: SectionFormValues) => {
    updateSectionMutation.mutate(values);
  };

  const onAddTestimonialSubmit = (values: TestimonialFormValues) => {
    createTestimonialMutation.mutate(values, {
      onSuccess: () => {
        setShowAddDialog(false);
        testimonialForm.reset({
          author: "",
          role: "",
          company: "",
          content: "",
          rating: 5,
          avatarUrl: "",
        });
      }
    });
  };

  const onEditTestimonialSubmit = (values: TestimonialFormValues) => {
    if (selectedTestimonial) {
      updateTestimonialMutation.mutate({
        id: selectedTestimonial.id,
        values
      }, {
        onSuccess: () => {
          setShowEditDialog(false);
          setSelectedTestimonial(null);
        }
      });
    }
  };

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    testimonialForm.reset({
      author: testimonial.author || "",
      role: testimonial.role || "",
      company: testimonial.company || "",
      content: testimonial.content || "",
      rating: testimonial.rating || 5,
      avatarUrl: testimonial.avatarUrl || "",
    });
    setShowEditDialog(true);
  };

  const handleDelete = (id: number) => {
    deleteTestimonialMutation.mutate(id);
  };

  if (sectionLoading || testimonialsLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials Section</CardTitle>
          <CardDescription>Edit the section title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...sectionForm}>
            <form onSubmit={sectionForm.handleSubmit(onSectionSubmit)} className="space-y-6">
              <FormField
                control={sectionForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter section title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={sectionForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter section description" 
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={updateSectionMutation.isPending}
              >
                {updateSectionMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Section"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage customer testimonials about the book</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead className="w-28 text-center">Rating</TableHead>
                  <TableHead className="w-48 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial: any) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">
                        {testimonial.author}
                        {(testimonial.role || testimonial.company) && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {testimonial.role}
                            {testimonial.role && testimonial.company && ", "}
                            {testimonial.company}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {testimonial.content}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                            <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the testimonial from {testimonial.author}.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(testimonial.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                      No testimonials found. Add your first one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Testimonial</DialogTitle>
                <DialogDescription>
                  Add a new customer testimonial about the book.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...testimonialForm}>
                <form onSubmit={testimonialForm.handleSubmit(onAddTestimonialSubmit)} className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={testimonialForm.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={testimonialForm.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1-5)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={5}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value || "5"))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={testimonialForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., CEO, Student, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={testimonialForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Organization (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={testimonialForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter testimonial text" 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={testimonialForm.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={createTestimonialMutation.isPending}
                    >
                      {createTestimonialMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add Testimonial"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogDescription>
                  Edit the testimonial details.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...testimonialForm}>
                <form onSubmit={testimonialForm.handleSubmit(onEditTestimonialSubmit)} className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={testimonialForm.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={testimonialForm.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1-5)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={5}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value || "5"))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={testimonialForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., CEO, Student, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={testimonialForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Organization (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={testimonialForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter testimonial text" 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={testimonialForm.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={updateTestimonialMutation.isPending}
                    >
                      {updateTestimonialMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
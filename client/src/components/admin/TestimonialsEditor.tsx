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
import { Loader2, Plus, Edit, Trash2, Star, Video, ImageIcon } from "lucide-react";
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

// Define types for testimonials
interface Testimonial {
  id: number;
  author: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatarUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
}
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
  mediaType: z.enum(['image', 'video']).default('image'),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
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
      mediaType: "image",
      avatarUrl: "",
      videoUrl: "",
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
          mediaType: "image",
          avatarUrl: "",
          videoUrl: "",
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
      mediaType: testimonial.mediaType || "image",
      avatarUrl: testimonial.avatarUrl || "",
      videoUrl: testimonial.videoUrl || "",
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
                  <TableHead className="w-24 text-center">Media Type</TableHead>
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
                      <TableCell className="text-center">
                        {testimonial.mediaType === 'video' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Video className="h-3 w-3 mr-1" />
                            Video
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Image
                          </span>
                        )}
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
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
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
                  
                  <div className="border rounded-md p-4 bg-gray-50">
                    <h3 className="text-sm font-medium mb-3">Media Type</h3>
                    <FormField
                      control={testimonialForm.control}
                      name="mediaType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="image-type"
                                checked={field.value === 'image'}
                                onChange={() => field.onChange('image')}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor="image-type" className="text-sm font-medium text-gray-700">
                                Image
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="video-type"
                                checked={field.value === 'video'}
                                onChange={() => field.onChange('video')}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor="video-type" className="text-sm font-medium text-gray-700">
                                Video
                              </label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {testimonialForm.watch('mediaType') === 'image' && (
                    <FormField
                      control={testimonialForm.control}
                      name="avatarUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/avatar.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2">
                              <img 
                                src={field.value} 
                                alt="Avatar preview" 
                                className="h-16 w-16 object-cover rounded-full border" 
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100?text=Invalid+URL'}
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {testimonialForm.watch('mediaType') === 'video' && (
                    <FormField
                      control={testimonialForm.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/video.mp4 or YouTube link" {...field} />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter a direct video URL or YouTube/Vimeo embed link
                          </p>
                        </FormItem>
                      )}
                    />
                  )}
                  
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
                  
                  <div className="border rounded-md p-4 bg-gray-50">
                    <h3 className="text-sm font-medium mb-3">Media Type</h3>
                    <FormField
                      control={testimonialForm.control}
                      name="mediaType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="edit-image-type"
                                checked={field.value === 'image'}
                                onChange={() => field.onChange('image')}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor="edit-image-type" className="text-sm font-medium text-gray-700">
                                Image
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="edit-video-type"
                                checked={field.value === 'video'}
                                onChange={() => field.onChange('video')}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor="edit-video-type" className="text-sm font-medium text-gray-700">
                                Video
                              </label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {testimonialForm.watch('mediaType') === 'image' && (
                    <FormField
                      control={testimonialForm.control}
                      name="avatarUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/avatar.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2">
                              <img 
                                src={field.value} 
                                alt="Avatar preview" 
                                className="h-16 w-16 object-cover rounded-full border" 
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100?text=Invalid+URL'}
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {testimonialForm.watch('mediaType') === 'video' && (
                    <FormField
                      control={testimonialForm.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/video.mp4 or YouTube link" {...field} />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter a direct video URL or YouTube/Vimeo embed link
                          </p>
                        </FormItem>
                      )}
                    />
                  )}
                  
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
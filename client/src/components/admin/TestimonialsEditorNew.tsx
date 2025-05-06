import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2, Video, ImageIcon, BarChart } from "lucide-react";
import { MediaUploader } from "@/components/ui/MediaUploader";
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
import { Switch } from "@/components/ui/switch";

// Define types for testimonials
interface Testimonial {
  id: number;
  name: string;
  title?: string;
  quote: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
  showMobile: boolean;
  subscriberCount?: number;
  growthChartUrl?: string;
  hasGrowthChart?: boolean;
  headline?: string;
  subheadline?: string;
}

// Schema for section title
const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
});

// Schema for testimonial
const testimonialSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  quote: z.string().min(1, "Testimonial quote is required"),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  subscriberCount: z.number().optional(),
  mediaType: z.enum(['image', 'video']).default('image'),
  imageUrl: z.string().optional().or(z.literal("")),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  growthChartUrl: z.string().optional().or(z.literal("")),
  hasGrowthChart: z.boolean().default(false),
  showMobile: z.boolean().default(true),
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
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
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
      name: "",
      title: "",
      quote: "",
      headline: "",
      subheadline: "",
      subscriberCount: undefined,
      mediaType: "image",
      imageUrl: "",
      videoUrl: "",
      growthChartUrl: "",
      hasGrowthChart: false,
      showMobile: true,
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
          name: "",
          title: "",
          quote: "",
          headline: "",
          subheadline: "",
          subscriberCount: undefined,
          mediaType: "image",
          imageUrl: "",
          videoUrl: "",
          growthChartUrl: "",
          hasGrowthChart: false,
          showMobile: true,
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

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    testimonialForm.reset({
      name: testimonial.name || "",
      title: testimonial.title || "",
      quote: testimonial.quote || "",
      headline: testimonial.headline || "",
      subheadline: testimonial.subheadline || "",
      subscriberCount: testimonial.subscriberCount,
      mediaType: testimonial.mediaType || "image",
      imageUrl: testimonial.imageUrl || "",
      videoUrl: testimonial.videoUrl || "",
      growthChartUrl: testimonial.growthChartUrl || "",
      hasGrowthChart: testimonial.hasGrowthChart || false,
      showMobile: testimonial.showMobile !== false,
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
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
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
          <CardDescription>Manage testimonials with YouTube analytics and growth charts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mb-4">
            <div className="relative w-full overflow-visible">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Title</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Quote Preview</th>
                    <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-24">Media Type</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-48">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial: Testimonial) => (
                    <tr key={testimonial.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                        {testimonial.name}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                        {testimonial.title}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 max-w-xs truncate">
                        {testimonial.quote}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center">
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
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog >
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="icon"
                                className="delete-button"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>

                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription >
                                  This will permanently delete this testimonial{testimonial.name ? ` from ${testimonial.name}` : ''}.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(testimonial.id)}
                                  className="delete-button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td colSpan={5} className="p-4 align-middle [&:has([role=checkbox])]:pr-0 h-24 text-center">
                      No testimonials found. Add one below.
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white overflow-y-auto max-h-[85vh]">
              <DialogHeader>
                <DialogTitle>Add Testimonial</DialogTitle>
                <DialogDescription>
                  Add a new testimonial to showcase on the website.
                </DialogDescription>
              </DialogHeader>
              <Form {...testimonialForm}>
                <form onSubmit={testimonialForm.handleSubmit(onAddTestimonialSubmit)} className="space-y-4">
                  <FormField
                    control={testimonialForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title/Position (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO, Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Main headline for the testimonial" {...field} />
                        </FormControl>
                        <FormDescription>
                          Top headline displayed above the testimonial
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="subheadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subheadline (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Secondary headline" {...field} />
                        </FormControl>
                        <FormDescription>
                          Appears below the main headline
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="subscriberCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscriber Count (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="624000" 
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : parseInt(value));
                            }}
                            value={field.value === undefined ? "" : field.value}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of YouTube subscribers (will be formatted as 624K)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="quote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Quote</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="This book changed my life..." 
                            className="min-h-24" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media Type</FormLabel>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant={field.value === 'image' ? 'default' : 'outline'}
                            className={field.value === 'image' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            onClick={() => field.onChange('image')}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Image
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === 'video' ? 'default' : 'outline'}
                            className={field.value === 'video' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            onClick={() => field.onChange('video')}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Video
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch('mediaType') === 'image' && (
                    <FormField
                      control={testimonialForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader 
                                mediaType="image" 
                                value={field.value || ''} 
                                onChange={field.onChange}
                              />
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
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
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            YouTube, Vimeo or other video URL
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={testimonialForm.control}
                    name="hasGrowthChart"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include Growth Chart</FormLabel>
                          <FormDescription>
                            Show YouTube analytics growth chart image
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch('hasGrowthChart') && (
                    <FormField
                      control={testimonialForm.control}
                      name="growthChartUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Chart Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader 
                                mediaType="image" 
                                value={field.value || ''} 
                                onChange={field.onChange}
                              />
                              <Input 
                                placeholder="https://example.com/growth-chart.jpg" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            URL to YouTube analytics graph image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={testimonialForm.control}
                    name="showMobile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show on Mobile</FormLabel>
                          <FormDescription>
                            Display this testimonial on mobile devices
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" disabled={createTestimonialMutation.isPending}>
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
            <DialogContent className="sm:max-w-[550px] bg-white overflow-y-auto max-h-[85vh]">
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogDescription>
                  Update the testimonial information.
                </DialogDescription>
              </DialogHeader>
              <Form {...testimonialForm}>
                <form onSubmit={testimonialForm.handleSubmit(onEditTestimonialSubmit)} className="space-y-4">
                  <FormField
                    control={testimonialForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title/Position (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO, Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Main headline for the testimonial" {...field} />
                        </FormControl>
                        <FormDescription>
                          Top headline displayed above the testimonial
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="subheadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subheadline (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Secondary headline" {...field} />
                        </FormControl>
                        <FormDescription>
                          Appears below the main headline
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="subscriberCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscriber Count (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="624000" 
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : parseInt(value));
                            }}
                            value={field.value === undefined ? "" : field.value}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of YouTube subscribers (will be formatted as 624K)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="quote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Quote</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="This book changed my life..." 
                            className="min-h-24" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testimonialForm.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media Type</FormLabel>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant={field.value === 'image' ? 'default' : 'outline'}
                            className={field.value === 'image' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            onClick={() => field.onChange('image')}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Image
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === 'video' ? 'default' : 'outline'}
                            className={field.value === 'video' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            onClick={() => field.onChange('video')}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Video
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch('mediaType') === 'image' && (
                    <FormField
                      control={testimonialForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader 
                                mediaType="image" 
                                value={field.value || ''} 
                                onChange={field.onChange}
                              />
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
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
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            YouTube, Vimeo or other video URL
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={testimonialForm.control}
                    name="hasGrowthChart"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include Growth Chart</FormLabel>
                          <FormDescription>
                            Show YouTube analytics growth chart image
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch('hasGrowthChart') && (
                    <FormField
                      control={testimonialForm.control}
                      name="growthChartUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Chart Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader 
                                mediaType="image" 
                                value={field.value || ''} 
                                onChange={field.onChange}
                              />
                              <Input 
                                placeholder="https://example.com/growth-chart.jpg" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            URL to YouTube analytics graph image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={testimonialForm.control}
                    name="showMobile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show on Mobile</FormLabel>
                          <FormDescription>
                            Display this testimonial on mobile devices
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" disabled={updateTestimonialMutation.isPending}>
                      {updateTestimonialMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Testimonial"
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
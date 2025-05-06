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

// Schema for section title and success story
const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  successStory: z.string().optional(),
  successStoryName: z.string().optional().default("Brandon"),
  initialSubs: z.coerce.number().optional().default(700),
  currentSubs: z.coerce.number().optional().default(10000),
  timeframeSubs: z.string().optional().default("18 months"),
  viewsIncrease: z.coerce.number().optional().default(6300),
  initialViews: z.coerce.number().optional().default(90),
  finalViews: z.coerce.number().optional().default(5700),
  workPeriod: z.string().optional().default("12 weeks"),
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

  // Form for section title and success story
  const sectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
      successStory: "",
      successStoryName: "Brandon",
      initialSubs: 700,
      currentSubs: 10000,
      timeframeSubs: "18 months",
      viewsIncrease: 6300,
      initialViews: 90,
      finalViews: 5700,
      workPeriod: "12 weeks",
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
      successStory: section.successStory || "",
      successStoryName: section.successStoryName || "Brandon",
      initialSubs: section.initialSubs || 700,
      currentSubs: section.currentSubs || 10000,
      timeframeSubs: section.timeframeSubs || "18 months",
      viewsIncrease: section.viewsIncrease || 6300,
      initialViews: section.initialViews || 90,
      finalViews: section.finalViews || 5700,
      workPeriod: section.workPeriod || "12 weeks",
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
        // Keep the form values except for the quote which should be reset
        // This allows users to quickly add multiple testimonials with similar settings
        testimonialForm.reset({
          ...values,
          quote: "", // Reset only the quote field
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

              <div className="my-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Success Story Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={sectionForm.control}
                    name="successStoryName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Creator Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Brandon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="timeframeSubs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeframe for Growth</FormLabel>
                        <FormControl>
                          <Input placeholder="18 months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="workPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Working Period</FormLabel>
                        <FormControl>
                          <Input placeholder="12 weeks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="initialSubs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Subscribers</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="currentSubs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Subscribers</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="initialViews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Views</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="90" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="finalViews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Views</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sectionForm.control}
                    name="viewsIncrease"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Views Percentage Increase</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="6300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={sectionForm.control}
                  name="successStory"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Success Story Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the success story in detail..." 
                          className="min-h-20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        {testimonial.name || "Anonymous"}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {testimonial.title || "N/A"}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {testimonial.quote.length > 50 ? `${testimonial.quote.substring(0, 50)}...` : testimonial.quote}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center">
                        {testimonial.mediaType === 'video' ? (
                          <Video className="h-5 w-5 inline-block text-blue-500" />
                        ) : testimonial.hasGrowthChart ? (
                          <BarChart className="h-5 w-5 inline-block text-green-500" />
                        ) : (
                          <ImageIcon className="h-5 w-5 inline-block text-gray-500" />
                        )}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(testimonial)}
                          className="mr-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the testimonial.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() => handleDelete(testimonial.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                      No testimonials found. Click "Add Testimonial" to create one.
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
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
                setShowAddDialog(true);
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>

          {/* Add Testimonial Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[550px] bg-white overflow-y-auto max-h-[85vh]">
              <DialogHeader>
                <DialogTitle>Add Testimonial</DialogTitle>
                <DialogDescription>
                  Fill out the form to add a new testimonial.
                </DialogDescription>
              </DialogHeader>
              <Form {...testimonialForm}>
                <form onSubmit={testimonialForm.handleSubmit(onAddTestimonialSubmit)} className="space-y-4">
                  <FormField
                    control={testimonialForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (optional)</FormLabel>
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
                        <FormLabel>Title (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO at Company" {...field} />
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
                          <Input placeholder="Main headline" {...field} />
                        </FormControl>
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
                          <Input placeholder="Subheadline text" {...field} />
                        </FormControl>
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
                            placeholder="Enter testimonial quote" 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
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
                            placeholder="10000" 
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : parseInt(value));
                            }}
                            value={field.value === undefined ? "" : field.value}
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
                        <div className="flex space-x-4">
                          <div
                            className={`p-4 border rounded-md cursor-pointer ${
                              field.value === "image" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => field.onChange("image")}
                          >
                            <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-center font-medium">Image</p>
                          </div>
                          <div
                            className={`p-4 border rounded-md cursor-pointer ${
                              field.value === "video" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => field.onChange("video")}
                          >
                            <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-center font-medium">Video</p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch("mediaType") === "image" && (
                    <FormField
                      control={testimonialForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image URL (optional)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader
                                value={field.value || ""}
                                onChange={field.onChange}
                                accept="image/*"
                                endpoint="imageUploader"
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

                  {testimonialForm.watch("mediaType") === "video" && (
                    <FormField
                      control={testimonialForm.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube Video URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a YouTube video URL
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
                            Display YouTube analytics growth chart
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch("hasGrowthChart") && (
                    <FormField
                      control={testimonialForm.control}
                      name="growthChartUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Chart Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader
                                value={field.value || ""}
                                onChange={field.onChange}
                                accept="image/*"
                                endpoint="imageUploader"
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

          {/* Edit Testimonial Dialog */}
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
                        <FormLabel>Name (optional)</FormLabel>
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
                        <FormLabel>Title (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO at Company" {...field} />
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
                          <Input placeholder="Main headline" {...field} />
                        </FormControl>
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
                          <Input placeholder="Subheadline text" {...field} />
                        </FormControl>
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
                            placeholder="Enter testimonial quote" 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
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
                            placeholder="10000" 
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : parseInt(value));
                            }}
                            value={field.value === undefined ? "" : field.value}
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
                        <div className="flex space-x-4">
                          <div
                            className={`p-4 border rounded-md cursor-pointer ${
                              field.value === "image" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => field.onChange("image")}
                          >
                            <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-center font-medium">Image</p>
                          </div>
                          <div
                            className={`p-4 border rounded-md cursor-pointer ${
                              field.value === "video" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => field.onChange("video")}
                          >
                            <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-center font-medium">Video</p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch("mediaType") === "image" && (
                    <FormField
                      control={testimonialForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image URL (optional)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader
                                value={field.value || ""}
                                onChange={field.onChange}
                                accept="image/*"
                                endpoint="imageUploader"
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

                  {testimonialForm.watch("mediaType") === "video" && (
                    <FormField
                      control={testimonialForm.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube Video URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a YouTube video URL
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
                            Display YouTube analytics growth chart
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {testimonialForm.watch("hasGrowthChart") && (
                    <FormField
                      control={testimonialForm.control}
                      name="growthChartUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Chart Image URL</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <MediaUploader
                                value={field.value || ""}
                                onChange={field.onChange}
                                accept="image/*"
                                endpoint="imageUploader"
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
                  
                  <div className="border-t mt-8 pt-6">
                    <h3 className="text-lg font-medium mb-4">Success Story Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Note: These settings are shared across all testimonials and are edited in the main section settings.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Creator Name</h4>
                        <p className="text-sm text-muted-foreground">{section?.successStoryName || "Brandon"}</p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Timeframe for Growth</h4>
                        <p className="text-sm text-muted-foreground">{section?.timeframeSubs || "18 months"}</p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Working Period</h4>
                        <p className="text-sm text-muted-foreground">{section?.workPeriod || "12 weeks"}</p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Subscriber Growth</h4>
                        <p className="text-sm text-muted-foreground">
                          {section?.initialSubs || 700} → {section?.currentSubs || 10000} subscribers
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Views Increase</h4>
                        <p className="text-sm text-muted-foreground">{section?.viewsIncrease || 6300}%</p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-1">Views Growth</h4>
                        <p className="text-sm text-muted-foreground">
                          {section?.initialViews || 90} → {section?.finalViews || 5700} views
                        </p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-md mt-4">
                      <h4 className="font-medium mb-1">Success Story</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {section?.successStory || "Edit the success story in the section settings above"}
                      </p>
                    </div>
                  </div>

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
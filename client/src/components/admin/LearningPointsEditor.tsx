import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLearningPoints, useLearningPointsSection } from "@/hooks/use-content";
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
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
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

// Schema for learning point
const learningPointSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  iconName: z.string().optional(),
  order: z.number().int().min(1, "Order must be a positive number"),
});

type SectionFormValues = z.infer<typeof sectionSchema>;
type LearningPointFormValues = z.infer<typeof learningPointSchema>;

export function LearningPointsEditor() {
  const { 
    data: section, 
    isLoading: sectionLoading, 
    updateMutation: updateSectionMutation 
  } = useLearningPointsSection();
  
  const { 
    data: learningPoints, 
    isLoading: pointsLoading,
    createMutation: createPointMutation,
    updateMutation: updatePointMutation,
    deleteMutation: deletePointMutation
  } = useLearningPoints();
  
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Form for section title
  const sectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Form for adding/editing points
  const pointForm = useForm<LearningPointFormValues>({
    resolver: zodResolver(learningPointSchema),
    defaultValues: {
      title: "",
      description: "",
      iconName: "",
      order: 1,
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

  const onAddPointSubmit = (values: LearningPointFormValues) => {
    createPointMutation.mutate(values, {
      onSuccess: () => {
        setShowAddDialog(false);
        pointForm.reset({
          title: "",
          description: "",
          iconName: "",
          order: (learningPoints?.length || 0) + 1,
        });
      }
    });
  };

  const onEditPointSubmit = (values: LearningPointFormValues) => {
    if (selectedPoint) {
      updatePointMutation.mutate({
        id: selectedPoint.id,
        values
      }, {
        onSuccess: () => {
          setShowEditDialog(false);
          setSelectedPoint(null);
        }
      });
    }
  };

  const handleEdit = (point: any) => {
    setSelectedPoint(point);
    pointForm.reset({
      title: point.title || "",
      description: point.description || "",
      iconName: point.iconName || "",
      order: point.order || 1,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (id: number) => {
    deletePointMutation.mutate(id);
  };

  if (sectionLoading || pointsLoading) {
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
          <CardTitle>Learning Points Section</CardTitle>
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

      {/* Learning Points List */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Points</CardTitle>
          <CardDescription>Manage the key learning points from the book</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-48 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learningPoints && learningPoints.length > 0 ? (
                  learningPoints.sort((a: any, b: any) => a.order - b.order).map((point: any) => (
                    <TableRow key={point.id}>
                      <TableCell className="text-center">{point.order}</TableCell>
                      <TableCell>{point.title}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEdit(point)}
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
                                  This will permanently delete the learning point "{point.title}".
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(point.id)}
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
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                      No learning points found. Add your first one.
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
                Add Learning Point
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Learning Point</DialogTitle>
                <DialogDescription>
                  Add a new learning point to showcase in the book section.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...pointForm}>
                <form onSubmit={pointForm.handleSubmit(onAddPointSubmit)} className="space-y-6 py-4">
                  <FormField
                    control={pointForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter point title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter point description" 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="iconName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Name (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., lightning-bolt, star, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value || "1"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={createPointMutation.isPending}
                    >
                      {createPointMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add Learning Point"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Learning Point</DialogTitle>
                <DialogDescription>
                  Edit the learning point details.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...pointForm}>
                <form onSubmit={pointForm.handleSubmit(onEditPointSubmit)} className="space-y-6 py-4">
                  <FormField
                    control={pointForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter point title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter point description" 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="iconName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Name (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., lightning-bolt, star, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pointForm.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value || "1"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={updatePointMutation.isPending}
                    >
                      {updatePointMutation.isPending ? (
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
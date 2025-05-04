import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Trash2, Plus, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import MilestoneTracker from "../MilestoneTracker";

// Define the milestone schema for form validation
const milestoneSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  iconName: z.string().optional(),
  targetDate: z.string().optional(),
  dateReached: z.string().optional(),
  color: z.string().default("#4f46e5"),
  completed: z.boolean().default(false),
  progress: z.number().min(0).max(100).default(0),
  order: z.number().min(0).default(0),
});

interface Milestone {
  id: number;
  title: string;
  description?: string;
  dateReached?: string;
  targetDate?: string;
  iconName?: string;
  order: number;
  completed: boolean;
  progress: number;
  color: string;
  updatedAt: string;
}

const iconOptions = [
  { value: "check", label: "Check" },
  { value: "circle", label: "Circle" },
  { value: "clock", label: "Clock" },
  { value: "award", label: "Award" },
  { value: "rocket", label: "Rocket" },
  { value: "star", label: "Star" },
  { value: "trophy", label: "Trophy" },
  { value: "target", label: "Target" },
  { value: "book", label: "Book" },
  { value: "zap", label: "Zap" },
  { value: "card", label: "Card" }
];

const colorOptions = [
  { value: "#4f46e5", label: "Indigo" },
  { value: "#0ea5e9", label: "Blue" },
  { value: "#10b981", label: "Green" },
  { value: "#ef4444", label: "Red" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#ec4899", label: "Pink" },
  { value: "#6366f1", label: "Violet" },
  { value: "#84cc16", label: "Lime" },
  { value: "#14b8a6", label: "Teal" },
];

export default function MilestonesEditor() {
  const { toast } = useToast();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch all milestones
  const { data: milestones, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/admin/milestones"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/milestones");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch milestones");
      }
      return await response.json();
    }
  });

  // Form setup for editing existing milestones
  const form = useForm<z.infer<typeof milestoneSchema>>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      title: "",
      description: "",
      iconName: "target",
      color: "#4f46e5",
      completed: false,
      progress: 0,
      order: 0,
    },
  });

  // Form setup for adding new milestones
  const addForm = useForm<z.infer<typeof milestoneSchema>>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      title: "",
      description: "",
      iconName: "target",
      color: "#4f46e5",
      completed: false,
      progress: 0,
      order: 0,
    },
  });

  // Update milestone mutation
  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof milestoneSchema>) => {
      if (!selectedMilestone) throw new Error("No milestone selected");
      
      const response = await apiRequest(
        "PUT",
        `/api/admin/milestones/${selectedMilestone.id}`,
        values
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update milestone");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Milestone updated successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/milestones"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/milestones"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update milestone",
        variant: "destructive",
      });
    },
  });

  // Create milestone mutation
  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof milestoneSchema>) => {
      const response = await apiRequest("POST", "/api/admin/milestones", values);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create milestone");
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Milestone created successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/milestones"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/milestones"] });
      setIsAddDialogOpen(false);
      addForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create milestone",
        variant: "destructive",
      });
    },
  });

  // Delete milestone mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/milestones/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete milestone");
      }
      
      return id;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Milestone deleted successfully",
        variant: "success",
      });
      setSelectedMilestone(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/milestones"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/milestones"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete milestone",
        variant: "destructive",
      });
    },
  });

  // Handle milestone selection for editing
  const handleSelectMilestone = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    form.reset({
      title: milestone.title,
      description: milestone.description || "",
      iconName: milestone.iconName || "target",
      targetDate: milestone.targetDate ? new Date(milestone.targetDate).toISOString().split('T')[0] : "",
      dateReached: milestone.dateReached ? new Date(milestone.dateReached).toISOString().split('T')[0] : "",
      color: milestone.color,
      completed: milestone.completed,
      progress: milestone.progress,
      order: milestone.order,
    });
  };

  // Handle update submit
  const onUpdateSubmit = (values: z.infer<typeof milestoneSchema>) => {
    updateMutation.mutate(values);
  };

  // Handle create submit
  const onCreateSubmit = (values: z.infer<typeof milestoneSchema>) => {
    createMutation.mutate(values);
  };

  // Handle delete
  const handleDelete = () => {
    if (selectedMilestone) {
      if (confirm("Are you sure you want to delete this milestone?")) {
        deleteMutation.mutate(selectedMilestone.id);
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Milestones Editor</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
              </DialogHeader>
              <Form {...addForm}>
                <form onSubmit={addForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                      <FormField
                        control={addForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={addForm.control}
                          name="iconName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {iconOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {colorOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={addForm.control}
                          name="targetDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addForm.control}
                          name="dateReached"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Reached</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={addForm.control}
                        name="completed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Completed</FormLabel>
                              <FormDescription>
                                Mark this milestone as completed
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="progress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Progress ({field.value}%)</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="order"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Order</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Lower numbers appear first
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </ScrollArea>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Milestone
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="edit">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit Milestones</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>
                  Select a milestone to edit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!milestones || milestones.length === 0 ? (
                  <p className="text-muted-foreground">No milestones found. Add one to get started.</p>
                ) : (
                  <div className="space-y-2">
                    {milestones.map((milestone) => (
                      <Button
                        key={milestone.id}
                        variant={selectedMilestone?.id === milestone.id ? "default" : "outline"}
                        className="w-full justify-start text-left flex gap-2 items-center h-auto py-2"
                        onClick={() => handleSelectMilestone(milestone)}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: milestone.color }}
                        ></div>
                        <div>
                          <div className="font-medium">{milestone.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {milestone.completed ? 'Completed' : `${milestone.progress}% complete`}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedMilestone ? "Edit Milestone" : "Select a Milestone"}
                </CardTitle>
                <CardDescription>
                  {selectedMilestone
                    ? `Editing: ${selectedMilestone.title}`
                    : "Select a milestone from the list to edit it"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedMilestone ? (
                  <p className="text-muted-foreground">
                    Please select a milestone to edit its details or add a new one.
                  </p>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="iconName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {iconOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {colorOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="targetDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dateReached"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Reached</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="completed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Completed</FormLabel>
                              <FormDescription>
                                Mark this milestone as completed
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="progress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Progress ({field.value}%)</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Order</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Lower numbers appear first
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                        <Button type="submit" disabled={updateMutation.isPending}>
                          {updateMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="max-w-3xl mx-auto">
            <MilestoneTracker />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
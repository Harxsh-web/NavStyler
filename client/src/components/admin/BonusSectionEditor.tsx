import React, { useState } from 'react';
import { BonusSection, BonusItem, insertBonusSectionSchema, insertBonusItemSchema } from '@shared/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GiftIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Celebration } from '@/components/ui/Celebration';
import { useCelebration } from '@/components/ui/Celebration';

// Create extended schemas with validation
// Note: Only include fields that exist in the database
const bonusSectionFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  backgroundColor: z.string().optional(),
});

const bonusItemFormSchema = insertBonusItemSchema.extend({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  sectionId: z.number(),
  orderIndex: z.number(),
  imageUrl: z.string().optional().nullable(),
  backgroundColor: z.string().optional(),
});

type BonusSectionFormValues = z.infer<typeof bonusSectionFormSchema>;
type BonusItemFormValues = z.infer<typeof bonusItemFormSchema>;

interface BonusSectionEditorProps {
  bonusSection?: BonusSection;
  bonusItems?: BonusItem[];
}

const BonusSectionEditor: React.FC<BonusSectionEditorProps> = ({ 
  bonusSection, 
  bonusItems = []
}) => {
  const { toast } = useToast();
  const celebrate = useCelebration();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<BonusItem[]>(bonusItems);
  const [activeTab, setActiveTab] = useState('section');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [sectionSaveSuccess, setSectionSaveSuccess] = useState(false);
  const [itemSaveSuccess, setItemSaveSuccess] = useState(false);

  // Form for the section
  const sectionForm = useForm<BonusSectionFormValues>({
    resolver: zodResolver(bonusSectionFormSchema),
    defaultValues: {
      title: bonusSection?.title || 'Wait, did you say free bonuses?',
      subtitle: bonusSection?.subtitle || "Yup. We've decided to bundle in a bunch of free bonuses, just for fun:",
      backgroundColor: bonusSection?.backgroundColor || '#E6F1FE',
    },
  });

  // Form for bonus items
  const itemForm = useForm<BonusItemFormValues>({
    resolver: zodResolver(bonusItemFormSchema),
    defaultValues: {
      title: '',
      description: '',
      orderIndex: items.length,
      sectionId: bonusSection?.id || 0,
      imageUrl: null,
      backgroundColor: '#FFE382',
    },
  });

  // Mutations
  const updateSectionMutation = useMutation({
    mutationFn: async (data: Partial<BonusSectionFormValues>) => {
      const res = await apiRequest('PUT', '/api/admin/bonus-section', data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/bonus-section'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content/bonus-section'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      
      // Trigger confetti celebration
      celebrate('small');
      setSectionSaveSuccess(true);
      setTimeout(() => setSectionSaveSuccess(false), 2000);
      
      toast({
        title: 'Section updated',
        description: 'Bonus section has been successfully updated',
        className: "bg-green-500 text-white border-none",
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update section',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: BonusItemFormValues) => {
      const res = await apiRequest('POST', '/api/admin/bonus-items', data);
      return await res.json();
    },
    onSuccess: (newItem) => {
      setItems([...items, newItem]);
      itemForm.reset({
        title: '',
        description: '',
        orderIndex: items.length + 1,
        sectionId: bonusSection?.id || 0,
        imageUrl: null,
        backgroundColor: '#FFE382',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      
      // Trigger confetti celebration
      celebrate('medium');
      setItemSaveSuccess(true);
      setTimeout(() => setItemSaveSuccess(false), 2000);
      
      toast({
        title: 'Item added',
        description: 'New bonus item has been successfully added',
        className: "bg-green-500 text-white border-none",
      });
      setActiveTab('items');
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to add item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<BonusItemFormValues> }) => {
      const res = await apiRequest('PUT', `/api/admin/bonus-items/${id}`, data);
      return await res.json();
    },
    onSuccess: (updatedItem) => {
      setItems(items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));
      setEditingItemId(null);
      itemForm.reset({
        title: '',
        description: '',
        orderIndex: items.length,
        sectionId: bonusSection?.id || 0,
        imageUrl: null,
        backgroundColor: '#FFE382',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      
      // Trigger confetti celebration
      celebrate('small');
      setItemSaveSuccess(true);
      setTimeout(() => setItemSaveSuccess(false), 2000);
      
      toast({
        title: 'Item updated',
        description: 'Bonus item has been successfully updated',
        className: "bg-green-500 text-white border-none",
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/admin/bonus-items/${id}`);
      return await res.json();
    },
    onSuccess: (_, id) => {
      setItems(items.filter(item => item.id !== id));
      queryClient.invalidateQueries({ queryKey: ['/api/admin/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content/bonus-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: 'Item deleted',
        description: 'Bonus item has been successfully deleted',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Form submissions
  const onSectionSubmit = (data: BonusSectionFormValues) => {
    updateSectionMutation.mutate(data);
  };

  const onItemSubmit = (data: BonusItemFormValues) => {
    if (editingItemId) {
      updateItemMutation.mutate({ id: editingItemId, data });
    } else {
      createItemMutation.mutate({
        ...data,
        sectionId: bonusSection?.id || 0
      });
    }
  };

  const handleEditItem = (item: BonusItem) => {
    setEditingItemId(item.id);
    itemForm.reset({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      orderIndex: item.orderIndex,
      sectionId: item.sectionId,
      backgroundColor: item.backgroundColor || '#FFE382',
    });
    setActiveTab('add-item');
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    itemForm.reset({
      title: '',
      description: '',
      orderIndex: items.length,
      sectionId: bonusSection?.id || 0,
      imageUrl: null,
      backgroundColor: '#FFE382',
    });
  };

  // Drag and drop handler
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    
    // Update order indices
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      orderIndex: index
    }));
    
    setItems(updatedItems);
    
    // Update the order indices in the database
    updatedItems.forEach(item => {
      updateItemMutation.mutate({
        id: item.id,
        data: { orderIndex: item.orderIndex }
      });
    });
  };

  return (
    <Card className="w-full relative">
      {/* Celebration components */}
      <Celebration 
        trigger={sectionSaveSuccess} 
        type="small"
        message={sectionSaveSuccess ? "Section updated successfully!" : ""}
      />
      
      <Celebration 
        trigger={itemSaveSuccess} 
        type="medium"
        message={itemSaveSuccess ? "Bonus item saved successfully!" : ""}
      />
      
      <CardHeader>
        <CardTitle className="flex items-center">
          <GiftIcon className="mr-2 h-6 w-6" />
          Free Bonuses Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 space-x-3">
            <TabsTrigger value="section">Section Settings</TabsTrigger>
            <TabsTrigger value="items">Bonus Items</TabsTrigger>
            <TabsTrigger value="add-item">
              {editingItemId ? 'Edit Item' : 'Add Item'}
            </TabsTrigger>
          </TabsList>
          
          {/* Section Settings Tab */}
          <TabsContent value="section">
            <Form {...sectionForm}>
              <form onSubmit={sectionForm.handleSubmit(onSectionSubmit)} className="space-y-4">
                <FormField
                  control={sectionForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={sectionForm.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Subtitle</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Fields below were removed as they don't exist in the database */}

                <FormField
                  control={sectionForm.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <div 
                          className="w-10 h-10 border rounded-md" 
                          style={{ backgroundColor: field.value || '#E6F1FE' }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={updateSectionMutation.isPending}
                >
                  {updateSectionMutation.isPending ? 'Saving...' : 'Save Section Settings'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Bonus Items Tab */}
          <TabsContent value="items">
            <div className="space-y-4">
              <Button 
                onClick={() => setActiveTab('add-item')} 
                variant="outline" 
                className="w-full"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add New Bonus Item
              </Button>
              
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="bonus-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {items.length === 0 ? (
                        <div className="text-center p-6 border rounded-lg text-gray-500">
                          No bonus items yet. Add your first one!
                        </div>
                      ) : (
                        items
                          .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                          .map((item, index) => (
                            <Draggable key={item.id} draggableId={`item-${item.id}`} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card style={{ backgroundColor: item.backgroundColor || '#FFE382' }}>
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <div className="text-sm font-medium mb-1">
                                            Free Bonus #{index + 1}
                                          </div>
                                          <h3 className="text-lg font-bold">{item.title}</h3>
                                          <p className="text-sm mt-1 text-gray-700 line-clamp-2">
                                            {item.description}
                                          </p>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => handleEditItem(item)}
                                          >
                                            Edit
                                          </Button>
                                          <Button 
                                            className="delete-button"
                                            size="sm"
                                            onClick={() => deleteItemMutation.mutate(item.id)}
                                            disabled={deleteItemMutation.isPending}
                                          >
                                            <Trash2Icon className="h-4 w-4 text-white" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>
          
          {/* Add/Edit Item Tab */}
          <TabsContent value="add-item">
            <Form {...itemForm}>
              <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
                <FormField
                  control={itemForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Access to the PTYA Community" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={itemForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} placeholder="Describe what this bonus offers..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={itemForm.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Name (optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value || ''}
                          placeholder="gift" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={itemForm.control}
                    name="buttonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={field.value || ''}
                            placeholder="Learn More" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={itemForm.control}
                    name="buttonUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button URL (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={field.value || ''}
                            placeholder="https://example.com/learn-more" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={itemForm.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} value={field.value || '#FFE382'} />
                        </FormControl>
                        <div 
                          className="w-10 h-10 border rounded-md" 
                          style={{ backgroundColor: field.value || '#FFE382' }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2 justify-end">
                  {editingItemId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    type="submit"
                    disabled={createItemMutation.isPending || updateItemMutation.isPending}
                  >
                    {editingItemId 
                      ? (updateItemMutation.isPending ? 'Updating...' : 'Update Item') 
                      : (createItemMutation.isPending ? 'Adding...' : 'Add Item')}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BonusSectionEditor;
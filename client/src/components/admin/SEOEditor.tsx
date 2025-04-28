import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSeoMetadata } from "@/hooks/use-seo-metadata";
import { SeoMetadata, insertSeoMetadataSchema } from "@shared/schema";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Extend the base schema for form validation
const formSchema = insertSeoMetadataSchema.extend({
  // Add any additional validation rules here
  metaTitle: z.string().min(5, "Title must be at least 5 characters"),
  metaDescription: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function SEOEditor() {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("edit");
  
  const {
    seoMetadata: selectedMetadata,
    isLoading: isSelectedLoading,
    error: selectedError,
    updateSeoMetadata,
    isUpdating,
  } = useSeoMetadata(selectedId);
  
  const {
    seoMetadata: allMetadata,
    isLoading: isAllMetadataLoading,
    createSeoMetadata,
    deleteSeoMetadata,
    isCreating,
    isDeleting,
  } = useSeoMetadata();
  
  // Set up the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      ogImageUrl: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImageUrl: "",
      canonicalUrl: "",
      keywords: "",
      structuredData: "",
      pagePath: "/",
      isDefault: false,
    },
  });
  
  // Update form values when selected metadata changes
  useEffect(() => {
    if (selectedMetadata) {
      form.reset({
        metaTitle: selectedMetadata.metaTitle,
        metaDescription: selectedMetadata.metaDescription,
        ogTitle: selectedMetadata.ogTitle || "",
        ogDescription: selectedMetadata.ogDescription || "",
        ogImageUrl: selectedMetadata.ogImageUrl || "",
        twitterTitle: selectedMetadata.twitterTitle || "",
        twitterDescription: selectedMetadata.twitterDescription || "",
        twitterImageUrl: selectedMetadata.twitterImageUrl || "",
        canonicalUrl: selectedMetadata.canonicalUrl || "",
        keywords: selectedMetadata.keywords || "",
        structuredData: selectedMetadata.structuredData || "",
        pagePath: selectedMetadata.pagePath,
        isDefault: selectedMetadata.isDefault,
      });
    }
  }, [selectedMetadata, form]);
  
  // Handler for form submission
  const onSubmit = (values: FormValues) => {
    if (selectedId) {
      updateSeoMetadata({ id: selectedId, data: values });
    } else {
      createSeoMetadata(values);
      form.reset();
      setActiveTab("list");
    }
  };
  
  // Handler for creating new metadata
  const handleNew = () => {
    setSelectedId(undefined);
    form.reset({
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      ogImageUrl: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImageUrl: "",
      canonicalUrl: "",
      keywords: "",
      structuredData: "",
      pagePath: "/",
      isDefault: false,
    });
    setActiveTab("edit");
  };
  
  // Handler for selecting existing metadata
  const handleSelect = (id: number) => {
    setSelectedId(id);
    setActiveTab("edit");
  };
  
  // Handler for confirming deletion
  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
  
  // Handler for actual deletion
  const handleDelete = () => {
    if (deleteId) {
      deleteSeoMetadata(deleteId);
      if (selectedId === deleteId) {
        setSelectedId(undefined);
        form.reset();
      }
      setOpenDialog(false);
      setDeleteId(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SEO Metadata Management</h2>
        <Button onClick={handleNew} variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          New Metadata
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Metadata</TabsTrigger>
          <TabsTrigger value="list">All Metadata</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedId ? "Edit SEO Metadata" : "Create New SEO Metadata"}
              </CardTitle>
              <CardDescription>
                Manage the SEO information for your website pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSelectedLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="pagePath"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Path</FormLabel>
                              <FormControl>
                                <Input placeholder="/" {...field} />
                              </FormControl>
                              <FormDescription>
                                The URL path for this metadata (e.g., "/about", "/pricing")
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="isDefault"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Default Metadata</FormLabel>
                                <FormDescription>
                                  Use this metadata as the default for pages without specific metadata
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="metaTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Page Title" {...field} />
                              </FormControl>
                              <FormDescription>
                                The title that appears in search engine results
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="metaDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="A brief description of the page content"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The description that appears in search engine results
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="keywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keywords</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="keyword1, keyword2, keyword3"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Comma-separated keywords for search engines
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="canonicalUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Canonical URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com/page"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The preferred URL for this page (optional)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Social Media</h3>
                        
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Open Graph (Facebook/LinkedIn)
                          </h4>
                          
                          <FormField
                            control={form.control}
                            name="ogTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>OG Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Title for social sharing" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ogDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>OG Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Description for social sharing"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ogImageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>OG Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="/images/og-image.jpg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Twitter Card
                          </h4>
                          
                          <FormField
                            control={form.control}
                            name="twitterTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Title for Twitter" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="twitterDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Description for Twitter"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="twitterImageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="/images/twitter-image.jpg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="structuredData"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Structured Data (JSON-LD)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="{}"
                                  className="font-mono resize-none h-32"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Optional JSON-LD structured data for rich results
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("list")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isUpdating || isCreating}>
                        {isUpdating || isCreating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All SEO Metadata</CardTitle>
              <CardDescription>
                Manage metadata for all pages of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAllMetadataLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : Array.isArray(allMetadata) && allMetadata.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page Path</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allMetadata.map((metadata: SeoMetadata) => (
                      <TableRow key={metadata.id}>
                        <TableCell className="font-medium">
                          {metadata.pagePath}
                        </TableCell>
                        <TableCell>{metadata.metaTitle}</TableCell>
                        <TableCell>
                          {metadata.isDefault ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Default
                            </span>
                          ) : null}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSelect(metadata.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => confirmDelete(metadata.id)}
                              disabled={isDeleting || metadata.isDefault}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No SEO metadata found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleNew}
                  >
                    Create your first metadata
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              SEO metadata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
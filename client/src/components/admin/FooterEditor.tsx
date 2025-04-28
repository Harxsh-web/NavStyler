import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFooterCategories, useFooterLinks, useSocialLinks } from "@/hooks/use-content";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema for footer category
const footerCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

// Schema for footer link
const footerLinkSchema = z.object({
  text: z.string().min(1, "Link text is required"),
  url: z.string().url("Must be a valid URL"),
  categoryId: z.number(),
});

// Schema for social link
const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL"),
  order_index: z.number().default(0),
  icon_name: z.string().optional(),
  active: z.boolean().default(true),
});

type FooterCategoryFormValues = z.infer<typeof footerCategorySchema>;
type FooterLinkFormValues = z.infer<typeof footerLinkSchema>;
type SocialLinkFormValues = z.infer<typeof socialLinkSchema>;

export function FooterEditor() {
  const { data: categories, isLoading: categoriesLoading } = useFooterCategories();
  const { data: links, isLoading: linksLoading } = useFooterLinks();
  const { data: socialLinks, isLoading: socialLinksLoading } = useSocialLinks();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isAddingSocialLink, setIsAddingSocialLink] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const isLoading = categoriesLoading || linksLoading || socialLinksLoading;
  
  // Category form
  const categoryForm = useForm<FooterCategoryFormValues>({
    resolver: zodResolver(footerCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  // Link form
  const linkForm = useForm<FooterLinkFormValues>({
    resolver: zodResolver(footerLinkSchema),
    defaultValues: {
      text: "",
      url: "",
      categoryId: 0,
    },
  });

  // Social link form
  const socialLinkForm = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: "",
      url: "",
      order_index: 0,
      icon_name: "",
      active: true,
    },
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (values: FooterCategoryFormValues) => {
      const res = await apiRequest("POST", "/api/admin/footer-categories", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create category");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/footer-categories"] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      categoryForm.reset();
      setIsAddingCategory(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      });
    },
  });

  // Create link mutation
  const createLinkMutation = useMutation({
    mutationFn: async (values: FooterLinkFormValues) => {
      const res = await apiRequest("POST", "/api/admin/footer-links", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/footer-links"] });
      toast({
        title: "Success",
        description: "Link created successfully",
      });
      linkForm.reset();
      setIsAddingLink(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create link",
        variant: "destructive",
      });
    },
  });

  // Create social link mutation
  const createSocialLinkMutation = useMutation({
    mutationFn: async (values: SocialLinkFormValues) => {
      const res = await apiRequest("POST", "/api/admin/social-links", values);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create social link");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/social-links"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-links"] });
      toast({
        title: "Success",
        description: "Social link created successfully",
      });
      socialLinkForm.reset();
      setIsAddingSocialLink(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create social link",
        variant: "destructive",
      });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/footer-categories/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete category");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/footer-categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/footer-links"] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      });
    },
  });

  // Delete link mutation
  const deleteLinkMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/footer-links/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete link");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/footer-links"] });
      toast({
        title: "Success",
        description: "Link deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete link",
        variant: "destructive",
      });
    },
  });

  // Delete social link mutation
  const deleteSocialLinkMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/social-links/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete social link");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/social-links"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-links"] });
      toast({
        title: "Success",
        description: "Social link deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete social link",
        variant: "destructive",
      });
    },
  });

  const onCategorySubmit = (values: FooterCategoryFormValues) => {
    createCategoryMutation.mutate(values);
  };

  const onLinkSubmit = (values: FooterLinkFormValues) => {
    createLinkMutation.mutate(values);
  };

  const onSocialLinkSubmit = (values: SocialLinkFormValues) => {
    // Add icon name based on platform
    const platformToIcon: Record<string, string> = {
      facebook: 'FaFacebook',
      twitter: 'FaTwitter',
      instagram: 'FaInstagram',
      linkedin: 'FaLinkedin',
      youtube: 'FaYoutube',
      tiktok: 'FaTiktok',
      spotify: 'FaSpotify',
      applepodcast: 'SiApplepodcasts',
      rumble: 'SiRumble'
    };
    
    values.icon_name = platformToIcon[values.platform] || '';
    createSocialLinkMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Footer Management</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Management</CardTitle>
        <CardDescription>Manage your website footer content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Footer Categories</h3>
                <Button 
                  size="sm" 
                  onClick={() => setIsAddingCategory(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Category
                </Button>
              </div>

              {/* Categories List */}
              <div className="grid gap-4">
                {categories?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No categories yet. Add your first category.</p>
                )}
                
                {categories?.map((category) => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {links?.filter(link => link.categoryId === category.id).length || 0} links
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${category.name}"? This will also delete all links in this category.`)) {
                          deleteCategoryMutation.mutate(category.id);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Add Category Dialog */}
              <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                  </DialogHeader>
                  <Form {...categoryForm}>
                    <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                      <FormField
                        control={categoryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Resources" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddingCategory(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createCategoryMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {createCategoryMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* Links Tab */}
          <TabsContent value="links">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Footer Links</h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (categories?.length === 0) {
                      toast({
                        title: "Error",
                        description: "You need to create at least one category first",
                        variant: "destructive",
                      });
                      return;
                    }
                    
                    // Set default category
                    linkForm.setValue('categoryId', categories[0].id);
                    setIsAddingLink(true);
                  }}
                  disabled={categories?.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Link
                </Button>
              </div>

              {/* Links List */}
              <div className="grid gap-4">
                {links?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No links yet. Add your first link.</p>
                )}
                
                {links?.map((link) => {
                  const category = categories?.find(c => c.id === link.categoryId);
                  return (
                    <div 
                      key={link.id} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{link.text}</p>
                        <p className="text-xs text-muted-foreground">
                          Category: {category?.name || "Unknown"} | URL: {link.url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${link.text}"?`)) {
                            deleteLinkMutation.mutate(link.id);
                          }
                        }}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              {/* Add Link Dialog */}
              <Dialog open={isAddingLink} onOpenChange={setIsAddingLink}>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                  </DialogHeader>
                  <Form {...linkForm}>
                    <form onSubmit={linkForm.handleSubmit(onLinkSubmit)} className="space-y-4">
                      <FormField
                        control={linkForm.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link Text</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., About" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={linkForm.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/about" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={linkForm.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <select
                                className="w-full p-2 rounded-md border"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                value={field.value}
                              >
                                {categories?.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddingLink(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createLinkMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {createLinkMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Social Links</h3>
                <Button 
                  size="sm" 
                  onClick={() => setIsAddingSocialLink(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Social Link
                </Button>
              </div>

              {/* Social Links List */}
              <div className="grid gap-4">
                {socialLinks?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No social links yet. Add your first social link.</p>
                )}
                
                {socialLinks?.map((link) => (
                  <div 
                    key={link.id} 
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium text-capitalize">{link.platform}</p>
                      <p className="text-xs text-muted-foreground">
                        URL: {link.url}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${link.platform}" social link?`)) {
                          deleteSocialLinkMutation.mutate(link.id);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Add Social Link Dialog */}
              <Dialog open={isAddingSocialLink} onOpenChange={setIsAddingSocialLink}>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Social Link</DialogTitle>
                  </DialogHeader>
                  <Form {...socialLinkForm}>
                    <form onSubmit={socialLinkForm.handleSubmit(onSocialLinkSubmit)} className="space-y-4">
                      <FormField
                        control={socialLinkForm.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                                <SelectItem value="spotify">Spotify</SelectItem>
                                <SelectItem value="applepodcast">Apple Podcast</SelectItem>
                                <SelectItem value="rumble">Rumble</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={socialLinkForm.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddingSocialLink(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createSocialLinkMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {createSocialLinkMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
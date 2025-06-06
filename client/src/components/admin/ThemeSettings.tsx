import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlusCircle, Trash2, Check, RefreshCw, Copy, Paintbrush, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useThemeSettings, ThemeSettings } from '@/hooks/use-theme-settings';
import { AdminCard } from './AdminCard';

const ThemeFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color code',
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color code',
  }),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color code',
  }),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color code',
  }),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color code',
  }),
  fontPrimary: z.string().min(1, { message: 'Primary font is required' }),
  fontSecondary: z.string().min(1, { message: 'Secondary font is required' }),
  buttonRadius: z.string().min(1, { message: 'Button radius is required' }),
  buttonStyle: z.enum(['filled', 'outline', 'ghost']),
  cardStyle: z.enum(['shadow', 'border', 'flat']),
  layoutStyle: z.enum(['modern', 'classic', 'minimal']),
  isDarkMode: z.boolean().default(false),
  isHighContrast: z.boolean().default(false),
  headerStyle: z.enum(['default', 'centered', 'minimal']),
  footerStyle: z.enum(['standard', 'simple', 'detailed']),
  customCss: z.string().optional(),
  appliesGlobally: z.boolean().default(false),
});

type ThemeFormValues = z.infer<typeof ThemeFormSchema>;

// Renamed to avoid naming conflict with the ThemeSettings interface
export function ThemeSettingsComponent() {
  const { toast } = useToast();
  const { 
    themes, 
    themesLoading, 
    createTheme, 
    updateTheme, 
    deleteTheme, 
    setActiveTheme 
  } = useThemeSettings();
  
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedTheme, setSelectedTheme] = useState<ThemeSettings | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  
  // Form setup
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: {
      name: '',
      primaryColor: '#4f46e5',
      secondaryColor: '#0ea5e9',
      accentColor: '#f59e0b',
      textColor: '#111827',
      backgroundColor: '#ffffff',
      fontPrimary: 'Inter',
      fontSecondary: 'Merriweather',
      buttonRadius: '0.5rem',
      buttonStyle: 'filled',
      cardStyle: 'shadow',
      layoutStyle: 'modern',
      isDarkMode: false,
      isHighContrast: false,
      headerStyle: 'default',
      footerStyle: 'standard',
      customCss: '',
      appliesGlobally: false,
    },
  });
  
  // Handler for selecting a theme to edit
  const handleSelectTheme = (theme: ThemeSettings) => {
    setSelectedTheme(theme);
    setIsCreating(false);
    form.reset({
      name: theme.name,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
      textColor: theme.textColor,
      backgroundColor: theme.backgroundColor,
      fontPrimary: theme.fontPrimary,
      fontSecondary: theme.fontSecondary,
      buttonRadius: theme.buttonRadius,
      buttonStyle: theme.buttonStyle as 'filled' | 'outline' | 'ghost',
      cardStyle: theme.cardStyle as 'shadow' | 'border' | 'flat',
      layoutStyle: theme.layoutStyle as 'modern' | 'classic' | 'minimal',
      isDarkMode: theme.isDarkMode,
      isHighContrast: theme.isHighContrast,
      headerStyle: theme.headerStyle as 'default' | 'centered' | 'minimal',
      footerStyle: theme.footerStyle as 'standard' | 'simple' | 'detailed',
      customCss: theme.customCss || '',
      appliesGlobally: theme.appliesGlobally,
    });
    setActiveTab('editor');
  };
  
  // Handler for creating a new theme
  const handleCreateNew = () => {
    setSelectedTheme(null);
    setIsCreating(true);
    form.reset({
      name: 'New Theme',
      primaryColor: '#4f46e5',
      secondaryColor: '#0ea5e9',
      accentColor: '#f59e0b',
      textColor: '#111827',
      backgroundColor: '#ffffff',
      fontPrimary: 'Inter',
      fontSecondary: 'Merriweather',
      buttonRadius: '0.5rem',
      buttonStyle: 'filled',
      cardStyle: 'shadow',
      layoutStyle: 'modern',
      isDarkMode: false,
      isHighContrast: false,
      headerStyle: 'default',
      footerStyle: 'standard',
      customCss: '',
      appliesGlobally: false,
    });
    setActiveTab('editor');
  };
  
  // Handler for duplicating a theme
  const handleDuplicate = (theme: ThemeSettings) => {
    setSelectedTheme(null);
    setIsCreating(true);
    form.reset({
      name: `${theme.name} (Copy)`,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
      textColor: theme.textColor,
      backgroundColor: theme.backgroundColor,
      fontPrimary: theme.fontPrimary,
      fontSecondary: theme.fontSecondary,
      buttonRadius: theme.buttonRadius,
      buttonStyle: theme.buttonStyle as 'filled' | 'outline' | 'ghost',
      cardStyle: theme.cardStyle as 'shadow' | 'border' | 'flat',
      layoutStyle: theme.layoutStyle as 'modern' | 'classic' | 'minimal',
      isDarkMode: theme.isDarkMode,
      isHighContrast: theme.isHighContrast,
      headerStyle: theme.headerStyle as 'default' | 'centered' | 'minimal',
      footerStyle: theme.footerStyle as 'standard' | 'simple' | 'detailed',
      customCss: theme.customCss || '',
      appliesGlobally: false,
    });
    setActiveTab('editor');
  };
  
  // Handler for deleting a theme
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this theme?')) {
      return;
    }
    
    try {
      setIsBusy(true);
      await deleteTheme(id);
      if (selectedTheme?.id === id) {
        setSelectedTheme(null);
        setActiveTab('themes');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete theme',
        variant: 'destructive',
      });
    } finally {
      setIsBusy(false);
    }
  };
  
  // Handler for setting a theme as active
  const handleSetActive = async (id: number) => {
    try {
      setIsBusy(true);
      await setActiveTheme(id);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to set active theme',
        variant: 'destructive',
      });
    } finally {
      setIsBusy(false);
    }
  };
  
  // Form submission handler
  const onSubmit = async (values: ThemeFormValues) => {
    try {
      setIsBusy(true);
      if (isCreating) {
        const createdTheme = await createTheme(values);
        setIsCreating(false);
        setActiveTab('themes');
        toast({
          title: 'Success',
          description: `Theme "${createdTheme.name}" created successfully`,
        });
      } else if (selectedTheme) {
        const updatedTheme = await updateTheme(selectedTheme.id, values);
        if (updatedTheme) {
          toast({
            title: 'Success',
            description: `Theme "${updatedTheme.name}" updated successfully`,
          });
        }
      }
    } catch (error: any) {
      console.error('Theme save error:', error);
      toast({
        title: 'Error Saving Theme',
        description: error.message || 'Failed to save theme. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsBusy(false);
    }
  };
  
  return (
    <AdminCard title="Theme Settings" description="Customize the appearance of your site">
      <div className="mb-4 bg-muted p-2 rounded text-sm text-muted-foreground">
        <p>To save your theme changes, go to the <strong>Theme Editor</strong> tab and click the <strong>Save Theme</strong> button at the bottom of the form.</p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 flex-wrap w-full">
          <TabsTrigger value="themes" className="flex-1 text-xs sm:text-sm md:text-base">
            <span className="hidden sm:inline">Available</span> Themes
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex-1 text-xs sm:text-sm md:text-base bg-primary/10 relative">
            <span className="hidden sm:inline">Theme</span> Editor
            {(isCreating || selectedTheme) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex-1 text-xs sm:text-sm md:text-base">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="themes">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Manage Themes</h3>
            <Button onClick={handleCreateNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Theme
            </Button>
          </div>
          
          {themesLoading ? (
            <div className="flex items-center justify-center h-40">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : themes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No themes found</p>
              <Button onClick={handleCreateNew}>Create Your First Theme</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {themes.map((theme) => (
                <Card key={theme.id} className={theme.appliesGlobally ? 'border-primary' : ''}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{theme.name}</span>
                      {theme.appliesGlobally && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Active
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Last updated: {new Date(theme.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="h-8 rounded" style={{ backgroundColor: theme.primaryColor }} />
                      <div className="h-8 rounded" style={{ backgroundColor: theme.secondaryColor }} />
                      <div className="h-8 rounded" style={{ backgroundColor: theme.accentColor }} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><span className="font-medium">Layout:</span> {theme.layoutStyle}</p>
                      <p>
                        <span className="font-medium">Fonts:</span> {theme.fontPrimary} / {theme.fontSecondary}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-1">
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSelectTheme(theme)}
                      >
                        <Paintbrush className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      {!theme.appliesGlobally && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(theme.id)}
                          disabled={isBusy}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDuplicate(theme)}
                        disabled={isBusy}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Duplicate
                      </Button>
                      {!theme.appliesGlobally && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSetActive(theme.id)}
                          disabled={isBusy}
                          className="ml-2"
                        >
                          <Check className="h-4 w-4 mr-1" /> Set as Active
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="editor">
          <div className="sticky top-0 z-10 bg-white flex justify-between items-center py-4 mb-6 border-b">
            <h3 className="text-xl font-semibold">
              {isCreating ? 'Create New Theme' : `Edit: ${selectedTheme?.name}`}
            </h3>
            <Button 
              type="submit" 
              form="theme-form"
              disabled={isBusy} 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg px-6 animate-pulse"
            >
              {isBusy && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              <span className="font-semibold">{isCreating ? 'Create Theme' : 'Save Theme'}</span>
            </Button>
          </div>
          <Form {...form}>
            <form id="theme-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Custom Theme" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appliesGlobally"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between mt-4 p-4 rounded-lg border">
                        <div className="space-y-0.5">
                          <FormLabel>Make Active Theme</FormLabel>
                          <FormDescription>
                            Apply this theme across the entire site
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
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Colors</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded border" 
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Color</FormLabel>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded border" 
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded border" 
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="textColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text Color</FormLabel>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded border" 
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <div className="flex gap-2">
                            <div 
                              className="w-10 h-10 rounded border" 
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Typography</h3>
                  
                  <FormField
                    control={form.control}
                    name="fontPrimary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Font</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fontSecondary"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Secondary Font</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Merriweather">Merriweather</SelectItem>
                            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                            <SelectItem value="Lora">Lora</SelectItem>
                            <SelectItem value="Garamond">Garamond</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Layout & Style</h3>
                  
                  <FormField
                    control={form.control}
                    name="layoutStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layout Style</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a layout style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="buttonStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Style</FormLabel>
                          <Select 
                            value={field.value} 
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select button style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="filled">Filled</SelectItem>
                              <SelectItem value="outline">Outline</SelectItem>
                              <SelectItem value="ghost">Ghost</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="buttonRadius"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Radius</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cardStyle"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Card Style</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select card style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="shadow">Shadow</SelectItem>
                            <SelectItem value="border">Border</SelectItem>
                            <SelectItem value="flat">Flat</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Header & Footer</h3>
                  
                  <FormField
                    control={form.control}
                    name="headerStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Header Style</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select header style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="centered">Centered</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="footerStyle"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Footer Style</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select footer style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Accessibility</h3>
                  
                  <FormField
                    control={form.control}
                    name="isDarkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-0.5">
                          <FormLabel>Dark Mode</FormLabel>
                          <FormDescription>
                            Enable dark color scheme
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
                    name="isHighContrast"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between mt-4 p-4 rounded-lg border">
                        <div className="space-y-0.5">
                          <FormLabel>High Contrast</FormLabel>
                          <FormDescription>
                            Enhance contrast for better accessibility
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
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Advanced</h3>
                
                <FormField
                  control={form.control}
                  name="customCss"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom CSS</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter custom CSS rules here..."
                          className="font-mono"
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add custom CSS to fine-tune your theme. These styles will override the default styles.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 pt-8 pb-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab('themes')}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isBusy} 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-lg py-6 font-semibold shadow-lg"
                >
                  {isBusy && <RefreshCw className="mr-2 h-5 w-5 animate-spin" />}
                  {isCreating ? 'Create Theme' : 'Save Theme'}
                </Button>
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h4 className="text-base font-bold mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                    Important Notice
                  </h4>
                  <p className="text-sm">
                    Click the <span className="bg-green-600 text-white px-2 py-1 rounded-sm font-medium">green Save Theme</span> button at the top or bottom of this form to apply and save your changes. Changes won't take effect until saved.
                  </p>
                </div>
                
                {selectedTheme && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                    <h4 className="text-base font-medium mb-1">Currently Editing:</h4>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: selectedTheme.primaryColor }}></div>
                      <p className="font-semibold">{selectedTheme.name}</p>
                      {selectedTheme.appliesGlobally && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Active Theme</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="space-y-8">
            <h3 className="text-xl font-semibold">Theme Preview</h3>
            
            <div className="bg-muted p-6 rounded-lg">
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Colors</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">Primary</Label>
                      <div 
                        className="h-10 sm:h-12 rounded-md" 
                        style={{ backgroundColor: form.watch('primaryColor') }}
                      />
                      <p className="text-xs mt-1 text-center font-mono">{form.watch('primaryColor')}</p>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">Secondary</Label>
                      <div 
                        className="h-10 sm:h-12 rounded-md" 
                        style={{ backgroundColor: form.watch('secondaryColor') }}
                      />
                      <p className="text-xs mt-1 text-center font-mono">{form.watch('secondaryColor')}</p>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">Accent</Label>
                      <div 
                        className="h-10 sm:h-12 rounded-md" 
                        style={{ backgroundColor: form.watch('accentColor') }}
                      />
                      <p className="text-xs mt-1 text-center font-mono">{form.watch('accentColor')}</p>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">Text</Label>
                      <div 
                        className="h-10 sm:h-12 rounded-md" 
                        style={{ backgroundColor: form.watch('textColor') }}
                      />
                      <p className="text-xs mt-1 text-center font-mono">{form.watch('textColor')}</p>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">Background</Label>
                      <div 
                        className="h-10 sm:h-12 rounded-md border" 
                        style={{ backgroundColor: form.watch('backgroundColor') }}
                      />
                      <p className="text-xs mt-1 text-center font-mono">{form.watch('backgroundColor')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Typography</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="mb-4 md:mb-0">
                      <Label className="mb-1 block text-xs sm:text-sm">
                        Primary Font: <span className="font-medium">{form.watch('fontPrimary')}</span>
                      </Label>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-base sm:text-lg md:text-xl" style={{ fontFamily: form.watch('fontPrimary') }}>
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="text-xs sm:text-sm mt-2" style={{ fontFamily: form.watch('fontPrimary') }}>
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                          abcdefghijklmnopqrstuvwxyz<br />
                          0123456789
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs sm:text-sm">
                        Secondary Font: <span className="font-medium">{form.watch('fontSecondary')}</span>
                      </Label>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-base sm:text-lg md:text-xl" style={{ fontFamily: form.watch('fontSecondary') }}>
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="text-xs sm:text-sm mt-2" style={{ fontFamily: form.watch('fontSecondary') }}>
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                          abcdefghijklmnopqrstuvwxyz<br />
                          0123456789
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">UI Elements</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    <div className="mb-4 sm:mb-0">
                      <Label className="mb-3 block">Buttons ({form.watch('buttonStyle')})</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="default" size="sm" className="mb-1">Primary</Button>
                        <Button variant="secondary" size="sm" className="mb-1">Secondary</Button>
                        <Button variant="outline" size="sm" className="mb-1">Outline</Button>
                      </div>
                    </div>
                    <div className="mb-4 sm:mb-0">
                      <Label className="mb-3 block">Card ({form.watch('cardStyle')})</Label>
                      <Card className="overflow-hidden">
                        <CardHeader className="p-3">
                          <CardTitle className="text-base">Card Title</CardTitle>
                          <CardDescription className="text-xs">Card description</CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <p className="text-sm">Card content</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <Label className="mb-3 block">Form Controls</Label>
                      <div className="space-y-2">
                        <Input placeholder="Text input" className="text-sm" />
                        <div className="flex items-center space-x-2">
                          <Switch id="preview-switch" />
                          <Label htmlFor="preview-switch" className="text-sm">Toggle</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setActiveTab('editor')}>
                Return to Editor
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AdminCard>
  );
}
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { Loader2, LogOut } from "lucide-react";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("footer");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Feel-Good Productivity Admin</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-medium">{user.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Website Content Management</CardTitle>
            <CardDescription>
              Edit and manage the content of your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="footer" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="footer">Footer</TabsTrigger>
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="learning-points">Learning Points</TabsTrigger>
              </TabsList>

              <TabsContent value="footer" className="space-y-4">
                <FooterEditor />
              </TabsContent>

              <TabsContent value="hero" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section Editor</CardTitle>
                    <CardDescription>Edit your hero section content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Hero section editor coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Testimonials Editor</CardTitle>
                    <CardDescription>Edit testimonials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Testimonials editor coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="learning-points" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Points Editor</CardTitle>
                    <CardDescription>Edit learning points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Learning points editor coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
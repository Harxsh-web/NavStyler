import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2, Lock, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const { user, isLoading, loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // If user is already logged in, redirect to admin page
  if (user && !isLoading) {
    return <Redirect to="/admin" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#0F7FFF] text-white hover:bg-[#0061D3]"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">admin@example.com</span>
                <span className="text-gray-500">Password:</span>
                <span className="font-medium">admin123</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-gray-500 mt-4">
              This area is restricted to authorized administrators only.
              <br />If you need access, please contact your system administrator.
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Hero Section */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-cyan-600 to-blue-700">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">
              Feel-Good Productivity
            </h2>
            <p className="text-xl font-semibold mb-2">Content Management System</p>
            <p className="text-cyan-100 mb-8">
              This admin panel allows you to manage content for your book landing page.
              Edit sections, update information, and customize your site with ease.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Manage Website Content:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>Hero section and featured content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>Learning points and testimonials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>Book details and author information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>Footer links and social media</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
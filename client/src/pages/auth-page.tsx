import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Schema for login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const { user, isLoading, loginMutation } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  
  // Redirect if already logged in
  if (!isLoading && user) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Form section */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <CardDescription>
                Sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center pt-0">
              <p className="text-sm text-gray-500 mt-4">
                This area is restricted to administrators only
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Hero section */}
        <div className="hidden md:block md:w-1/2 bg-slate-900 text-white p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">
              Feel-Good Productivity
            </h1>
            <p className="text-slate-300 mb-6">
              Manage your website content with the admin dashboard. 
              Add and edit content, manage testimonials, and update the footer.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-teal-400 rounded-full mr-2"></div>
                  <span>Edit site content</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-teal-400 rounded-full mr-2"></div>
                  <span>Manage testimonials</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-teal-400 rounded-full mr-2"></div>
                  <span>Update footer links</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-teal-400 rounded-full mr-2"></div>
                  <span>Configure social media</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
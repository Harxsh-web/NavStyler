import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

export default function AuthPage() {
  const { user, loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // If user is already logged in, redirect to main page
  if (user) {
    return <Redirect to="/" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-600 mt-2">Access the admin panel</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
            
            <div className="text-center text-sm text-gray-500">
              <p>Admin credentials:</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="hidden md:block md:w-1/2 bg-cyan-600">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">
              Feel-Good Productivity
            </h2>
            <p className="text-cyan-100 mb-8">
              This admin panel allows you to manage content for your book landing page.
              Edit sections, update information, and customize your site with ease.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manage hero section content
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update learning points and testimonials
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Edit footer links and social media
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
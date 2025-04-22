import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold text-cyan-600 cursor-pointer">Feel-Good Productivity</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Content Management</h2>
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "dashboard" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "hero" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("hero")}
            >
              Hero Section
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "quote" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("quote")}
            >
              Quote Section
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "learning" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("learning")}
            >
              Learning Points
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "testimonials" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("testimonials")}
            >
              Testimonials
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "author" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("author")}
            >
              Author Section
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "footer" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("footer")}
            >
              Footer
            </button>
          </nav>
        </aside>
        
        {/* Content Area */}
        <main className="flex-grow p-6">
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-lg mb-4">Welcome to the Feel-Good Productivity Admin Panel</p>
                <p className="text-gray-600 mb-6">
                  Use the sidebar navigation to manage different sections of your landing page.
                  All changes will be reflected immediately on the live site.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Hero Section</h3>
                    <p className="text-sm text-gray-600">Edit the main headline, subtext, and call-to-action.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Learning Points</h3>
                    <p className="text-sm text-gray-600">Manage the 10 key learning points from the book.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Testimonials</h3>
                    <p className="text-sm text-gray-600">Add or edit customer testimonials and reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "hero" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Hero Section Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the main hero section of your landing page.</p>
                {/* Hero section editor form would go here */}
              </div>
            </div>
          )}
          
          {activeTab === "footer" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Footer Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Manage footer links, categories, and social media.</p>
                {/* Footer editor form would go here */}
              </div>
            </div>
          )}
          
          {/* Other tab content would go here */}
        </main>
      </div>
    </div>
  );
}
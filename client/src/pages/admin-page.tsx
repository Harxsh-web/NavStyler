import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { QuoteEditor } from "@/components/admin/QuoteEditor";
import { TestimonialsEditor } from "@/components/admin/TestimonialsEditor";
import { AuthorEditor } from "@/components/admin/AuthorEditor";
import { SiteSettingsEditor } from "@/components/admin/SiteSettingsEditor";
import { SeoEditor } from "@/components/admin/SeoEditor";
import { AnalyticsEditor } from "@/components/admin/AnalyticsEditor";
import { ThemeSettingsComponent } from "@/components/admin/ThemeSettings";
import { ThemeSettingsProvider } from "@/hooks/use-theme-settings";
import BonusSectionEditor from "@/components/admin/BonusSectionEditor";
import GuaranteeSectionEditor from "@/components/admin/GuaranteeSectionEditor";
import YoutubeFrameworkSectionEditor from "@/components/admin/YoutubeFrameworkSectionEditor";
import ScholarshipSectionEditor from "@/components/admin/ScholarshipSectionEditor";
import LandingEditor from "@/components/admin/LandingEditor";
import MilestonesEditor from "@/components/admin/MilestonesEditor";
import { useLandingSection, useBonusSection, useBonusItems } from "@/hooks/use-content";

// BonusSectionEditor wrapper component to handle loading states
function ProtectedBonusSectionEditor() {
  const { data: bonusSection, isLoading: isLoadingSection } = useBonusSection();
  const { data: bonusItems, isLoading: isLoadingItems } = useBonusItems();
  
  if (isLoadingSection || isLoadingItems) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p>Loading bonus section data...</p>
        </div>
      </div>
    );
  }
  
  return <BonusSectionEditor bonusSection={bonusSection} bonusItems={bonusItems || []} />;
}

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

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
      
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-2">
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex items-center justify-center gap-2 text-gray-600 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          <span>{showSidebar ? 'Hide Menu' : 'Show Menu'}</span>
          {showSidebar ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          }
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Sidebar - responsive with conditional rendering */}
        <aside 
          className={`${showSidebar ? 'block' : 'hidden'} lg:block bg-white shadow-sm p-4 w-full lg:w-64 lg:min-h-[calc(100vh-68px)] lg:sticky lg:top-16 overflow-y-auto`}
        >
          <h2 className="text-lg font-semibold mb-4">Content Management</h2>
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "dashboard" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("dashboard");
                if (window.innerWidth < 1024) setShowSidebar(false);
              }}
            >
              Dashboard
            </button>
            
            {/* Landing section removed as requested */}
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "hero" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("hero");
                if (window.innerWidth < 1024) setShowSidebar(false);
              }}
            >
              Hero Section
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "quote" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("quote");
                if (window.innerWidth < 1024) setShowSidebar(false);
              }}
            >
              Quote Section
            </button>
            

            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "testimonials" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("testimonials");
                if (window.innerWidth < 1024) setShowSidebar(false);
              }}
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
                activeTab === "bonusSection" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("bonusSection")}
            >
              Free Bonuses
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "guaranteeSection" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("guaranteeSection")}
            >
              Money-Back Guarantee
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "youtubeFrameworkSection" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("youtubeFrameworkSection")}
            >
              YouTube Framework
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "scholarshipSection" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("scholarshipSection")}
            >
              Scholarship
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "milestones" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("milestones")}
            >
              Milestones
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "footer" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("footer")}
            >
              Footer
            </button>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Configuration
              </h3>
            </div>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "settings" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Site Settings
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "seo" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("seo")}
            >
              SEO & Metadata
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "analytics" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
            
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "themes" ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("themes")}
            >
              Theme Settings
            </button>
          </nav>
        </aside>
        
        {/* Content Area */}
        <main className="flex-grow p-6" data-admin-section>
          {/* Landing section editor removed as requested */}
          
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
              
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-sm rounded-lg p-4 sm:p-6 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Welcome to the Feel-Good Productivity Admin Panel</h2>
                <p className="opacity-90 mb-4 text-sm sm:text-base">
                  Manage your landing page content from this central dashboard. All changes are published immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                  <a href="/" target="_blank" rel="noopener noreferrer" className="text-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Live Site
                  </a>
                  
                  <button
                    onClick={() => setActiveTab("hero")}
                    className="  text-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Edit Hero Section
                  </button>

                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Landing section stats card removed as requested */}
                
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Hero Section</span>
                    <span className="text-xl sm:text-2xl font-bold mt-1">1</span>
                    <span className="text-xs text-gray-500 mt-1">Last updated: Today</span>
                  </div>
                </div>
                

                
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Testimonials</span>
                    <span className="text-xl sm:text-2xl font-bold mt-1">5</span>
                    <span className="text-xs text-gray-500 mt-1">Active testimonials</span>
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Author</span>
                    <span className="text-xl sm:text-2xl font-bold mt-1">1</span>
                    <span className="text-xs text-gray-500 mt-1">Profile configured</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Landing section quick action removed as requested */}
                
                <button 
                  onClick={() => setActiveTab("hero")}
                  className="flex items-center justify-center py-3 px-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="font-medium">Edit Hero Section</h3>
                    <p className="text-sm text-white-800">Update headlines and CTAs</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setActiveTab("testimonials")}
                  className="flex items-center justify-center py-3 px-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="font-medium">Manage Testimonials</h3>
                    <p className="text-sm text-white">Update customer reviews</p>
                  </div>
                </button>
              </div>
              
              {/* Content Overview */}
              <h2 className="text-lg font-semibold mb-3">Content Overview</h2>
              <div className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <p className="text-lg font-medium">Landing Page Content</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {/* Landing section overview removed as requested */}
                
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Hero Section</h3>
                      <p className="text-sm text-gray-500">Main headline and book promotion</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("hero")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Quote Section</h3>
                      <p className="text-sm text-gray-500">Featured quote from a notable person</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("quote")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  

                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Testimonials</h3>
                      <p className="text-sm text-gray-500">Customer reviews and feedback</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("testimonials")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Author Information</h3>
                      <p className="text-sm text-gray-500">Author bio and social links</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("author")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Free Bonuses</h3>
                      <p className="text-sm text-gray-500">Free bonuses section with drag-and-drop items</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("bonusSection")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Money-Back Guarantee</h3>
                      <p className="text-sm text-gray-500">100% satisfaction guarantee details</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("guaranteeSection")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Footer</h3>
                      <p className="text-sm text-gray-500">Footer links and categories</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("footer")}
                      className="px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 rounded hover:bg-cyan-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Help and Resources */}
              <h2 className="text-lg font-semibold mb-3">Help & Resources</h2>
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-medium mb-2">Editing Tips</h3>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                      <li>Keep headlines short and compelling</li>
                      <li>Use high-quality, authentic testimonials</li>
                      <li>Maintain a consistent tone throughout</li>
                      <li>Preview changes before publishing</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-medium mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      If you need assistance with editing your content or have technical issues, 
                      contact our support team.
                    </p>
                    <div className="flex space-x-3">
                      <a 
                        href="mailto:support@example.com"
                        className="text-sm text-cyan-700 hover:text-cyan-800 transition-colors"
                      >
                        Email Support
                      </a>
                      <span className="text-gray-300">|</span>
                      <a 
                        href="#"
                        className="text-sm text-cyan-700 hover:text-cyan-800 transition-colors"
                      >
                        View Documentation
                      </a>
                    </div>
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
                {/* Import and use the HeroEditor component */}
                <div className="mt-6">
                  <HeroEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "quote" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Quote Section Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the quote section displayed on your landing page.</p>
                <div className="mt-6">
                  <QuoteEditor />
                </div>
              </div>
            </div>
          )}



          {activeTab === "testimonials" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Testimonials Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Manage customer testimonials and reviews.</p>
                <div className="mt-6">
                  <TestimonialsEditor />
                </div>
              </div>
            </div>
          )}

          {activeTab === "author" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Author Section Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the author information displayed on your landing page.</p>
                <div className="mt-6">
                  <AuthorEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "footer" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Footer Editor</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Manage footer links, categories, and social media.</p>
                <div className="mt-6">
                  <FooterEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "bonusSection" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Free Bonuses Section</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Manage the "What if I can't afford The $995?" free bonuses section.</p>
                <div className="mt-6">
                  {/* Use the new hooks to fetch bonus section data */}
                  <ProtectedBonusSectionEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "guaranteeSection" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Money-Back Guarantee Section</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the 100% satisfaction guarantee details.</p>
                <div className="mt-6">
                  <GuaranteeSectionEditor />
                </div>
              </div>
            </div>
          )}

          {activeTab === "youtubeFrameworkSection" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">YouTube Framework Section</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the YouTube Framework section content.</p>
                <div className="mt-6">
                  <YoutubeFrameworkSectionEditor />
                </div>
              </div>
            </div>
          )}

          {activeTab === "scholarshipSection" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Scholarship Section</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Edit the scholarship application section content.</p>
                <div className="mt-6">
                  <ScholarshipSectionEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Configure general settings for your website.</p>
                <div className="mt-6">
                  <SiteSettingsEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "seo" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">SEO & Metadata</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Optimize your site for search engines and social media.</p>
                <div className="mt-6">
                  <SeoEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "analytics" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Analytics & Tracking</h1>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600 mb-4">Configure analytics tools and tracking codes for your website.</p>
                <div className="mt-6">
                  <AnalyticsEditor />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "themes" && (
            <ThemeSettingsProvider>
              <div>
                <h1 className="text-2xl font-bold mb-6">Theme Settings</h1>
                <p className="text-gray-600 mb-4">Customize the appearance of your website by managing themes.</p>
                <div className="mt-6">
                  <ThemeSettingsComponent />
                </div>
              </div>
            </ThemeSettingsProvider>
          )}
          
          {activeTab === "milestones" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Milestones</h1>
              <p className="text-gray-600 mb-4">Manage progress milestones to showcase your journey.</p>
              <div className="mt-6">
                <MilestonesEditor />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
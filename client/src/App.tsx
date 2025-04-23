import { Switch, Route, useLocation } from "wouter";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import NotFound from "@/pages/not-found";
import CheckoutPage from "@/pages/checkout";
import PaymentSuccessPage from "@/pages/payment-success";
import AnalyticsPage from "@/pages/admin/analytics";
import Navbar from "@/components/Navbar";
import { ProtectedRoute } from "@/lib/protected-route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSettingsProvider } from "@/hooks/use-theme-settings";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useEffect } from "react";

function Router() {
  // Get current location for AnimatePresence
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location}>
        <Route path="/">
          <PageTransition>
            <HomePage />
          </PageTransition>
        </Route>
        <Route path="/auth">
          <PageTransition>
            <AuthPage />
          </PageTransition>
        </Route>
        <ProtectedRoute path="/admin" component={() => (
          <PageTransition>
            <AdminPage />
          </PageTransition>
        )} />
        <Route path="/checkout">
          <PageTransition>
            <CheckoutPage />
          </PageTransition>
        </Route>
        <Route path="/payment-success">
          <PageTransition>
            <PaymentSuccessPage />
          </PageTransition>
        </Route>
        <ProtectedRoute 
          path="/admin/analytics" 
          component={() => (
            <PageTransition>
              <AnalyticsPage />
            </PageTransition>
          )}
        />
        <Route>
          <PageTransition>
            <NotFound />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default function App() {
  // Activate smooth scrolling for anchor links
  useSmoothScroll({ 
    offset: 80, // Adjust based on your navbar height
    behavior: 'smooth'
  });

  // Add effect to handle initial hash in URL for smooth scrolling
  useEffect(() => {
    // Check if URL has a hash on initial load
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      
      // Use a small timeout to ensure DOM is fully loaded
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Using our custom smooth scroll with a slightly larger offset for fixed header
          import('@/lib/smoothScroll').then(({ smoothScrollTo }) => {
            smoothScrollTo(id, { 
              offset: 100,
              duration: 800 
            });
          });
        }
      }, 300);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeSettingsProvider>
            <Navbar />
            <div className="pt-20">
              <Router />
            </div>
            <Toaster />
          </ThemeSettingsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
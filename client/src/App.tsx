import { Switch, Route, useLocation } from "wouter";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import Navbar from "@/components/Navbar";
import { ProtectedRoute } from "@/lib/protected-route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

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
        <Route>
          <PageTransition>
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
              </div>
            </div>
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

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <div className="pt-20">
            <Router />
          </div>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
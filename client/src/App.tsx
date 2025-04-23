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
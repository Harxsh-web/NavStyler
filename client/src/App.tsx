import { Switch, Route } from "wouter";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-8">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
import "./index.css";
import { Switch, Route, Router as RouterWrapper } from "wouter";
import HomePage from "./pages/home-page";
import AdminPage from "./pages/admin-page";
import AuthPage from "./pages/auth-page";
import NotFound from "./pages/not-found";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { Toaster } from "./components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWrapper>
          <Router />
        </RouterWrapper>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
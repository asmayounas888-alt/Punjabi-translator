import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function AppRouter() {
  // Use the base URL from Vite config, removing trailing slash for wouter compatibility
  const base = (import.meta as any).env.BASE_URL.replace(/\/$/, "");

  return (
    <Router base={base}>
      <Switch>
        {/* Set Home as the absolute default for any path */}
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppRouter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

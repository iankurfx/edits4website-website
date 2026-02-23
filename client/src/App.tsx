import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./lib/search-context";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";

// Pages
import Home from "@/pages/Home";
import TemplateDetail from "@/pages/TemplateDetail";
import NotFound from "@/pages/NotFound";
import Trending from "@/pages/Trending";
import NewArrivals from "@/pages/NewArrivals";
import RequestTemplate from "@/pages/RequestTemplate";
import RequestEdit from "@/pages/RequestEdit";
import About from "@/pages/About";
import Copyright from "@/pages/Copyright";
import DMCA from "@/pages/DMCA";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Home />} />
      <Route path="/trending" component={Trending} />
      <Route path="/new" component={NewArrivals} />
      <Route path="/request" component={RequestTemplate} />
      <Route path="/request-edit" component={RequestEdit} />
      <Route path="/about" component={About} />
      <Route path="/copyright" component={Copyright} />
      <Route path="/dmca" component={DMCA} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/template/:slug" component={TemplateDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { AuthProvider } from "@/hooks/use-auth";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
              <Navbar />
              <Router />
              <Toaster />
            </div>
          </TooltipProvider>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

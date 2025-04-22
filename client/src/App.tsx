import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import TVSeriesDetails from "@/pages/TVSeriesDetails";
import Search from "@/pages/Search";
import Category from "@/pages/Category";
import Contact from "@/pages/Contact";
import Layout from "@/components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/tv/:id" component={TVSeriesDetails} />
      <Route path="/search" component={Search} />
      <Route path="/category/:id" component={Category} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <Toaster />
        <Router />
      </Layout>
    </TooltipProvider>
  );
}

export default App;

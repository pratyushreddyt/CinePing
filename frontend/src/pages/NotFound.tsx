import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The movie you're looking for seems to have left the theater.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" asChild>
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </a>
          </Button>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Movies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

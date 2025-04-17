
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 page-transition">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          <Link to="/">
            <Button size="lg" className="button-hover">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
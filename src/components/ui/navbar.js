import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Plane } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all duration-300">
              <Plane className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              TripBooker
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"} 
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant={location.pathname === "/admin" ? "secondary" : "ghost"} 
                size="sm"
              >
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-1.5">
              <div className="text-white font-bold">GC</div>
            </div>
            <span className="font-bold text-xl gradient-text">GlowConnect</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Connect, grow, and advance your professional journey
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mb-4 md:mb-0">
          <Link to="#" className="text-sm hover:text-primary">About Us</Link>
          <Link to="#" className="text-sm hover:text-primary">Careers</Link>
          <Link to="#" className="text-sm hover:text-primary">Help Center</Link>
          <Link to="#" className="text-sm hover:text-primary">Privacy</Link>
          <Link to="#" className="text-sm hover:text-primary">Terms</Link>
          <Link to="#" className="text-sm hover:text-primary">Contact</Link>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
      
      <div className="container mt-6 pt-4 border-t">
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} GlowConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
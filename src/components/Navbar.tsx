
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Bell, User, Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Feed", path: "/feed", icon: <User className="h-5 w-5" /> },
    { name: "Jobs", path: "/jobs", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Messages", path: "/messages", icon: <MessageCircle className="h-5 w-5" /> },
    { name: "Notifications", path: "/notifications", icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-1.5">
              <div className="text-white font-bold">GC</div>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">GlowConnect</span>
          </Link>

          {user && (
            <div className="hidden md:flex gap-1 px-3 py-1.5 bg-secondary rounded-full items-center">
              <Search className="text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-52"
              />
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        {user ? (
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-md text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
            <div className="ml-2 h-8 w-px bg-border" />
            <Link to="/profile" className="flex items-center gap-2 hover-scale">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden lg:block">
                {user.name}
              </span>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-background border-b animate-slide-in">
          {user ? (
            <>
              <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                <Link to="/profile" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.title}</div>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-secondary text-primary"
                        : "hover:bg-secondary/50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-3 mb-4">
                <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
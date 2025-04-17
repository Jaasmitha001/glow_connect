
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="hover:bg-accent/20 transition-colors"
    >
      <Bell className="h-5 w-5 text-foreground" />
      <span className="sr-only">Notifications</span>
    </Button>
  );
}
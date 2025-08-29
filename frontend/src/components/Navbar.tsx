import { Button } from "@/components/ui/button";
import { Film, Bell, LogOut, User } from "lucide-react";

interface NavbarProps {
  user?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

export const Navbar = ({ user, onSignOut }: NavbarProps) => {
  return (
    <nav className="bg-cinema-card/50 backdrop-blur-md border-b border-cinema-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-button">
              <Film className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CineAlert
              </h1>
              <p className="text-xs text-muted-foreground">Movie Booking Assistant</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-cinema-gold" />
                  <span className="text-foreground">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="hero" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
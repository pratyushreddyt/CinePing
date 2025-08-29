import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { Dashboard } from "@/pages/Dashboard";
import { User } from "@/types/alert";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar user={user} onSignOut={handleSignOut} />
        <Dashboard user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSignOut={handleSignOut} />
      <HeroSection onGetStarted={handleGetStarted} />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;

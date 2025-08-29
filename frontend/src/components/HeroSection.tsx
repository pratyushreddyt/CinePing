import { Button } from "@/components/ui/button";
import { Play, Bell, Zap } from "lucide-react";
import heroImage from "@/assets/hero-cinema.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark/90 via-cinema-dark/70 to-cinema-purple/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cinema-gold rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cinema-blue rounded-full animate-pulse delay-300" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cinema-purple rounded-full animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-card/30 backdrop-blur-sm border border-cinema-border">
            <Zap className="h-4 w-4 text-cinema-gold" />
            <span className="text-sm font-medium text-cinema-gold">Never Miss Your Movie Again</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Real-Time Movie
              </span>
              <br />
              <span className="text-white">Alert System</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Get instant notifications when your favorite movies become available at your preferred theaters. Never miss a show again!
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-cinema-card/20 backdrop-blur-sm rounded-lg p-6 border border-cinema-border">
              <Bell className="h-8 w-8 text-cinema-red mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Smart Alerts</h3>
              <p className="text-sm text-gray-300">Email, SMS & push notifications when tickets are available</p>
            </div>
            <div className="bg-cinema-card/20 backdrop-blur-sm rounded-lg p-6 border border-cinema-border">
              <Play className="h-8 w-8 text-cinema-blue mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Real-Time Monitoring</h3>
              <p className="text-sm text-gray-300">Continuous checking every 2 minutes for availability</p>
            </div>
            <div className="bg-cinema-card/20 backdrop-blur-sm rounded-lg p-6 border border-cinema-border">
              <Zap className="h-8 w-8 text-cinema-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Multiple Theaters</h3>
              <p className="text-sm text-gray-300">Track movies across different theaters and cities</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-3 animate-glow"
            >
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white/20 text-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 pt-8 text-sm text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-cinema-gold">10,000+</div>
              <div>Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cinema-blue">500+</div>
              <div>Theaters Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cinema-purple">99.9%</div>
              <div>Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
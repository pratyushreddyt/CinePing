import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, MapPin, Globe } from "lucide-react";
import { MovieAlert } from "@/types/alert";

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlert: (alert: Omit<MovieAlert, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  editingAlert?: MovieAlert | null;
}

const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];

export const CreateAlertModal = ({ isOpen, onClose, onCreateAlert, editingAlert }: CreateAlertModalProps) => {
  const [formData, setFormData] = useState({
    movieName: editingAlert?.movieName || "",
    theatreName: editingAlert?.theatreName || "",
    city: editingAlert?.city || "",
    language: editingAlert?.language || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.movieName || !formData.theatreName || !formData.city || !formData.language) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onCreateAlert({
        ...formData,
        isActive: true,
      });
      onClose();
      setFormData({ movieName: "", theatreName: "", city: "", language: "" });
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-cinema-card border-cinema-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {editingAlert ? "Edit Alert" : "Create Movie Alert"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Name */}
          <div className="space-y-2">
            <Label htmlFor="movieName">Movie Name</Label>
            <div className="relative">
              <Film className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="movieName"
                placeholder="Enter movie name"
                className="pl-10"
                value={formData.movieName}
                onChange={(e) => setFormData({ ...formData, movieName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Theater Name */}
          <div className="space-y-2">
            <Label htmlFor="theatreName">Theater Name</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="theatreName"
                placeholder="Enter theater name"
                className="pl-10"
                value={formData.theatreName}
                onChange={(e) => setFormData({ ...formData, theatreName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* City Selection */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger className="w-full">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" disabled={isLoading} className="flex-1">
              {isLoading ? "Creating..." : editingAlert ? "Update Alert" : "Create Alert"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
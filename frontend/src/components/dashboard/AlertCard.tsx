import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Globe, Trash2, Edit, Bell } from "lucide-react";
import { MovieAlert } from "@/types/alert";

interface AlertCardProps {
  alert: MovieAlert;
  onEdit: (alert: MovieAlert) => void;
  onDelete: (alertId: string) => void;
  onToggle: (alertId: string) => void;
}

export const AlertCard = ({ alert, onEdit, onDelete, onToggle }: AlertCardProps) => {
  return (
    <Card className="bg-gradient-card border-cinema-border shadow-card hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-cinema-gold transition-colors">
              {alert.movieName}
            </h3>
            <div className="flex items-center gap-1">
              <Badge variant={alert.isActive ? "default" : "secondary"} className="text-xs">
                <Bell className="h-3 w-3 mr-1" />
                {alert.isActive ? "Active" : "Paused"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" onClick={() => onEdit(alert)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(alert.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Theater & Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-cinema-blue" />
            <span>{alert.theatreName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-cinema-purple" />
            <span>{alert.city} • {alert.language}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Created: {new Date(alert.createdAt).toLocaleDateString()}</span>
          {alert.notifiedAt && (
            <span>• Last notified: {new Date(alert.notifiedAt).toLocaleDateString()}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button 
            size="sm" 
            variant={alert.isActive ? "outline" : "hero"}
            onClick={() => onToggle(alert.id)}
            className="flex-1"
          >
            {alert.isActive ? "Pause Alert" : "Resume Alert"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { CreateAlertModal } from "@/components/dashboard/CreateAlertModal";
import { Plus, Bell, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { MovieAlert, User } from "@/types/alert";

interface DashboardProps {
  user: User;
}

// Mock data
const mockAlerts: MovieAlert[] = [
  {
    id: "1",
    userId: "user1",
    movieName: "Oppenheimer",
    theatreName: "PVR Cinemas Phoenix",
    city: "Mumbai",
    language: "English",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    notifiedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "2",
    userId: "user1",
    movieName: "Jawan",
    theatreName: "INOX Megaplex",
    city: "Delhi",
    language: "Hindi",
    isActive: false,
    createdAt: "2024-01-10T16:20:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
  },
  {
    id: "3",
    userId: "user1",
    movieName: "Spider-Man: Across the Spider-Verse",
    theatreName: "Cinepolis",
    city: "Bangalore",
    language: "English",
    isActive: true,
    createdAt: "2024-01-08T12:00:00Z",
    updatedAt: "2024-01-08T12:00:00Z",
  },
];

export const Dashboard = ({ user }: DashboardProps) => {
  const [alerts, setAlerts] = useState<MovieAlert[]>(mockAlerts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<MovieAlert | null>(null);

  const activeAlerts = alerts.filter(alert => alert.isActive);
  const totalNotifications = alerts.filter(alert => alert.notifiedAt).length;

  const handleCreateAlert = (newAlert: Omit<MovieAlert, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const alert: MovieAlert = {
      ...newAlert,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAlerts([...alerts, alert]);
  };

  const handleEditAlert = (alert: MovieAlert) => {
    setEditingAlert(alert);
    setIsCreateModalOpen(true);
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const handleToggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive, updatedAt: new Date().toISOString() }
        : alert
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-hero bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-muted-foreground">Monitor your movie alerts and never miss a show</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-cinema-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-cinema-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">All your movie alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-cinema-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <CheckCircle className="h-4 w-4 text-cinema-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cinema-gold">{activeAlerts.length}</div>
              <p className="text-xs text-muted-foreground">Currently monitoring</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-cinema-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <TrendingUp className="h-4 w-4 text-cinema-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cinema-purple">{totalNotifications}</div>
              <p className="text-xs text-muted-foreground">Successful alerts sent</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-cinema-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-cinema-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cinema-red">~2min</div>
              <p className="text-xs text-muted-foreground">Average detection time</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Your Movie Alerts</h2>
              <p className="text-muted-foreground">Manage your active and paused alerts</p>
            </div>
            <Button 
              variant="hero" 
              onClick={() => setIsCreateModalOpen(true)}
              className="shadow-glow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>

          {/* Alerts Grid */}
          {alerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onEdit={handleEditAlert}
                  onDelete={handleDeleteAlert}
                  onToggle={handleToggleAlert}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-card border-cinema-border text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No alerts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first movie alert to get started
                </p>
                <Button variant="hero" onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Alert
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Alert Modal */}
      <CreateAlertModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingAlert(null);
        }}
        onCreateAlert={handleCreateAlert}
        editingAlert={editingAlert}
      />
    </div>
  );
};
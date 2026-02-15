import Navbar from "@/components/Navbar";
import { alerts } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Download, Info, XCircle } from "lucide-react";

const alertIcons = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertStyles = {
  critical: "border-l-4 border-l-destructive bg-destructive/5",
  warning: "border-l-4 border-l-warning bg-warning/5",
  info: "border-l-4 border-l-info bg-info/5",
};

const Alerts = () => {
  const handleExport = () => {
    const header = "ID,Type,Title,Message,Date,Village";
    const rows = alerts.map(a => `${a.id},${a.type},"${a.title}","${a.message}",${a.date},${a.village}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alerts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Health <span className="gradient-text">Alerts</span></h1>
            <p className="text-muted-foreground mt-1">Active alerts and notifications</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        {/* Red Alert Banner */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-8 flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <p className="font-heading font-semibold text-destructive">🔴 Active Critical Alert</p>
            <p className="text-sm text-muted-foreground">2 critical alerts require immediate attention</p>
          </div>
        </div>

        {/* Alert Cards */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type as keyof typeof alertIcons];
            const style = alertStyles[alert.type as keyof typeof alertStyles];
            return (
              <div key={alert.id} className={`glass-card p-5 ${style} hover:shadow-lg transition-shadow`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    alert.type === 'critical' ? 'text-destructive' :
                    alert.type === 'warning' ? 'text-warning' : 'text-info'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading font-semibold">{alert.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        📍 {alert.village}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts;

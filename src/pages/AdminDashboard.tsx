import { Link } from "react-router-dom";
import { Activity, AlertTriangle, BarChart3, Bell, Heart, Settings, Users, Shield, Droplets, ThermometerSun, TrendingUp, FileText, Download } from "lucide-react";
import { useHealthData } from "@/context/HealthDataContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { weeklyCases } from "@/data/dummy-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const { totalCases, activeCases, recovered, villages, contamination } = useHealthData();
  const { communityUsers, healthWorkers, user } = useAuth();

  const statCards = [
    { label: "Total Cases", value: totalCases, icon: Activity, color: "text-primary", bg: "bg-primary/10" },
    { label: "Active Cases", value: activeCases, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Recovered", value: recovered, icon: Heart, color: "text-success", bg: "bg-success/10" },
    { label: "Villages", value: villages.length, icon: Users, color: "text-info", bg: "bg-info/10" },
  ];

  const quickLinks = [
    { label: "Disease Monitoring", to: "/dashboard", icon: BarChart3, desc: "Real-time disease & water tracking" },
    { label: "Health Workers", to: "/health-worker", icon: Heart, desc: "Manage field reports & cases" },
    { label: "Community Portal", to: "/community", icon: Users, desc: "Community risk & alerts" },
    { label: "Alerts", to: "/alerts", icon: Bell, desc: "View active health alerts" },
    { label: "Analytics", to: "/analytics", icon: Activity, desc: "Trends & AI predictions" },
    { label: "Manage Users", to: "/admin/users", icon: Settings, desc: "Add community users & manage access" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, <span className="font-medium text-foreground">{user?.name}</span>. Here's your system overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="glass-card p-5 flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* System Overview Row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 text-center">
          <Droplets className="w-8 h-8 text-info mx-auto mb-2" />
          <p className="text-3xl font-heading font-bold">7.0</p>
          <p className="text-sm text-muted-foreground">pH Level</p>
        </div>
        <div className="glass-card p-5 text-center">
          <ThermometerSun className="w-8 h-8 text-warning mx-auto mb-2" />
          <p className="text-3xl font-heading font-bold">4.2 NTU</p>
          <p className="text-sm text-muted-foreground">Turbidity</p>
        </div>
        <div className="glass-card p-5 text-center">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-3xl font-heading font-bold">{contamination}%</p>
          <p className="text-sm text-muted-foreground">Contamination</p>
        </div>
      </div>

      {/* Chart + User Summary */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-heading font-semibold mb-4">Weekly Disease Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyCases}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="cholera" fill="hsl(152, 55%, 32%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="typhoid" fill="hsl(185, 45%, 40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="diarrhea" fill="hsl(45, 85%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> User Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Health Workers</span>
              </div>
              <span className="text-lg font-heading font-bold text-primary">{healthWorkers.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Community Users</span>
              </div>
              <span className="text-lg font-heading font-bold text-primary">{communityUsers.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Recovery Rate</span>
              </div>
              <span className="text-lg font-heading font-bold text-success">
                {totalCases > 0 ? Math.round(((totalCases - activeCases) / totalCases) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="glass-card p-5 group hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

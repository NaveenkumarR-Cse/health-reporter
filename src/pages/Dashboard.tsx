import Navbar from "@/components/Navbar";
import { Activity, AlertTriangle, Droplets, Heart, ThermometerSun, Users, Download, FileText } from "lucide-react";
import { useHealthData } from "@/context/HealthDataContext";
import { weeklyCases, waterQualityData } from "@/data/dummy-data";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import VillageMap from "@/components/VillageMap";

const Dashboard = () => {
  const { totalCases, activeCases, recovered, villages, contamination } = useHealthData();

  const statCards = [
    { label: "Total Cases", value: totalCases, icon: Activity, color: "text-primary" },
    { label: "Active Cases", value: activeCases, icon: AlertTriangle, color: "text-destructive" },
    { label: "Recovered", value: recovered, icon: Heart, color: "text-success" },
    { label: "Villages", value: villages.length, icon: Users, color: "text-info" },
  ];

  const handleDownloadReport = () => {
    const report = [
      "HealthGuard NE - Disease Monitoring Report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "=== Summary Statistics ===",
      `Total Cases: ${totalCases}`,
      `Active Cases: ${activeCases}`,
      `Recovered: ${recovered}`,
      `Villages Monitored: ${villages.length}`,
      `Contamination Index: ${contamination}%`,
      "",
      "=== Village Risk Levels ===",
      ...villages.map(v => `${v.name}: ${v.risk.toUpperCase()} (${v.cases} cases)`),
      "",
      "=== Weekly Case Data ===",
      "Week, Cholera, Typhoid, Dysentery, Hepatitis, Diarrhea",
      ...weeklyCases.map(w => `${w.week}, ${w.cholera}, ${w.typhoid}, ${w.dysentery}, ${w.hepatitis}, ${w.diarrhea}`),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healthguard-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const header = "Village,Risk Level,Active Cases,Latitude,Longitude";
    const rows = villages.map(v => `${v.name},${v.risk},${v.cases},${v.lat},${v.lng}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `village-data-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground mt-1">Real-time disease and water quality monitoring</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadReport}>
              <FileText className="w-4 h-4" /> Download Report
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExportCSV}>
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className="stat-card flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-heading font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Water Quality Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="stat-card text-center">
            <Droplets className="w-8 h-8 text-info mx-auto mb-2" />
            <p className="text-3xl font-heading font-bold">7.0</p>
            <p className="text-sm text-muted-foreground">pH Level</p>
          </div>
          <div className="stat-card text-center">
            <ThermometerSun className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-3xl font-heading font-bold">4.2 NTU</p>
            <p className="text-sm text-muted-foreground">Turbidity</p>
          </div>
          <div className="stat-card text-center">
            <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-3xl font-heading font-bold">{contamination}%</p>
            <p className="text-sm text-muted-foreground">Contamination</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4">Weekly Disease Cases</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyCases}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cholera" fill="hsl(152, 55%, 32%)" radius={[4,4,0,0]} />
                <Bar dataKey="typhoid" fill="hsl(185, 45%, 40%)" radius={[4,4,0,0]} />
                <Bar dataKey="diarrhea" fill="hsl(45, 85%, 55%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4">Water Quality Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={waterQualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="contamination" stroke="hsl(0, 72%, 50%)" fill="hsl(0, 72%, 50%, 0.15)" />
                <Area type="monotone" dataKey="ph" stroke="hsl(152, 55%, 32%)" fill="hsl(152, 55%, 32%, 0.15)" />
                <Area type="monotone" dataKey="turbidity" stroke="hsl(45, 85%, 55%)" fill="hsl(45, 85%, 55%, 0.15)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Village Risk Map */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-heading font-semibold mb-4">Village Risk Map</h3>
          <VillageMap villages={villages} />
        </div>

        {/* Village Risk Table */}
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4">Village Risk Levels</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Village</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Risk Level</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Active Cases</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Coordinates</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((v, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{v.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium risk-${v.risk}`}>
                        {v.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{v.cases}</td>
                    <td className="py-3 px-4 text-muted-foreground">{v.lat.toFixed(2)}°N, {v.lng.toFixed(2)}°E</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

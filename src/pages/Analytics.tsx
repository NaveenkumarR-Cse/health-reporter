import Navbar from "@/components/Navbar";
import { monthlyTrends, weeklyCases, waterQualityData } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const villageComparison = [
  { village: "Mawsynram", cholera: 34, typhoid: 12, diarrhea: 28 },
  { village: "Dimapur", cholera: 41, typhoid: 18, diarrhea: 22 },
  { village: "Silchar", cholera: 29, typhoid: 15, diarrhea: 19 },
  { village: "Shillong", cholera: 22, typhoid: 10, diarrhea: 14 },
  { village: "Tura", cholera: 5, typhoid: 3, diarrhea: 8 },
];

const Analytics = () => {
  const handleDownloadReport = () => {
    const report = [
      "HealthGuard NE - Analytics Report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "=== Monthly Disease Trends ===",
      "Month, Actual Cases, Predicted",
      ...monthlyTrends.map(m => `${m.month}, ${m.cases ?? 'N/A'}, ${m.prediction}`),
      "",
      "=== Village Comparison ===",
      "Village, Cholera, Typhoid, Diarrhea",
      ...villageComparison.map(v => `${v.village}, ${v.cholera}, ${v.typhoid}, ${v.diarrhea}`),
      "",
      "=== Water Quality Data ===",
      "Month, pH, Turbidity, Contamination%",
      ...waterQualityData.map(w => `${w.date}, ${w.ph}, ${w.turbidity}, ${w.contamination}`),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Disease <span className="gradient-text">Analytics</span></h1>
            <p className="text-muted-foreground mt-1">Trends, predictions, and insights</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleDownloadReport}>
            <Download className="w-4 h-4" /> Download Report
          </Button>
        </div>

        {/* Prediction Confidence */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-heading font-semibold mb-3">AI Prediction Confidence</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
              <div className="h-full rounded-full gradient-hero" style={{ width: "78%" }} />
            </div>
            <span className="text-lg font-heading font-bold text-primary">78%</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Disease outbreak prediction confidence based on current water quality and seasonal patterns.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4">Monthly Disease Trend & Prediction</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="hsl(152, 55%, 32%)" strokeWidth={2} dot={{ r: 4 }} name="Actual" connectNulls={false} />
                <Line type="monotone" dataKey="prediction" stroke="hsl(185, 45%, 40%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4">Village Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={villageComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
                <XAxis dataKey="village" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cholera" fill="hsl(152, 55%, 32%)" radius={[4,4,0,0]} />
                <Bar dataKey="typhoid" fill="hsl(185, 45%, 40%)" radius={[4,4,0,0]} />
                <Bar dataKey="diarrhea" fill="hsl(45, 85%, 55%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water vs Disease Correlation */}
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4">Water Contamination vs Disease Cases Correlation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waterQualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="contamination" stroke="hsl(0, 72%, 50%)" strokeWidth={2} name="Contamination %" />
              <Line yAxisId="right" type="monotone" dataKey="turbidity" stroke="hsl(45, 85%, 55%)" strokeWidth={2} name="Turbidity (NTU)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

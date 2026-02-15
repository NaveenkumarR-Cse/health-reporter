import Navbar from "@/components/Navbar";
import { safeWaterTips } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Phone, Shield, Bell } from "lucide-react";
import { useState } from "react";
import { useHealthData } from "@/context/HealthDataContext";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { addSubscription, activeCases } = useHealthData();
  const { toast } = useToast();
  const [subForm, setSubForm] = useState({ name: "", mobile: "", village: "" });

  const riskLevel = activeCases >= 5 ? "HIGH" : activeCases >= 3 ? "MEDIUM" : "LOW";
  const riskEmoji = riskLevel === "HIGH" ? "🔴" : riskLevel === "MEDIUM" ? "⚠️" : "🟢";
  const riskClass = riskLevel === "HIGH" ? "risk-high" : riskLevel === "MEDIUM" ? "risk-medium" : "risk-low";

  const handleSubscribe = () => {
    if (!subForm.name || !subForm.mobile || !subForm.village) {
      toast({ title: "Missing fields", description: "Please fill all fields to subscribe.", variant: "destructive" });
      return;
    }
    if (!/^\+?\d{10,13}$/.test(subForm.mobile.replace(/\s/g, ""))) {
      toast({ title: "Invalid mobile", description: "Please enter a valid mobile number.", variant: "destructive" });
      return;
    }
    addSubscription(subForm);
    toast({ title: "Subscribed!", description: `${subForm.name} will receive alerts for ${subForm.village}.` });
    setSubForm({ name: "", mobile: "", village: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Community <span className="gradient-text">Portal</span></h1>
          <p className="text-muted-foreground mt-1">Stay informed about health risks in your area</p>
        </div>

        {/* Current Risk Level */}
        <div className="glass-card-elevated p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-warning/10" />
          <div className="relative">
            <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-3" />
            <h2 className="text-2xl font-heading font-bold mb-2">Current Risk Level</h2>
            <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold ${riskClass} border-2`}>
              {riskEmoji} {riskLevel}
            </div>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              {riskLevel === "HIGH"
                ? "High contamination detected. Avoid drinking untreated water."
                : riskLevel === "MEDIUM"
                ? "Elevated water contamination detected in some areas. Please boil all drinking water."
                : "Water quality is within acceptable range. Continue safe practices."}
            </p>
          </div>
        </div>

        {/* Safe Water Tips */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-6">Safe Water <span className="gradient-text">Guidelines</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeWaterTips.map((tip, i) => (
              <div key={i} className="glass-card p-5 hover:scale-[1.02] transition-all duration-300">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-heading font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact & SMS Signup */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> Emergency Contacts
            </h3>
            <div className="space-y-3">
              {[
                { label: "District Health Office", number: "+91 364-250-1234" },
                { label: "Emergency Ambulance", number: "108" },
                { label: "Water Quality Helpline", number: "+91 364-250-5678" },
                { label: "Community Health Center", number: "+91 364-250-9012" },
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm">{c.label}</span>
                  <span className="text-sm font-mono font-medium text-primary">{c.number}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> SMS Alert Signup
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receive health alerts directly on your phone. Stay informed about water quality and disease outbreaks in your area.
            </p>
            <div className="space-y-3">
              <Input placeholder="Your name" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} />
              <Input placeholder="Mobile number (+91)" value={subForm.mobile} onChange={(e) => setSubForm({ ...subForm, mobile: e.target.value })} />
              <Input placeholder="Village name" value={subForm.village} onChange={(e) => setSubForm({ ...subForm, village: e.target.value })} />
              <Button className="w-full gap-2" onClick={handleSubscribe}>
                <Shield className="w-4 h-4" /> Subscribe to Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

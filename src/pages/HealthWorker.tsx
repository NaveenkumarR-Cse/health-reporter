import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Wifi, WifiOff, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useHealthData } from "@/context/HealthDataContext";
import { useToast } from "@/hooks/use-toast";

const HealthWorker = () => {
  const [isOnline] = useState(true);
  const { cases, addCase } = useHealthData();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", age: "", village: "", disease: "", severity: "",
    lat: undefined as number | undefined, lng: undefined as number | undefined,
  });
  const [gpsLoading, setGpsLoading] = useState(false);

  const handleCaptureGPS = () => {
    if (!navigator.geolocation) {
      toast({ title: "GPS not available", description: "Your browser doesn't support geolocation.", variant: "destructive" });
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        setGpsLoading(false);
        toast({ title: "GPS Captured", description: `${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E` });
      },
      (err) => { setGpsLoading(false); toast({ title: "GPS Error", description: err.message, variant: "destructive" }); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.village || !form.disease || !form.severity) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    addCase({ name: form.name, age: Number(form.age), village: form.village, disease: form.disease, severity: form.severity, lat: form.lat, lng: form.lng });
    toast({ title: "Case Submitted!", description: `${form.name} from ${form.village} has been recorded.` });
    setForm({ name: "", age: "", village: "", disease: "", severity: "", lat: undefined, lng: undefined });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Health Worker <span className="gradient-text">Panel</span></h1>
          <p className="text-muted-foreground mt-1">Report cases and manage field data</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isOnline ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" /> Report New Case
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><Label>Patient Name</Label><Input placeholder="Enter patient name" className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Age</Label><Input type="number" placeholder="Age" className="mt-1" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></div>
          <div><Label>Village</Label><Input placeholder="Village name" className="mt-1" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} /></div>
          <div>
            <Label>Disease</Label>
            <Select value={form.disease} onValueChange={(v) => setForm({ ...form, disease: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select disease" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cholera">Cholera</SelectItem>
                <SelectItem value="Typhoid">Typhoid</SelectItem>
                <SelectItem value="Dysentery">Dysentery</SelectItem>
                <SelectItem value="Hepatitis A">Hepatitis A</SelectItem>
                <SelectItem value="Diarrhea">Diarrhea</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Severity</Label>
            <Select value={form.severity} onValueChange={(v) => setForm({ ...form, severity: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col justify-end gap-1">
            <Button className="gap-2 w-full" onClick={handleCaptureGPS} disabled={gpsLoading}>
              <MapPin className="w-4 h-4" /> {gpsLoading ? "Capturing..." : form.lat ? `${form.lat.toFixed(2)}°N` : "Capture GPS"}
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Button className="gap-2" onClick={handleSubmit}><CheckCircle2 className="w-4 h-4" /> Submit Case</Button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-heading font-semibold mb-4">Patient Records ({cases.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Village</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Disease</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                  <td className="py-3 px-4 font-medium">{p.name}</td>
                  <td className="py-3 px-4">{p.age}</td>
                  <td className="py-3 px-4">{p.village}</td>
                  <td className="py-3 px-4">{p.disease}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'Active' ? 'risk-high' : 'risk-low'}`}>{p.status}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthWorker;

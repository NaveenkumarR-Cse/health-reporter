import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useHealthData } from "@/context/HealthDataContext";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope, FileText, Send, Loader2 } from "lucide-react";

const getRemedyReport = (symptoms: string, disease: string, severity: string) => {
  const remedies: Record<string, { remedy: string; precautions: string[]; diet: string[]; whenToSeek: string }> = {
    Cholera: {
      remedy: "Oral Rehydration Solution (ORS) is the primary treatment. Dissolve ORS packets in clean, boiled water. Drink small sips frequently. IV fluids may be needed for severe dehydration.",
      precautions: ["Drink only boiled or treated water", "Wash hands with soap frequently", "Avoid raw or undercooked food", "Use clean utensils and containers"],
      diet: ["ORS solution every 30 minutes", "Rice water / kanji", "Bananas for potassium", "Clear soups and broths", "Avoid dairy and spicy foods"],
      whenToSeek: "If diarrhea persists more than 2 days, signs of severe dehydration (dry mouth, sunken eyes, no urination), or high fever.",
    },
    Typhoid: {
      remedy: "Antibiotics prescribed by a doctor are essential. Rest is crucial. Stay hydrated with clean water and electrolyte solutions.",
      precautions: ["Complete the full course of antibiotics", "Rest and avoid physical exertion", "Maintain hygiene to prevent spread", "Isolate personal items"],
      diet: ["Soft, easily digestible foods", "Boiled rice and dal", "Fruit juices (fresh)", "Boiled vegetables", "Avoid fried and spicy foods"],
      whenToSeek: "If fever persists beyond 3 days, abdominal pain worsens, or confusion/disorientation occurs.",
    },
    Dysentery: {
      remedy: "Maintain hydration with ORS. Antibiotics may be needed for bacterial dysentery. Anti-diarrheal medication should be avoided unless prescribed.",
      precautions: ["Strict hand hygiene", "Avoid sharing food and water", "Disinfect bathroom after use", "Wash all fruits and vegetables thoroughly"],
      diet: ["BRAT diet (Bananas, Rice, Applesauce, Toast)", "Clear fluids and ORS", "Yogurt/curd for probiotics", "Avoid raw foods and milk"],
      whenToSeek: "If blood in stool increases, severe abdominal cramps, high fever, or signs of dehydration.",
    },
    "Hepatitis A": {
      remedy: "No specific antiviral treatment. Focus on rest, hydration, and nutrition. The liver needs time to heal. Avoid alcohol completely.",
      precautions: ["Avoid alcohol for at least 6 months", "Practice strict hygiene", "Don't prepare food for others while infectious", "Get vaccinated if not already"],
      diet: ["Small, frequent meals", "High-calorie, easily digestible foods", "Fresh fruits and vegetables", "Avoid fatty and fried foods", "Stay well hydrated"],
      whenToSeek: "If jaundice worsens (yellow eyes/skin), severe fatigue, persistent vomiting, or confusion.",
    },
    Diarrhea: {
      remedy: "Oral Rehydration Therapy is the cornerstone of treatment. Replace lost fluids and electrolytes. Zinc supplements can reduce duration and severity.",
      precautions: ["Drink only safe, clean water", "Wash hands before eating and after using toilet", "Store food properly", "Avoid street food temporarily"],
      diet: ["ORS after every loose stool", "Plain rice with salt", "Boiled potatoes", "Clear chicken soup", "Avoid caffeine, dairy, and sugary drinks"],
      whenToSeek: "If diarrhea lasts more than 3 days, bloody stools, high fever, or unable to keep fluids down.",
    },
  };
  const defaultRemedy = {
    remedy: "Please consult with a healthcare professional for proper diagnosis and treatment.",
    precautions: ["Maintain good hygiene", "Drink clean, boiled water", "Rest adequately", "Monitor symptoms"],
    diet: ["Light, easily digestible foods", "Stay hydrated", "Avoid processed foods"],
    whenToSeek: "If symptoms persist or worsen, seek medical attention immediately.",
  };
  return remedies[disease] || defaultRemedy;
};

const PeopleCheckup = () => {
  const { user } = useAuth();
  const { addCase } = useHealthData();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const [form, setForm] = useState({
    symptoms: "", disease: "", severity: "", village: user?.village || "", duration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symptoms || !form.disease || !form.severity) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addCase({ name: user?.name || "Unknown", age: 0, village: form.village || user?.village || "Unknown", disease: form.disease, severity: form.severity, lat: undefined, lng: undefined });
      const remedyData = getRemedyReport(form.symptoms, form.disease, form.severity);
      setReport({ ...remedyData, disease: form.disease, severity: form.severity, symptoms: form.symptoms, patientName: user?.name, date: new Date().toLocaleString(), village: form.village });
      setLoading(false);
      toast({ title: "Report Generated!", description: "Your health report with remedies is ready." });
    }, 1500);
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const text = [
      "═══════════════════════════════════════", "   HEALTHGUARD NE - HEALTH REPORT", "═══════════════════════════════════════", "",
      `Patient: ${report.patientName}`, `Village: ${report.village}`, `Date: ${report.date}`, `Disease: ${report.disease}`, `Severity: ${report.severity}`, "",
      "── Symptoms Reported ──", report.symptoms, "", "── Recommended Remedy ──", report.remedy, "",
      "── Precautions ──", ...report.precautions.map((p: string, i: number) => `${i + 1}. ${p}`), "",
      "── Recommended Diet ──", ...report.diet.map((d: string, i: number) => `${i + 1}. ${d}`), "",
      "── When to Seek Medical Attention ──", report.whenToSeek, "",
      "═══════════════════════════════════════", "This report is for informational purposes only.", "═══════════════════════════════════════",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `health-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">Health <span className="gradient-text">Checkup</span></h1>
        <p className="text-muted-foreground mt-1">
          Welcome, <span className="font-medium text-foreground">{user?.name}</span>. Describe your symptoms to get an immediate remedy report.
        </p>
      </div>

      <div className="glass-card p-6 mb-8">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" /> Describe Your Health Problem
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Symptoms *</Label>
            <Textarea placeholder="Describe your symptoms in detail..." className="mt-1 min-h-[100px]" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} required />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label>Suspected Disease *</Label>
              <Select value={form.disease} onValueChange={(v) => setForm({ ...form, disease: v })}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
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
              <Label>Severity *</Label>
              <Select value={form.severity} onValueChange={(v) => setForm({ ...form, severity: v })}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Village</Label>
              <Input placeholder="Your village" className="mt-1" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Duration of symptoms</Label>
            <Input placeholder="e.g., 2 days, 1 week" className="mt-1" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Generating Report..." : "Submit & Get Remedy"}
          </Button>
        </form>
      </div>

      {report && (
        <div className="glass-card-elevated p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Your Health Report
            </h3>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadReport}>
              <FileText className="w-4 h-4" /> Download Report
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-muted/50 p-3 rounded-lg"><p className="text-xs text-muted-foreground">Disease</p><p className="font-semibold text-sm">{report.disease}</p></div>
              <div className="bg-muted/50 p-3 rounded-lg"><p className="text-xs text-muted-foreground">Severity</p><p className="font-semibold text-sm capitalize">{report.severity}</p></div>
              <div className="bg-muted/50 p-3 rounded-lg"><p className="text-xs text-muted-foreground">Village</p><p className="font-semibold text-sm">{report.village}</p></div>
              <div className="bg-muted/50 p-3 rounded-lg"><p className="text-xs text-muted-foreground">Date</p><p className="font-semibold text-sm">{new Date().toLocaleDateString()}</p></div>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-heading font-semibold text-primary mb-2">💊 Recommended Remedy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{report.remedy}</p>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-heading font-semibold text-primary mb-2">⚠️ Precautions</h4>
              <ul className="space-y-1">{report.precautions.map((p: string, i: number) => (<li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-0.5">•</span> {p}</li>))}</ul>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-heading font-semibold text-primary mb-2">🥗 Recommended Diet</h4>
              <ul className="space-y-1">{report.diet.map((d: string, i: number) => (<li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-0.5">•</span> {d}</li>))}</ul>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-heading font-semibold text-destructive mb-2">🏥 When to Seek Medical Attention</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{report.whenToSeek}</p>
            </div>
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-muted-foreground">⚕️ <strong>Disclaimer:</strong> This report is AI-generated for informational purposes only. Always consult a qualified healthcare professional.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleCheckup;

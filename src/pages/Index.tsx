import { Link } from "react-router-dom";
import { Shield, Droplets, BarChart3, Bell, Users, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navbar from "@/components/Navbar";
import { useHealthData } from "@/context/HealthDataContext";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Droplets, title: "Water Quality Monitoring", desc: "Real-time tracking of pH, turbidity, and contamination levels across rural water sources." },
  { icon: Bell, title: "Early Warning Alerts", desc: "Automated alerts when disease thresholds or contamination levels are exceeded." },
  { icon: BarChart3, title: "Disease Analytics", desc: "AI-powered prediction and trend analysis for water-borne disease outbreaks." },
  { icon: MapPin, title: "Village Risk Mapping", desc: "Interactive maps showing risk levels across Northeast India communities." },
  { icon: Users, title: "Community Health", desc: "Empowering communities with real-time health information and safe water guidance." },
  { icon: Shield, title: "Health Worker Tools", desc: "Mobile-ready tools for field health workers to report cases and collect data." },
];

const steps = [
  { num: "01", title: "Data Collection", desc: "Health workers collect water samples and report disease cases from villages." },
  { num: "02", title: "Analysis & Prediction", desc: "AI models analyze water quality data and predict disease outbreak probability." },
  { num: "03", title: "Alert Generation", desc: "Automated alerts sent to authorities when risk thresholds are exceeded." },
  { num: "04", title: "Community Action", desc: "Communities receive guidance and authorities deploy rapid response teams." },
];

const Index = () => {
  const { totalCases, villages, activeCases } = useHealthData();
  const healthWorkers = 156;
  const recoveryRate = totalCases > 0 ? Math.round(((totalCases - activeCases) / totalCases) * 100) : 94;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Rural Northeast India landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm mb-6 animate-slide-up">
              <div className="w-2 h-2 rounded-full bg-success pulse-ring" />
              Live Monitoring Active
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary-foreground leading-tight animate-slide-up-delay-1">
              Smart Community{" "}
              <span className="text-accent">Health</span> Monitoring
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed animate-slide-up-delay-2">
              An early warning system for water-borne diseases in rural Northeast India.
              Protecting communities through real-time monitoring, AI predictions, and rapid response.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up-delay-3">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  View Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                  Community Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={totalCases} label="Cases Tracked" />
            <AnimatedCounter end={villages.length} label="Villages Monitored" />
            <AnimatedCounter end={healthWorkers} label="Health Workers" />
            <AnimatedCounter end={recoveryRate} label="Recovery Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">System <span className="gradient-text">Features</span></h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Comprehensive health monitoring designed for rural communities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">How It <span className="gradient-text">Works</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="text-5xl font-heading font-extrabold text-primary/15 mb-2">{s.num}</div>
                <h3 className="text-lg font-heading font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 text-primary/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card-elevated p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Protecting Communities, <span className="gradient-text">Saving Lives</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join our network of health workers and community leaders making Northeast India safer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Get Started
                  </Button>
                </Link>
                <Link to="/alerts">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Bell className="w-4 h-4" /> View Alerts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold">HealthGuard NE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Smart Community Health Monitoring System. Northeast India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

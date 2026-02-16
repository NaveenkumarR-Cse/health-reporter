import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn, Heart, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

type LoginTab = "health_worker" | "people";

const Login = () => {
  const [tab, setTab] = useState<LoginTab>("people");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const success = login(email, password, tab);
      if (success) {
        toast({ title: tab === "health_worker" ? "Welcome, Health Worker!" : "Welcome back!" });
        navigate(tab === "health_worker" ? "/health-worker" : "/checkup");
      } else {
        toast({
          title: "Login failed",
          description: tab === "health_worker"
            ? "Invalid health worker credentials."
            : "Invalid credentials. Please sign up first.",
          variant: "destructive",
        });
      }
    }, 500);
  };

  const tabs: { key: LoginTab; label: string; icon: React.ReactNode }[] = [
    { key: "people", label: "People", icon: <Users className="w-4 h-4" /> },
    { key: "health_worker", label: "Health Worker", icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to HealthGuard NE</p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setEmail(""); setPassword(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="glass-card-elevated p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gap-2 mt-2" disabled={loading}>
              <LogIn className="w-4 h-4" /> {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {tab === "people" && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
            </p>
          )}

          {tab === "health_worker" && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Health Worker accounts are managed by the admin.
            </p>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

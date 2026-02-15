import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple local auth (replace with Firebase later)
    setTimeout(() => {
      setLoading(false);
      if (email && password.length >= 6) {
        toast({ title: "Welcome back!" });
        navigate("/dashboard");
      } else {
        toast({ title: "Login failed", description: "Please enter valid credentials.", variant: "destructive" });
      }
    }, 500);
  };

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
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

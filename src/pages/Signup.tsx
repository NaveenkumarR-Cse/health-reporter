import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email && password.length >= 6 && fullName) {
        // Register as people (self-registration)
        const success = login(email, password, "people", fullName, mobile, village);
        if (success) {
          toast({ title: "Account created!", description: "Welcome to HealthGuard NE." });
          navigate("/checkup");
        }
      } else {
        toast({ title: "Signup failed", description: "Please fill all fields correctly.", variant: "destructive" });
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
          <h1 className="text-2xl font-heading font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-1">Register for health checkup portal</p>
        </div>

        <div className="glass-card-elevated p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input type="text" placeholder="Your full name" className="mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <Label>Email *</Label>
              <Input type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label>Password *</Label>
              <Input type="password" placeholder="••••••••" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input type="tel" placeholder="+91 XXXXXXXXXX" className="mt-1" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div>
              <Label>Village</Label>
              <Input type="text" placeholder="Your village name" className="mt-1" value={village} onChange={(e) => setVillage(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gap-2 mt-2" disabled={loading}>
              <UserPlus className="w-4 h-4" /> {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

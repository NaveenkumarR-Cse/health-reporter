import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  Shield,
  Users,
  X,
  Settings,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [{ label: "Home", to: "/", icon: Home }];
    }

    switch (user.role) {
      case "admin":
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Dashboard", to: "/dashboard", icon: BarChart3 },
          { label: "Health Worker", to: "/health-worker", icon: Heart },
          { label: "Community", to: "/community", icon: Users },
          { label: "Alerts", to: "/alerts", icon: Bell },
          { label: "Analytics", to: "/analytics", icon: Activity },
          { label: "Admin", to: "/admin", icon: Settings },
        ];
      case "health_worker":
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Dashboard", to: "/dashboard", icon: BarChart3 },
          { label: "Health Worker", to: "/health-worker", icon: Heart },
          { label: "Community", to: "/community", icon: Users },
          { label: "Alerts", to: "/alerts", icon: Bell },
          { label: "Analytics", to: "/analytics", icon: Activity },
        ];
      case "community":
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Community", to: "/community", icon: Users },
        ];
      case "people":
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Health Checkup", to: "/checkup", icon: Stethoscope },
        ];
      default:
        return [{ label: "Home", to: "/", icon: Home }];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg hidden sm:block">
              HealthGuard <span className="text-primary">NE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-xs ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{user.role.replace("_", " ")}</span>
                </span>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button variant="outline" size="sm" className="w-full mt-2 gap-2" onClick={() => { handleLogout(); setOpen(false); }}>
                <LogOut className="w-4 h-4" /> Logout ({user?.name})
              </Button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="w-full mt-2 gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

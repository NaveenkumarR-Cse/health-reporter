import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  Heart,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  Stethoscope,
  Users,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          { label: "Admin Dashboard", to: "/admin", icon: LayoutDashboard },
          { label: "Monitoring", to: "/dashboard", icon: BarChart3 },
          { label: "Health Worker", to: "/health-worker", icon: Heart },
          { label: "Community", to: "/community", icon: Users },
          { label: "Alerts", to: "/alerts", icon: Bell },
          { label: "Analytics", to: "/analytics", icon: Activity },
          { label: "Manage Users", to: "/admin/users", icon: Settings },
        ];
      case "health_worker":
        return [
          { label: "Dashboard", to: "/dashboard", icon: BarChart3 },
          { label: "Health Worker", to: "/health-worker", icon: Heart },
          { label: "Community", to: "/community", icon: Users },
          { label: "Alerts", to: "/alerts", icon: Bell },
          { label: "Analytics", to: "/analytics", icon: Activity },
        ];
      case "community":
        return [
          { label: "Community", to: "/community", icon: Users },
        ];
      case "people":
        return [
          { label: "Health Checkup", to: "/checkup", icon: Stethoscope },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-heading font-bold text-sm whitespace-nowrap">
                HealthGuard <span className="text-sidebar-primary">NE</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors hidden md:flex"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-sidebar-border p-3">
          {!collapsed && user && (
            <div className="mb-3 px-2">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role.replace("_", " ")}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed ? "w-full justify-center px-0" : "w-full justify-start gap-2"
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-xl px-6">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Home
          </Link>
          {user && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize font-medium">
              {user.role.replace("_", " ")}
            </span>
          )}
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

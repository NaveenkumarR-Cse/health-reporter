import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthDataProvider } from "@/context/HealthDataContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HealthWorker from "./pages/HealthWorker";
import Community from "./pages/Community";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import PeopleCheckup from "./pages/PeopleCheckup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <HealthDataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin", "health_worker"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/health-worker" element={<ProtectedRoute allowedRoles={["admin", "health_worker"]}><HealthWorker /></ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute allowedRoles={["admin", "health_worker", "community"]}><Community /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute allowedRoles={["admin", "health_worker"]}><Alerts /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute allowedRoles={["admin", "health_worker"]}><Analytics /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel /></ProtectedRoute>} />
              <Route path="/checkup" element={<ProtectedRoute allowedRoles={["people"]}><PeopleCheckup /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HealthDataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

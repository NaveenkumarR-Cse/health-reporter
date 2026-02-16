import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "health_worker" | "community" | "people";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  village?: string;
}

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string, role: UserRole, name?: string, mobile?: string, village?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  communityUsers: AppUser[];
  addCommunityUser: (user: Omit<AppUser, "id" | "role">) => void;
  healthWorkers: AppUser[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

// Default admin (added by developer)
const DEFAULT_ADMIN: AppUser & { password: string } = {
  id: "admin-001",
  name: "NAVEENKUMAR R",
  email: "designstudiocse@gmail.com",
  role: "admin",
  password: "adminnaveen@123",
};

// Default health workers for demo
const DEFAULT_HEALTH_WORKERS: (AppUser & { password: string })[] = [
  { id: "hw-001", name: "Dr. Priya Sharma", email: "priya@healthguard.com", role: "health_worker", password: "health123" },
  { id: "hw-002", name: "Dr. Rahul Das", email: "rahul@healthguard.com", role: "health_worker", password: "health123" },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [communityUsers, setCommunityUsers] = useState<(AppUser & { password: string })[]>([]);
  const [peopleUsers, setPeopleUsers] = useState<(AppUser & { password: string })[]>([]);

  const login = useCallback((email: string, password: string, role: UserRole): boolean => {
    const emailLower = email.toLowerCase().trim();

    if (role === "admin") {
      if (emailLower === DEFAULT_ADMIN.email.toLowerCase() && password === DEFAULT_ADMIN.password) {
        setUser({ id: DEFAULT_ADMIN.id, name: DEFAULT_ADMIN.name, email: DEFAULT_ADMIN.email, role: "admin" });
        return true;
      }
      return false;
    }

    if (role === "health_worker") {
      const hw = DEFAULT_HEALTH_WORKERS.find(
        (h) => h.email.toLowerCase() === emailLower && h.password === password
      );
      if (hw) {
        setUser({ id: hw.id, name: hw.name, email: hw.email, role: "health_worker" });
        return true;
      }
      return false;
    }

    if (role === "community") {
      const cu = communityUsers.find(
        (c) => c.email.toLowerCase() === emailLower && c.password === password
      );
      if (cu) {
        setUser({ id: cu.id, name: cu.name, email: cu.email, role: "community", mobile: cu.mobile, village: cu.village });
        return true;
      }
      return false;
    }

    if (role === "people") {
      const pu = peopleUsers.find(
        (p) => p.email.toLowerCase() === emailLower && p.password === password
      );
      if (pu) {
        setUser({ id: pu.id, name: pu.name, email: pu.email, role: "people", mobile: pu.mobile, village: pu.village });
        return true;
      }
      // Auto-register people on first login attempt if not found
      return false;
    }

    return false;
  }, [communityUsers, peopleUsers]);

  const logout = useCallback(() => setUser(null), []);

  const isAuthenticated = !!user;

  const hasRole = useCallback((roles: UserRole[]) => {
    return !!user && roles.includes(user.role);
  }, [user]);

  const addCommunityUser = useCallback((newUser: Omit<AppUser, "id" | "role"> & { password?: string }) => {
    const cu: AppUser & { password: string } = {
      ...newUser,
      id: `community-${Date.now()}`,
      role: "community",
      password: (newUser as any).password || "community123",
    };
    setCommunityUsers((prev) => [...prev, cu]);
  }, []);

  // People can self-register
  const registerPeople = useCallback((newUser: Omit<AppUser, "id" | "role"> & { password: string }) => {
    const pu: AppUser & { password: string } = {
      ...newUser,
      id: `people-${Date.now()}`,
      role: "people",
    };
    setPeopleUsers((prev) => [...prev, pu]);
    return pu;
  }, []);

  // Expose registerPeople through login for signup flow
  const loginWithRegistration = useCallback((email: string, password: string, role: UserRole, name?: string, mobile?: string, village?: string): boolean => {
    if (role === "people" && name) {
      // Register and login
      const pu = registerPeople({ name, email, mobile, village, password });
      setUser({ id: pu.id, name: pu.name, email: pu.email, role: "people", mobile, village });
      return true;
    }
    return login(email, password, role);
  }, [login, registerPeople]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginWithRegistration,
        logout,
        isAuthenticated,
        hasRole,
        communityUsers: communityUsers.map(({ password, ...rest }) => rest),
        addCommunityUser,
        healthWorkers: DEFAULT_HEALTH_WORKERS.map(({ password, ...rest }) => rest),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

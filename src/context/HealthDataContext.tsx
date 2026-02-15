import React, { createContext, useContext, useState, useCallback } from "react";
import { patientRecords as initialRecords, villageRiskData as initialVillages } from "@/data/dummy-data";

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  village: string;
  disease: string;
  status: string;
  date: string;
  severity: string;
  lat?: number;
  lng?: number;
}

export interface AlertSubscription {
  id: string;
  name: string;
  mobile: string;
  village: string;
  subscribedAt: string;
}

interface VillageData {
  name: string;
  risk: string;
  cases: number;
  lat: number;
  lng: number;
}

interface HealthDataContextType {
  cases: PatientCase[];
  addCase: (c: Omit<PatientCase, "id" | "date" | "status">) => void;
  addCasesFromCSV: (cases: Omit<PatientCase, "id" | "date" | "status">[]) => void;
  totalCases: number;
  activeCases: number;
  recovered: number;
  villages: VillageData[];
  contamination: number;
  subscriptions: AlertSubscription[];
  addSubscription: (sub: Omit<AlertSubscription, "id" | "subscribedAt">) => void;
}

const HealthDataContext = createContext<HealthDataContextType | null>(null);

export const useHealthData = () => {
  const ctx = useContext(HealthDataContext);
  if (!ctx) throw new Error("useHealthData must be inside HealthDataProvider");
  return ctx;
};

export const HealthDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cases, setCases] = useState<PatientCase[]>(initialRecords);
  const [subscriptions, setSubscriptions] = useState<AlertSubscription[]>([]);

  const addCase = useCallback((c: Omit<PatientCase, "id" | "date" | "status">) => {
    const newCase: PatientCase = {
      ...c,
      id: `P${String(Date.now()).slice(-4)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    setCases((prev) => [newCase, ...prev]);
  }, []);

  const addCasesFromCSV = useCallback((csvCases: Omit<PatientCase, "id" | "date" | "status">[]) => {
    const newCases = csvCases.map((c, i) => ({
      ...c,
      id: `P${String(Date.now() + i).slice(-4)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Active" as const,
    }));
    setCases((prev) => [...newCases, ...prev]);
  }, []);

  const addSubscription = useCallback((sub: Omit<AlertSubscription, "id" | "subscribedAt">) => {
    setSubscriptions((prev) => [
      ...prev,
      { ...sub, id: `S${Date.now()}`, subscribedAt: new Date().toISOString() },
    ]);
  }, []);

  // Derived stats
  const totalCases = cases.length;
  const activeCases = cases.filter((c) => c.status === "Active").length;
  const recovered = cases.filter((c) => c.status === "Recovered").length;

  // Build village data from cases
  const villageMap = new Map<string, VillageData>();
  initialVillages.forEach((v) => villageMap.set(v.name, { ...v, cases: 0 }));
  cases.forEach((c) => {
    const existing = villageMap.get(c.village);
    if (existing) {
      existing.cases += 1;
    } else {
      villageMap.set(c.village, {
        name: c.village,
        risk: "low",
        cases: 1,
        lat: c.lat || 25.5,
        lng: c.lng || 92.0,
      });
    }
  });
  // Update risk based on case count
  villageMap.forEach((v) => {
    if (v.cases >= 30) v.risk = "high";
    else if (v.cases >= 10) v.risk = "medium";
    else v.risk = "low";
  });
  const villages = Array.from(villageMap.values());

  const contamination = Math.min(100, Math.round((activeCases / Math.max(totalCases, 1)) * 100));

  return (
    <HealthDataContext.Provider
      value={{
        cases,
        addCase,
        addCasesFromCSV,
        totalCases,
        activeCases,
        recovered,
        villages,
        contamination,
        subscriptions,
        addSubscription,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

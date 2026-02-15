export const diseaseStats = {
  totalCases: 1247,
  activeCases: 89,
  recovered: 1134,
  deaths: 24,
  villages: 47,
  healthWorkers: 156,
};

export const weeklyCases = [
  { week: "Week 1", cholera: 12, typhoid: 8, dysentery: 15, hepatitis: 3, diarrhea: 22 },
  { week: "Week 2", cholera: 15, typhoid: 6, dysentery: 12, hepatitis: 5, diarrhea: 18 },
  { week: "Week 3", cholera: 8, typhoid: 10, dysentery: 9, hepatitis: 4, diarrhea: 25 },
  { week: "Week 4", cholera: 20, typhoid: 12, dysentery: 18, hepatitis: 7, diarrhea: 30 },
  { week: "Week 5", cholera: 14, typhoid: 9, dysentery: 11, hepatitis: 2, diarrhea: 16 },
  { week: "Week 6", cholera: 6, typhoid: 5, dysentery: 7, hepatitis: 1, diarrhea: 12 },
];

export const waterQualityData = [
  { date: "Jan", ph: 7.2, turbidity: 3.1, contamination: 12 },
  { date: "Feb", ph: 6.8, turbidity: 4.5, contamination: 25 },
  { date: "Mar", ph: 7.0, turbidity: 3.8, contamination: 18 },
  { date: "Apr", ph: 6.5, turbidity: 5.2, contamination: 35 },
  { date: "May", ph: 7.1, turbidity: 2.9, contamination: 10 },
  { date: "Jun", ph: 6.9, turbidity: 6.1, contamination: 42 },
];

export const villageRiskData = [
  { name: "Mawsynram", risk: "high", cases: 34, lat: 25.2972, lng: 91.5822 },
  { name: "Cherrapunji", risk: "medium", cases: 18, lat: 25.2700, lng: 91.7319 },
  { name: "Tura", risk: "low", cases: 5, lat: 25.5147, lng: 90.2102 },
  { name: "Shillong", risk: "medium", cases: 22, lat: 25.5788, lng: 91.8933 },
  { name: "Dimapur", risk: "high", cases: 41, lat: 25.9042, lng: 93.7270 },
  { name: "Jorhat", risk: "low", cases: 8, lat: 26.7509, lng: 94.2037 },
  { name: "Tezpur", risk: "medium", cases: 15, lat: 26.6338, lng: 92.7930 },
  { name: "Silchar", risk: "high", cases: 29, lat: 24.8333, lng: 92.7789 },
];

export const alerts = [
  { id: 1, type: "critical", title: "Cholera Outbreak - Mawsynram", message: "Water contamination level exceeded 40%. Immediate action required.", date: "2026-02-12", village: "Mawsynram" },
  { id: 2, type: "warning", title: "Rising Typhoid Cases - Dimapur", message: "15 new cases reported in last 48 hours. Monitoring intensified.", date: "2026-02-11", village: "Dimapur" },
  { id: 3, type: "info", title: "Water Quality Improved - Jorhat", message: "pH levels normalized after treatment. Continue monitoring.", date: "2026-02-10", village: "Jorhat" },
  { id: 4, type: "critical", title: "Dysentery Surge - Silchar", message: "Cluster of cases detected near river source. Boil water advisory issued.", date: "2026-02-10", village: "Silchar" },
  { id: 5, type: "warning", title: "Contamination Alert - Shillong", message: "Turbidity levels rising in main water supply.", date: "2026-02-09", village: "Shillong" },
];

export const monthlyTrends = [
  { month: "Jul", cases: 156, prediction: 160 },
  { month: "Aug", cases: 203, prediction: 195 },
  { month: "Sep", cases: 178, prediction: 185 },
  { month: "Oct", cases: 134, prediction: 140 },
  { month: "Nov", cases: 98, prediction: 105 },
  { month: "Dec", cases: 67, prediction: 72 },
  { month: "Jan", cases: 89, prediction: 85 },
  { month: "Feb", cases: null, prediction: 95 },
];

export const patientRecords = [
  { id: "P001", name: "Ranjit Das", age: 34, village: "Mawsynram", disease: "Cholera", status: "Active", date: "2026-02-10", severity: "severe", lat: 25.2972, lng: 91.5822 },
  { id: "P002", name: "Meena Devi", age: 28, village: "Silchar", disease: "Dysentery", status: "Recovered", date: "2026-02-08", severity: "moderate", lat: 24.8333, lng: 92.7789 },
  { id: "P003", name: "Bimal Nath", age: 45, village: "Dimapur", disease: "Typhoid", status: "Active", date: "2026-02-11", severity: "severe", lat: 25.9042, lng: 93.7270 },
  { id: "P004", name: "Priya Sharma", age: 22, village: "Shillong", disease: "Diarrhea", status: "Recovered", date: "2026-02-07", severity: "mild", lat: 25.5788, lng: 91.8933 },
  { id: "P005", name: "Kamal Singh", age: 56, village: "Mawsynram", disease: "Hepatitis A", status: "Active", date: "2026-02-12", severity: "moderate", lat: 25.2972, lng: 91.5822 },
];

export const safeWaterTips = [
  { icon: "💧", title: "Boil Water", desc: "Always boil drinking water for at least 1 minute before consumption." },
  { icon: "🧴", title: "Use Purification Tablets", desc: "Use chlorine tablets for water purification when boiling is not possible." },
  { icon: "🚰", title: "Store Safely", desc: "Store clean water in covered containers to prevent contamination." },
  { icon: "🧼", title: "Wash Hands", desc: "Wash hands with soap before eating and after using the toilet." },
  { icon: "🍎", title: "Clean Food", desc: "Wash fruits and vegetables with clean water before eating." },
  { icon: "🏥", title: "Seek Help Early", desc: "Visit nearest health center immediately if you have symptoms." },
];

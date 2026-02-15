import { useState } from "react";

interface Village {
  name: string;
  risk: string;
  cases: number;
  lat: number;
  lng: number;
}

interface VillageMapProps {
  villages: Village[];
}

const riskColors: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

const VillageMap = ({ villages }: VillageMapProps) => {
  const [selected, setSelected] = useState<Village | null>(null);

  // Simple visual map representation without Google Maps dependency
  const minLat = Math.min(...villages.map((v) => v.lat));
  const maxLat = Math.max(...villages.map((v) => v.lat));
  const minLng = Math.min(...villages.map((v) => v.lng));
  const maxLng = Math.max(...villages.map((v) => v.lng));
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  return (
    <div className="relative w-full h-[400px] rounded-xl bg-muted/50 overflow-hidden border border-border/50">
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        {[...Array(10)].map((_, i) => (
          <div key={`h${i}`} className="absolute w-full border-t border-foreground/10" style={{ top: `${i * 10}%` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={`v${i}`} className="absolute h-full border-l border-foreground/10" style={{ left: `${i * 10}%` }} />
        ))}
      </div>

      {villages.map((v, i) => {
        const x = ((v.lng - minLng) / lngRange) * 80 + 10;
        const y = 90 - ((v.lat - minLat) / latRange) * 80;
        return (
          <button
            key={i}
            onClick={() => setSelected(selected?.name === v.name ? null : v)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className={`w-6 h-6 rounded-full ${riskColors[v.risk]} border-2 border-card shadow-lg transition-transform group-hover:scale-125`} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap text-muted-foreground">
              {v.name}
            </div>
          </button>
        );
      })}

      {selected && (
        <div className="absolute top-4 right-4 glass-card-elevated p-4 min-w-[180px] z-10">
          <h4 className="font-heading font-bold text-sm">{selected.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Risk: <span className={`font-semibold ${selected.risk === 'high' ? 'text-destructive' : selected.risk === 'medium' ? 'text-warning' : 'text-success'}`}>{selected.risk.toUpperCase()}</span>
          </p>
          <p className="text-xs text-muted-foreground">Cases: {selected.cases}</p>
          <p className="text-xs text-muted-foreground">{selected.lat.toFixed(2)}°N, {selected.lng.toFixed(2)}°E</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive" /> High</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-warning" /> Medium</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-success" /> Low</span>
      </div>
    </div>
  );
};

export default VillageMap;

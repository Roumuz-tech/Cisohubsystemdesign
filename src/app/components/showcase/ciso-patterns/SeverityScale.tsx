import {
  AlertOctagon,
  AlertTriangle,
  Circle,
  Info,
} from "lucide-react";

/* ───────────────────────── 4. Severity Scale ───────────────────────── */
export function SeverityScaleDemo() {
  const sev = [
    { name: "Critical", val: "var(--color-sev-critical)", text: "#ffffff", icon: AlertOctagon,  code: "#ef4444", use: "Immediate action · breach · exploit" },
    { name: "High",     val: "var(--color-sev-high)",     text: "#ffffff", icon: AlertTriangle, code: "#f97316", use: "Significant risk · patch in 7d" },
    { name: "Medium",   val: "var(--color-sev-medium)",   text: "#ffffff", icon: AlertTriangle, code: "#f59e0b", use: "Moderate · patch in 30d" },
    { name: "Low",      val: "var(--color-sev-low)",      text: "#ffffff", icon: Circle,        code: "#22c55e", use: "Minor · monitor" },
    { name: "Info",     val: "var(--color-sev-info)",     text: "#ffffff", icon: Info,          code: "#3b82f6", use: "Informational · no action" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {sev.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.name} className="flex items-center gap-3">
            <div
              className="w-[140px] h-10 rounded-md flex items-center gap-2 px-3"
              style={{ background: s.val, color: s.text }}
            >
              <Icon className="size-4" />
              <span className="text-[13px] font-medium uppercase tracking-wider">{s.name}</span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground w-20">{s.code}</span>
            <span className="text-[12px] text-muted-foreground">{s.use}</span>
          </div>
        );
      })}
      <div className="mt-2 pt-3 border-t border-border text-[11px] text-muted-foreground">
        Always use these 5 levels for risk · vulnerabilities · findings · alerts. Never invent new tones.
      </div>
    </div>
  );
}

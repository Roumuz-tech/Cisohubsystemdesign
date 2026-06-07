import { AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { MButton } from "../_shared/MetronicButton";

export function KpiStatRow() {
  const stats = [
    { value: "86%", label: "Compliance score" },
    { value: "24", label: "Open risks" },
    { value: "382", label: "Evidence files" },
    { value: "9", label: "Frameworks" },
  ];
  return (
    <div className="flex bg-card border border-border rounded-xl px-5 py-4.5">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={
            "flex-1 px-4 " +
            (i < stats.length - 1 ? "border-e border-border" : "")
          }
        >
          <div className="text-[26px] font-bold leading-[1.1] tracking-tight">{s.value}</div>
          <div className="text-[13px] text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Stat Cards ───────────────────────── */
type StatColor = "destructive" | "primary" | "success";
function StatCard({ label, value, delta, deltaColor, Icon, color }: {
  label: string; value: string; delta: string; deltaColor: StatColor;
  Icon: React.ComponentType<{ className?: string }>; color: string;
}) {
  const deltaStyles: Record<StatColor, string> = {
    destructive: "bg-destructive/10 text-red-700 dark:text-red-300",
    primary: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  };
  return (
    <div className="bg-card border border-border rounded-xl shadow-xs px-5 py-4 w-[200px]">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-medium text-muted-foreground">{label}</div>
        <div
          className="size-8 rounded-lg flex items-center justify-center"
          style={{ background: color + "20", color }}
        >
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-[30px] font-bold leading-[1.1] tracking-tight mt-2.5">{value}</div>
      <div className="mt-1.5">
        <span className={"inline-flex items-center h-[22px] px-2 rounded-md text-[11px] font-medium " + deltaStyles[deltaColor]}>
          {delta}
        </span>
      </div>
    </div>
  );
}
export function StatCardRow() {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard label="Active risks" value="24" delta="+3 vs last 30d" deltaColor="destructive" Icon={AlertTriangle} color="#ef4444" />
      <StatCard label="Frameworks linked" value="12" delta="— vs last 30d" deltaColor="primary" Icon={Shield} color="#3b82f6" />
      <StatCard label="Compliance score" value="86%" delta="+1.2% vs last 30d" deltaColor="success" Icon={TrendingUp} color="#22c55e" />
    </div>
  );
}

/* ───────────────────────── Card anatomy ───────────────────────── */
export function CardAnatomy() {
  return (
    <div className="flex gap-5 items-start">
      <div className="bg-card border border-border rounded-xl shadow-xs w-[280px]">
        <div className="flex items-center gap-2.5 min-h-[52px] px-5 py-3.5">
          <div className="text-[15px] font-semibold">Card title</div>
          <div className="ms-auto">
            <MButton variant="outline" size="sm">Filter</MButton>
          </div>
        </div>
        <div className="p-5 border-t border-border text-[13px] text-muted-foreground leading-relaxed">
          Body content lives in <code className="text-[11px] font-mono text-foreground">p-5</code>. Borders separate header and footer.
        </div>
        <div className="px-5 py-3 border-t border-border text-[12px] text-muted-foreground">
          Footer · px-5 py-3
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium text-muted-foreground">Card anatomy</div>
        <div className="text-[11px] font-mono text-muted-foreground">rounded-xl · border · shadow-xs</div>
        <div className="text-[11px] font-mono text-muted-foreground">Header: min-h-52 · px-5 py-3.5</div>
        <div className="text-[11px] font-mono text-muted-foreground">Body: p-5</div>
        <div className="text-[11px] font-mono text-muted-foreground">Footer: px-5 py-3</div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Shield, FileText, AlertTriangle, FileCheck, Users } from "lucide-react";

/* ───────────────────────── Sidebar (Comply dark) ───────────────────────── */
type SItem = { label: string; icon: React.ComponentType<{ className?: string }>; badge?: number };
export function SidebarDemo() {
  const items: SItem[] = [
    { label: "Frameworks", icon: Shield, badge: 12 },
    { label: "Policies", icon: FileText },
    { label: "Risks", icon: AlertTriangle, badge: 4 },
    { label: "Evidence", icon: FileCheck },
    { label: "Team", icon: Users },
  ];
  const [active, setActive] = useState("Frameworks");
  return (
    <div className="flex gap-5 items-start">
      <div
        className="w-[240px] rounded-lg p-2.5 flex flex-col gap-0.5"
        style={{ background: "#2a3042" }}
      >
        <div className="px-3 py-1.5 text-[10px] uppercase tracking-[.1em] font-medium text-white/40">
          Dashboard
        </div>
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.label;
          return (
            <a
              key={it.label}
              onClick={() => setActive(it.label)}
              className={
                "flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-[13px] cursor-pointer transition-colors " +
                (isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white")
              }
            >
              <Icon className="size-4" />
              <span className="flex-1">{it.label}</span>
              {it.badge && (
                <span className="bg-destructive text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  {it.badge}
                </span>
              )}
            </a>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="text-[11px] font-medium text-muted-foreground">Sidebar (Comply · dark)</div>
        <div className="text-[11px] font-mono text-muted-foreground">bg #2a3042 · w-240</div>
        <div className="text-[11px] font-mono text-muted-foreground">Active: bg-white/10 · text-white</div>
        <div className="text-[11px] font-mono text-muted-foreground">Hover: bg-white/5</div>
      </div>
    </div>
  );
}

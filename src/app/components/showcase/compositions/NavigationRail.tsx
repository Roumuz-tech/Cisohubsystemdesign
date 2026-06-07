import {
  LayoutDashboard,
  Shield,
  FileText,
  AlertTriangle,
  Settings as SettingsIcon,
  FileCheck,
} from "lucide-react";

/* ============================================================
 * 1. NavigationRail — narrow vertical icon rail (compact nav)
 * ========================================================== */
export function NavigationRailDemo() {
  const items = [
    { i: LayoutDashboard, l: "Dashboard", active: true },
    { i: Shield, l: "Controls" },
    { i: AlertTriangle, l: "Risks", badge: 6 },
    { i: FileText, l: "Evidence" },
    { i: FileCheck, l: "Audits" },
    { i: SettingsIcon, l: "Settings" },
  ];
  return (
    <div className="flex border border-border rounded-lg overflow-hidden bg-card h-[320px]">
      <div className="w-[64px] bg-sidebar flex flex-col items-center py-3 gap-1 border-e border-border">
        <div
          className="size-8 rounded-md flex items-center justify-center text-white font-semibold mb-2"
          style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
        >
          C
        </div>
        {items.map((it) => {
          const I = it.i;
          return (
            <button
              key={it.l}
              title={it.l}
              className={
                "relative size-10 rounded-md flex items-center justify-center transition-colors " +
                (it.active
                  ? "bg-primary text-primary-foreground"
                  : "text-white/70 hover:text-white hover:bg-white/10")
              }
            >
              <I className="size-4" strokeWidth={1.5} />
              {it.badge ? (
                <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-semibold flex items-center justify-center">
                  {it.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="flex-1 p-4 bg-muted/30">
        <div className="text-[11px] text-muted-foreground">
          Active section
        </div>
        <div className="text-[15px] font-semibold">Dashboard</div>
      </div>
    </div>
  );
}

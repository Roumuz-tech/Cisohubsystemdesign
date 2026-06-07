import { LayoutDashboard, PanelLeft, Maximize, Columns } from "lucide-react";

export function LayoutOptionsDemo() {
  const layouts = [
    { name: "Full Width", desc: "Fluid 100% width container", icon: Maximize, cls: "w-full" },
    { name: "Fixed Container", desc: "Centered max-w-5xl", icon: LayoutDashboard, cls: "w-[80%] mx-auto" },
    { name: "Sidebar", desc: "240px nav + flexible content", icon: PanelLeft, cls: "grid grid-cols-[30%_1fr]" },
    { name: "Split View", desc: "50/50 dual pane layout", icon: Columns, cls: "grid grid-cols-2" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {layouts.map((L) => {
        const Icon = L.icon;
        return (
          <div key={L.name} className="border border-border rounded-lg p-4 bg-card flex flex-col gap-3 h-[140px]">
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" />
              <div className="text-[13px] font-semibold">{L.name}</div>
            </div>
            <div className="text-[11px] text-muted-foreground">{L.desc}</div>
            <div className="flex-1 bg-muted/40 border border-border/50 rounded flex items-center justify-center p-2 overflow-hidden">
              <div className={`h-full bg-primary/20 rounded border border-primary/30 ${L.cls} flex gap-1`}>
                {L.name === "Sidebar" && (
                  <>
                    <div className="h-full bg-primary/20 w-[30%] rounded-s border-r border-primary/30" />
                    <div className="h-full flex-1 rounded-e" />
                  </>
                )}
                {L.name === "Split View" && (
                  <>
                    <div className="h-full bg-primary/20 w-1/2 rounded-s border-r border-primary/30" />
                    <div className="h-full flex-1 rounded-e" />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

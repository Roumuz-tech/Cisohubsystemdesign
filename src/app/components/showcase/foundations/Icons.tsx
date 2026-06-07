import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Settings,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ChevronRight,
} from "lucide-react";

export function IconReference() {
  const samples = [
    { icon: Shield, name: "shield" },
    { icon: FileText, name: "file-text" },
    { icon: AlertTriangle, name: "alert-triangle" },
    { icon: CheckCircle2, name: "check-circle" },
    { icon: Bell, name: "bell" },
    { icon: Settings, name: "settings" },
    { icon: Search, name: "search" },
    { icon: Plus, name: "plus" },
    { icon: Pencil, name: "pencil" },
    { icon: Trash2, name: "trash" },
    { icon: Eye, name: "eye" },
    { icon: ChevronRight, name: "chevron-right" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Sizes</div>
        <div className="flex items-end gap-6">
          {[
            { px: 14, use: "buttons sm · badges · inline" },
            { px: 16, use: "DEFAULT — buttons · inputs · nav" },
            { px: 20, use: "section icons · empty states" },
            { px: 24, use: "hero · feature blocks" },
          ].map((s) => (
            <div key={s.px} className="flex flex-col items-center gap-1.5">
              <Shield style={{ width: s.px, height: s.px }} className="text-foreground" strokeWidth={2} />
              <div className="text-[11px] font-mono">{s.px}px</div>
              <div className="text-[10px] text-muted-foreground max-w-24 text-center">{s.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Common icons (lucide-react)</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {samples.map((s) => (
            <div key={s.name} className="flex items-center gap-2 px-3 py-2 border border-border rounded-md">
              <s.icon className="size-4 text-muted-foreground shrink-0" />
              <span className="text-[12px] font-mono truncate">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground border-t border-border pt-3">
        Source: <code className="font-mono">lucide-react</code> · stroke-width <code className="font-mono">2</code> · stroke <code className="font-mono">currentColor</code> · never mix icon libraries.
      </div>
    </div>
  );
}

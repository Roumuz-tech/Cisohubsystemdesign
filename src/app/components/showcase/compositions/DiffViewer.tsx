import { FileText } from "lucide-react";

export function DiffViewerDemo() {
  const lines: Array<{ k: "ctx" | "add" | "del"; n1?: number; n2?: number; t: string }> = [
    { k: "ctx", n1: 1, n2: 1, t: "  // password-policy.yml" },
    { k: "ctx", n1: 2, n2: 2, t: "  min_length: 12" },
    { k: "del", n1: 3, t: "  require_special: false" },
    { k: "add", n2: 3, t: "  require_special: true" },
    { k: "ctx", n1: 4, n2: 4, t: "  rotation_days: 90" },
    { k: "del", n1: 5, t: "  mfa_required: false" },
    { k: "add", n2: 5, t: "  mfa_required: true" },
    { k: "add", n2: 6, t: "  mfa_grace_period: 7" },
  ];
  const bg: Record<string, string> = {
    ctx: "",
    add: "bg-emerald-500/10",
    del: "bg-destructive/10",
  };
  const marker: Record<string, string> = { ctx: " ", add: "+", del: "-" };
  const markerColor: Record<string, string> = {
    ctx: "text-muted-foreground",
    add: "text-emerald-600 dark:text-emerald-400",
    del: "text-destructive",
  };
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-3.5 py-2 border-b border-border bg-muted/40 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
        <FileText className="size-3.5" />
        password-policy.yml · <span className="text-destructive">−2</span> <span className="text-emerald-600">+3</span>
      </div>
      <div className="font-mono text-[12.5px]">
        {lines.map((l, i) => (
          <div key={i} className={"flex " + bg[l.k]}>
            <div className="w-10 text-end pe-2 text-muted-foreground py-0.5 select-none border-e border-border/50">{l.n1 ?? ""}</div>
            <div className="w-10 text-end pe-2 text-muted-foreground py-0.5 select-none border-e border-border/50">{l.n2 ?? ""}</div>
            <div className={"w-5 text-center py-0.5 select-none " + markerColor[l.k]}>{marker[l.k]}</div>
            <div className="flex-1 py-0.5 whitespace-pre">{l.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

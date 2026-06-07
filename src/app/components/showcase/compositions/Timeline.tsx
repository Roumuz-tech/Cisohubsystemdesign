import {
  CheckCircle2,
  Pencil,
  AlertTriangle,
  UserPlus,
  GitCommit,
  Trash2,
} from "lucide-react";

/* ───────────────────────── Timeline / Activity feed ───────────────────────── */
type TLEvent = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  who: string;
  what: string;
  target?: string;
  when: string;
};
export function TimelineDemo() {
  const events: TLEvent[] = [
    { icon: CheckCircle2, color: "#22c55e", who: "Layla Khan", what: "approved evidence", target: "EVD-0421", when: "2 min ago" },
    { icon: Pencil, color: "#3b82f6", who: "Ahmed Saleh", what: "edited control", target: "AC-2.3", when: "1 hour ago" },
    { icon: AlertTriangle, color: "#ef4444", who: "System", what: "flagged risk", target: "RSK-0184 — Critical", when: "3 hours ago" },
    { icon: UserPlus, color: "#8b5cf6", who: "Khalid Mansour", what: "invited", target: "noura.a@gulf-logistics.com", when: "Yesterday" },
    { icon: GitCommit, color: "#71717a", who: "Faisal Rashed", what: "committed policy revision", target: "v2.4 → v2.5", when: "Yesterday" },
    { icon: Trash2, color: "#71717a", who: "Layla Khan", what: "removed stale evidence", target: "3 files", when: "2 days ago" },
  ];
  return (
    <div className="flex flex-col gap-0">
      {events.map((e, i) => {
        const Icon = e.icon;
        const last = i === events.length - 1;
        return (
          <div key={i} className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div
                className="size-8 rounded-full flex items-center justify-center shrink-0 border-2 border-background"
                style={{ background: e.color + "20", color: e.color }}
              >
                <Icon className="size-3.5" />
              </div>
              {!last && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            <div className={"flex-1 pb-5 " + (last ? "pb-0" : "")}>
              <div className="text-[13px]">
                <span className="font-medium">{e.who}</span>{" "}
                <span className="text-muted-foreground">{e.what}</span>
                {e.target && <> <span className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded">{e.target}</span></>}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{e.when}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

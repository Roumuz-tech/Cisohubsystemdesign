import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  MoreHorizontal,
  Download,
} from "lucide-react";

/* ───────────────────────── 3. Evidence Card ───────────────────────── */
function EvidenceCard({
  name, type, size, who, when, status, control,
}: { name: string; type: string; size: string; who: string; when: string; status: "approved" | "pending" | "rejected"; control: string }) {
  const statusMap = {
    approved: { cls: "bg-success/10 text-success border-success/20", icon: CheckCircle2, label: "Approved" },
    pending:  { cls: "bg-warning/10 text-warning border-warning/20", icon: AlertTriangle, label: "Pending review" },
    rejected: { cls: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertOctagon, label: "Rejected" },
  } as const;
  const S = statusMap[status];
  return (
    <div className="border border-border rounded-lg p-4 bg-card flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-md bg-muted flex items-center justify-center shrink-0">
          <FileText className="size-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium truncate">{name}</div>
          <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{type} · {size}</div>
        </div>
        <button className="size-7 rounded inline-flex items-center justify-center text-muted-foreground hover:bg-accent">
          <MoreHorizontal className="size-4" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium " + S.cls}>
          <S.icon className="size-3" /> {S.label}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">{control}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="text-[11px] text-muted-foreground">
          <span className="text-foreground font-medium">{who}</span> · {when}
        </div>
        <button className="size-7 rounded inline-flex items-center justify-center text-muted-foreground hover:bg-accent">
          <Download className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function EvidenceCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EvidenceCard name="firewall-rules-q2.pdf" type="PDF" size="1.2 MB" who="Ahmed S." when="2 days ago" status="approved" control="SC-7" />
      <EvidenceCard name="access-review-2026.xlsx" type="XLSX" size="340 KB" who="Sara M." when="5 hours ago" status="pending" control="AC-2" />
      <EvidenceCard name="backup-policy-v3.docx" type="DOCX" size="88 KB" who="Khalid R." when="yesterday" status="rejected" control="CP-9" />
    </div>
  );
}

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MBadge } from "../_shared/MetronicBadge";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── Table + Pagination ───────────────────────── */
const ROWS = [
  { id: "RSK-0184", title: "Unpatched MongoDB exposed", severity: "Critical", owner: "Ahmed S.", updated: "2h ago" },
  { id: "RSK-0179", title: "Weak SSO password policy", severity: "High", owner: "Layla K.", updated: "5h ago" },
  { id: "RSK-0173", title: "Missing audit logs", severity: "Medium", owner: "Khalid M.", updated: "1d ago" },
  { id: "RSK-0168", title: "Stale service accounts", severity: "Medium", owner: "Noura A.", updated: "2d ago" },
  { id: "RSK-0162", title: "Outdated TLS on internal API", severity: "Low", owner: "Faisal R.", updated: "3d ago" },
  { id: "RSK-0156", title: "Shared admin credentials", severity: "Critical", owner: "Ahmed S.", updated: "4d ago" },
  { id: "RSK-0150", title: "Public S3 bucket flagged", severity: "High", owner: "Layla K.", updated: "5d ago" },
  { id: "RSK-0145", title: "EOL software detected", severity: "Medium", owner: "Khalid M.", updated: "1w ago" },
];
const SEV_COLOR: Record<string, "destructive" | "warning" | "info" | "secondary"> = {
  Critical: "destructive",
  High: "warning",
  Medium: "info",
  Low: "secondary",
};
export function TablePaginationDemo() {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const total = ROWS.length;
  const pages = Math.ceil(total / perPage);
  const visible = ROWS.slice((page - 1) * perPage, page * perPage);
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-[13px]">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr className="text-start">
              <th className="text-start font-medium px-4 h-10">ID</th>
              <th className="text-start font-medium px-4 h-10">Risk</th>
              <th className="text-start font-medium px-4 h-10">Severity</th>
              <th className="text-start font-medium px-4 h-10">Owner</th>
              <th className="text-start font-medium px-4 h-10">Updated</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                <td className="px-4 py-2.5 font-mono text-[12px]">{r.id}</td>
                <td className="px-4 py-2.5">{r.title}</td>
                <td className="px-4 py-2.5"><MBadge appearance="light" color={SEV_COLOR[r.severity]}>{r.severity}</MBadge></td>
                <td className="px-4 py-2.5">{r.owner}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[12px] text-muted-foreground">
          Showing <strong className="text-foreground">{(page - 1) * perPage + 1}</strong>–
          <strong className="text-foreground">{Math.min(page * perPage, total)}</strong> of{" "}
          <strong className="text-foreground">{total}</strong>
        </div>
        <div className="flex items-center gap-1">
          <MButton variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))}>
            <ChevronLeft className="size-3.5" /> Prev
          </MButton>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={
                "size-8 rounded-md text-[12px] font-medium " +
                (page === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent")
              }
            >
              {i + 1}
            </button>
          ))}
          <MButton variant="outline" size="sm" onClick={() => setPage(Math.min(pages, page + 1))}>
            Next <ChevronRight className="size-3.5" />
          </MButton>
        </div>
      </div>
    </div>
  );
}

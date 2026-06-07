import { Eye, Pencil, Trash, ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { Avatar } from "../primitives/Avatars";
import { MBadge } from "../_shared/MetronicBadge";

interface Row {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBg: string;
  role: string;
  status: "Active" | "Pending" | "Expired";
  lastSeen: string;
}

const rows: Row[] = [
  { id: "1", name: "Ahmed Saleh", email: "ahmed@cisohub.app", initials: "A", avatarBg: "#3b82f6", role: "CISO", status: "Active", lastSeen: "2m ago" },
  { id: "2", name: "Layla Khan", email: "layla@cisohub.app", initials: "L", avatarBg: "#22c55e", role: "GRC Analyst", status: "Pending", lastSeen: "1h ago" },
  { id: "3", name: "Mike Park", email: "mike@cisohub.app", initials: "M", avatarBg: "#a1a1aa", role: "Auditor", status: "Expired", lastSeen: "3d ago" },
];

const statusColor = { Active: "success", Pending: "warning", Expired: "destructive" } as const;
const cols = "32px 2fr 1fr 1fr 1.2fr 90px";

export function DataGrid() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div
        className="grid items-center h-10 px-4 gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400"
        style={{ gridTemplateColumns: cols, background: "rgba(244,244,245,0.4)" }}
      >
        <Checkbox />
        <div className="flex items-center gap-1 cursor-pointer">
          User <ArrowUpDown className="size-3" />
        </div>
        <div>Role</div>
        <div>Status</div>
        <div>Last seen</div>
        <div>Actions</div>
      </div>
      {rows.map((r) => (
        <div
          key={r.id}
          className="grid items-center h-[54px] px-4 gap-4 border-t border-border text-[13px] hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
          style={{ gridTemplateColumns: cols }}
        >
          <Checkbox />
          <div className="flex items-center gap-2.5">
            <Avatar size="sm" initials={r.initials} background={r.avatarBg} />
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.email}</div>
            </div>
          </div>
          <div>{r.role}</div>
          <div>
            <MBadge appearance="light" color={statusColor[r.status]} size="sm">
              {r.status}
            </MBadge>
          </div>
          <div className="text-muted-foreground">{r.lastSeen}</div>
          <div className="flex gap-0.5 text-muted-foreground">
            <button className="size-[26px] rounded inline-flex items-center justify-center hover:bg-accent">
              <Eye className="size-3.5" />
            </button>
            <button className="size-[26px] rounded inline-flex items-center justify-center hover:bg-accent">
              <Pencil className="size-3.5" />
            </button>
            <button className="size-[26px] rounded inline-flex items-center justify-center hover:bg-accent hover:text-destructive">
              <Trash className="size-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

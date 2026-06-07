import { Pencil } from "lucide-react";

/* ───────────────────────── Settings KV table ───────────────────────── */
export function SettingsKvTable() {
  const rows = [
    { k: "Account name", v: "Saudi British Bank", edit: true },
    { k: "Tenant ID", v: "sb-001 (vCISO-managed)", edit: false },
    { k: "Plan", v: "Enterprise · 12 frameworks", edit: true },
    { k: "Primary contact", v: "Ahmed Saleh · CISO", edit: true },
    { k: "MFA enforcement", v: "Required for all users", edit: true },
    { k: "Default language", v: "Arabic (RTL)", edit: true },
  ];
  return (
    <table className="w-full border border-border rounded-lg overflow-hidden text-[14px]">
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.k} className={i < rows.length - 1 ? "border-b border-border" : ""}>
            <td className="px-4 py-2.5 min-w-[200px] align-middle">{r.k}</td>
            <td className="px-4 py-2.5 w-full align-middle">{r.v}</td>
            <td className="px-4 py-2.5 w-9 text-end align-middle">
              {r.edit && (
                <button className="size-7 rounded inline-flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground">
                  <Pencil className="size-3.5" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

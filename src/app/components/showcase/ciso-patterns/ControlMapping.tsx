/* ───────────────────────── 2. Control Mapping ───────────────────────── */
export function ControlMappingDemo() {
  const mappings = [
    { ctrl: "AC-2", title: "Account Management", frameworks: ["NCA ECC 2-3-1", "ISO 27001 A.9.2.1", "SAMA 3.3.5"], status: "covered" },
    { ctrl: "AU-6", title: "Audit Review", frameworks: ["NCA ECC 2-10-3", "ISO 27001 A.12.4.1"], status: "covered" },
    { ctrl: "SC-7", title: "Boundary Protection", frameworks: ["NCA ECC 2-5-1", "PCI DSS 1.3"], status: "partial" },
    { ctrl: "IR-4", title: "Incident Handling", frameworks: ["NCA ECC 2-13-2", "ISO 27001 A.16.1.5", "SAMA 3.4.2"], status: "covered" },
    { ctrl: "CP-9", title: "System Backup", frameworks: ["ISO 27001 A.12.3.1"], status: "gap" },
  ];

  const badgeFor = (s: string) =>
    s === "covered" ? "bg-success/10 text-success border-success/20"
    : s === "partial" ? "bg-warning/10 text-warning border-warning/20"
    : "bg-destructive/10 text-destructive border-destructive/20";

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[120px_1fr_2fr_100px] gap-3 px-4 py-2.5 bg-muted/50 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <div>Control</div>
        <div>Title</div>
        <div>Maps to</div>
        <div className="text-end">Status</div>
      </div>
      {mappings.map((m, i) => (
        <div
          key={m.ctrl}
          className={"grid grid-cols-[120px_1fr_2fr_100px] gap-3 px-4 py-3 items-center " + (i < mappings.length - 1 ? "border-b border-border" : "")}
        >
          <div className="font-mono text-[12px] font-medium">{m.ctrl}</div>
          <div className="text-[13px]">{m.title}</div>
          <div className="flex flex-wrap gap-1">
            {m.frameworks.map((f) => (
              <span key={f} className="px-2 py-0.5 bg-muted rounded text-[11px] font-mono">{f}</span>
            ))}
          </div>
          <div className="text-end">
            <span className={"inline-block px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase " + badgeFor(m.status)}>
              {m.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

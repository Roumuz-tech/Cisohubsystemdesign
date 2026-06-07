export function RadiusScale() {
  const items = [
    { name: "none", val: "0", note: "table cells in DataGrid", r: "0" },
    { name: "sm", val: "4px", note: "small chips", r: "4px" },
    { name: "md", val: "6px", note: "inputs / buttons", r: "6px" },
    { name: "lg", val: "8px", note: "DEFAULT — sheets, popovers", r: "8px" },
    { name: "xl", val: "12px", note: "cards (largest)", r: "12px" },
    { name: "full", val: "9999", note: "avatars, pills", r: "9999px" },
  ];
  return (
    <div className="flex flex-wrap gap-5 items-end">
      {items.map((it) => (
        <div key={it.name} className="flex flex-col items-center gap-1.5">
          <div className="w-20" style={{ background: "var(--primary)", borderRadius: it.r, height: 60 }} />
          <div className="text-[12px] font-medium">{it.name}</div>
          <div className="text-[11px] font-mono text-muted-foreground">{it.val}</div>
          <div className="text-[11px] text-muted-foreground text-center max-w-20">{it.note}</div>
        </div>
      ))}
    </div>
  );
}

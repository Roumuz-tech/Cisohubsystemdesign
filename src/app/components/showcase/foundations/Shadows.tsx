export function ShadowScale() {
  const items = [
    { name: "shadow-xs", shadow: "0 1px 2px 0 rgba(0,0,0,.05)", note: "Card · Button · Input" },
    { name: "shadow-sm", shadow: "0 1px 3px 0 rgba(0,0,0,.05),0 1px 2px -1px rgba(0,0,0,.05)", note: "—" },
    { name: "shadow-md", shadow: "0 4px 6px -1px rgba(0,0,0,.05),0 2px 4px -2px rgba(0,0,0,.05)", note: "Dropdown · Tooltip · Popover" },
    { name: "shadow-lg", shadow: "0 10px 15px -3px rgba(0,0,0,.05),0 4px 6px -4px rgba(0,0,0,.05)", note: "Dialog · Sheet" },
    { name: "shadow-xl", shadow: "0 20px 25px -5px rgba(0,0,0,.06)", note: "—" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-5 items-end py-3">
        {items.map((it) => (
          <div key={it.name} className="flex flex-col items-center gap-1.5">
            <div
              className="w-24 bg-background border border-border rounded-lg"
              style={{ boxShadow: it.shadow, height: 60 }}
            />
            <div className="text-[12px] font-medium">{it.name}</div>
            <div className="text-[10px] text-muted-foreground text-center max-w-24">{it.note}</div>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-muted-foreground">
        Header on scroll → <code className="text-[11px] font-mono text-foreground">border-b border-border</code> only — never <code className="text-[11px] font-mono text-foreground">shadow-sm</code> (RL-11).
      </div>
    </div>
  );
}

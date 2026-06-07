interface SwatchProps {
  color: string;
  name: string;
  value: string;
  label?: string;
}

export function ColorSwatch({ color, name, value, label }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="w-20 h-14 rounded-lg border border-border shadow-xs"
        style={{ background: color }}
      />
      <div className="text-xs font-medium text-foreground">{name}</div>
      <div className="text-[11px] font-mono text-muted-foreground">{value}</div>
      {label && <div className="text-[11px] font-medium text-muted-foreground">{label}</div>}
    </div>
  );
}

export function SwatchGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-wrap gap-3.5 items-start">{children}</div>
    </div>
  );
}

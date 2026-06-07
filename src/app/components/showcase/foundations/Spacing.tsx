export function SpacingScale() {
  const sizes = [
    { n: "1", px: 4 }, { n: "2", px: 8 }, { n: "3", px: 12 }, { n: "4", px: 16 },
    { n: "5", px: 20 }, { n: "6", px: 24 }, { n: "8", px: 32 }, { n: "10", px: 40 },
    { n: "12", px: 48 }, { n: "16", px: 64 },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        {sizes.map((s) => (
          <div key={s.n} className="flex items-center gap-4 text-[12px]">
            <div className="w-10 font-mono text-muted-foreground">p-{s.n}</div>
            <div className="w-12 font-mono text-muted-foreground">{s.px}px</div>
            <div className="bg-primary h-4 rounded" style={{ width: s.px }} />
          </div>
        ))}
      </div>
      <div className="text-[11px] text-muted-foreground border-t border-border pt-3 mt-1">
        4px base · used for <code className="font-mono">p-*</code>, <code className="font-mono">m-*</code>, <code className="font-mono">gap-*</code> — multiples of 4 only.
      </div>
    </div>
  );
}

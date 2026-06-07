export function ZIndexLayers() {
  const layers = [
    { z: 0, name: "content", note: "Default page content" },
    { z: 10, name: "header", note: "Sticky app header" },
    { z: 20, name: "sidebar", note: "Left navigation" },
    { z: 30, name: "dropdown", note: "Menus · popovers · selects" },
    { z: 40, name: "sticky", note: "Sticky sub-bars · table headers" },
    { z: 50, name: "overlay", note: "Sheet/Dialog backdrop" },
    { z: 60, name: "modal", note: "Dialog · Sheet content" },
    { z: 70, name: "toast", note: "Always above everything" },
  ];
  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        {layers.map((l, i) => (
          <div
            key={l.name}
            className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-md shadow-xs"
            style={{ marginInlineStart: i * 16 }}
          >
            <div className="w-14 font-mono text-[12px] text-muted-foreground">z-{l.z}</div>
            <div className="font-medium text-[13px] w-24">{l.name}</div>
            <div className="text-[12px] text-muted-foreground">{l.note}</div>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border">
        Tokens: <code className="font-mono">--z-header</code>, <code className="font-mono">--z-sidebar</code>, <code className="font-mono">--z-dropdown</code>, <code className="font-mono">--z-sticky</code>, <code className="font-mono">--z-overlay</code>, <code className="font-mono">--z-modal</code>, <code className="font-mono">--z-toast</code>
      </div>
    </div>
  );
}

import { Keyboard } from "lucide-react";

/* ───────────────────────── A11y guide ───────────────────────── */
export function A11yGuide() {
  const rules = [
    { title: "Focus ring", body: "All interactive elements get ring-[3px] ring-ring/30 on :focus-visible. Never remove outlines without replacement.", code: "focus-visible:ring-[3px] ring-ring/30" },
    { title: "Color contrast", body: "Body text ≥ 4.5:1 against background. Muted-foreground is the floor — never go lighter for primary content.", code: "AA · WCAG 2.2" },
    { title: "Keyboard navigation", body: "Tab cycles all controls in DOM order. Modals trap focus. ESC closes overlays.", code: "Tab · Shift+Tab · Esc · Enter · Space" },
    { title: "ARIA labels", body: "Icon-only buttons require aria-label. Use role='dialog', aria-modal='true' for modals. Live regions for toasts.", code: "aria-label · role · aria-live" },
    { title: "Reduced motion", body: "All animations check prefers-reduced-motion; transitions reduce to 0.01ms.", code: "@media (prefers-reduced-motion: reduce)" },
    { title: "Touch targets", body: "Minimum 32×32 for desktop, 44×44 for touch. Buttons default h-9 (36px) — meets desktop minimum.", code: "min-size: 32 / 44" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground pb-2 border-b border-border">
        <Keyboard className="size-3.5" />
        <span>WCAG 2.2 AA · keyboard-first · screen-reader friendly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rules.map((r) => (
          <div key={r.title} className="border border-border rounded-md p-3.5 bg-card">
            <div className="font-medium text-[13px] mb-1">{r.title}</div>
            <div className="text-[12px] text-muted-foreground leading-relaxed mb-2">{r.body}</div>
            <code className="text-[11px] font-mono bg-muted px-2 py-1 rounded text-foreground inline-block">{r.code}</code>
          </div>
        ))}
      </div>
      <div className="border border-border rounded-md p-3.5 bg-muted/30">
        <div className="font-medium text-[13px] mb-1.5">Try it · focus this button with keyboard</div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-md border border-border bg-background text-[13px] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:border-primary">
            Tab to me
          </button>
          <span className="text-[11px] text-muted-foreground">— uses ring-primary/30 on :focus-visible</span>
        </div>
      </div>
    </div>
  );
}

/* Shared Sheet (Side Drawer) — sourced from preview/comp-sheet.html (§D.4)
   Usage: <Sheet open={open} onClose={...} title="Edit risk" side="end">...</Sheet>
   - Overlay bg-black/30 + blur(4px)
   - Default width ~384px (w-3/4 sm:max-w-sm)                        */

function Sheet({ open, onClose, title, subtitle, side = "end", width = 384, children, footer }) {
  if (!open) return null;
  const insetStart = side === "end" ? { insetInlineEnd: 0 } : { insetInlineStart: 0 };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,.30)", backdropFilter: "blur(4px)",
        }}
      />
      <aside
        style={{
          position: "absolute", insetBlock: 0, ...insetStart,
          width, maxWidth: "100%",
          background: "var(--color-background)",
          color: "var(--color-foreground)",
          boxShadow: "var(--shadow-lg)",
          padding: 18,
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            {title && <div style={{ font: "600 16px Inter" }}>{title}</div>}
            {subtitle && <div style={{ font: "400 12px Inter", color: "var(--color-muted-foreground)", marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--color-muted-foreground)", cursor: "pointer", padding: 4, borderRadius: 4 }} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </div>
        {footer && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--color-border)", display: "flex", gap: 8, justifyContent: "flex-end" }}>
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}

window.Sheet = Sheet;

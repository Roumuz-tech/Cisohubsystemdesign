/* Shared Toast (sonner-style) — sourced from preview/comp-toast.html (Authority RQ-2)
   Usage:
     const toast = useToast();
     toast.success("Saved", "Risk submitted for approval.");
   Variants: success, destructive, warning, info                     */

const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(0);

  const push = React.useCallback((variant, title, description) => {
    const id = ++idRef.current;
    setItems(arr => [...arr, { id, variant, title, description }]);
    setTimeout(() => setItems(arr => arr.filter(t => t.id !== id)), 4000);
  }, []);

  const api = React.useMemo(() => ({
    success: (t, d) => push("success", t, d),
    error:   (t, d) => push("destructive", t, d),
    warning: (t, d) => push("warning", t, d),
    info:    (t, d) => push("info", t, d),
  }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div style={{
        position: "fixed", insetBlockEnd: 20, insetInlineEnd: 20,
        display: "flex", flexDirection: "column", gap: 10, zIndex: 100, pointerEvents: "none"
      }}>
        {items.map(t => <Toast key={t.id} {...t} onClose={() => setItems(arr => arr.filter(x => x.id !== t.id))} />)}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ variant, title, description, onClose }) {
  const ICONS = {
    success: <polyline points="20 6 9 17 4 12"/>,
    destructive: <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
    warning: <g><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></g>,
    info: <g><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>,
  };
  return (
    <div style={{
      width: 330, background: "var(--color-background)",
      border: "1px solid var(--color-border)", borderRadius: 6,
      padding: "12px 14px", boxShadow: "var(--shadow-md)",
      display: "flex", gap: 12, alignItems: "flex-start", pointerEvents: "auto"
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        background: `color-mix(in srgb, var(--color-${variant}) 10%, transparent)`,
        color: `var(--color-${variant})`,
        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[variant]}
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "600 14px Inter" }}>{title}</div>
        {description && <div style={{ font: "400 12px/1.4 Inter", color: "var(--color-muted-foreground)", marginTop: 2 }}>{description}</div>}
      </div>
      <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--color-muted-foreground)", cursor: "pointer", padding: 2, margin: -2 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

window.ToastProvider = ToastProvider;
window.useToast = useToast;

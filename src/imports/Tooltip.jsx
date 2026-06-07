/* Shared Tooltip — sourced from preview/comp-tooltip.html (§D.3)
   bg-zinc-950 text-white shadow-md rounded-md px-3 py-1.5 text-xs (12px)
   Usage: <Tooltip label="Settings"><button>...</button></Tooltip>     */

function Tooltip({ label, children, variant = "dark" }) {
  const [open, setOpen] = React.useState(false);
  const isDark = variant === "dark";

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            insetInlineStart: "50%",
            transform: "translateX(-50%)",
            background: isDark ? "var(--color-zinc-950)" : "var(--color-background)",
            color: isDark ? "var(--color-primary-foreground)" : "var(--color-foreground)",
            border: isDark ? "none" : "1px solid var(--color-border)",
            padding: "6px 12px",
            borderRadius: 6,
            font: "500 12px Inter",
            whiteSpace: "nowrap",
            boxShadow: "var(--shadow-md)",
            pointerEvents: "none",
            zIndex: 60,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

window.Tooltip = Tooltip;

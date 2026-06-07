/* Shared Dropdown — sourced from preview/comp-dropdown.html (§D.2)
   Usage:
   <Dropdown trigger={<button>...</button>} align="end">
     <DropdownItem icon="eye" onClick={...}>View</DropdownItem>
     <DropdownSeparator />
     <DropdownItem icon="trash" destructive>Delete</DropdownItem>
   </Dropdown>                                                       */

function Dropdown({ trigger, children, align = "end" }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "inline-block" }}>{trigger}</div>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          [align === "end" ? "insetInlineEnd" : "insetInlineStart"]: 0,
          minWidth: 180,
          background: "var(--color-popover)",
          color: "var(--color-popover-foreground)",
          border: "1px solid var(--color-border)",
          borderRadius: 6,
          padding: 8,
          boxShadow: "var(--shadow-md)",
          zIndex: 50,
        }} onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, destructive, onClick, children }) {
  const [hover, setHover] = React.useState(false);
  const bg = destructive ? "color-mix(in srgb, var(--color-destructive) 5%, transparent)" : "var(--color-accent)";
  return (
    <a
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderRadius: 6,
        font: "400 14px Inter",
        color: destructive ? "var(--color-destructive)" : "var(--color-popover-foreground)",
        background: hover ? bg : "transparent",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {icon && <Icon name={icon} size={14} />}
      <span>{children}</span>
    </a>
  );
}

function DropdownLabel({ children }) {
  return <div style={{ padding: "6px 8px", font: "500 12px Inter", color: "var(--color-muted-foreground)" }}>{children}</div>;
}

function DropdownSeparator() {
  return <div style={{ height: 1, background: "var(--color-muted)", margin: "6px -8px" }} />;
}

window.Dropdown = Dropdown;
window.DropdownItem = DropdownItem;
window.DropdownLabel = DropdownLabel;
window.DropdownSeparator = DropdownSeparator;

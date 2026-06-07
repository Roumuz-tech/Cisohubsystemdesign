// Shared StatCard primitive — same look in Comply and Command.
// Reads i18n from window.I18nContext (exposed by useI18n.jsx). Falls back to
// English when no I18nProvider is mounted so the primitive stays usable in
// isolation (e.g. preview cards loaded without the provider).
const __statCardNoCtx = React.createContext(null);
window.StatCard = function StatCard({ label, value, delta, trend, color, icon }) {
  const ctx = React.useContext(window.I18nContext || __statCardNoCtx);
  const periodLabel = ctx ? ctx.t("dashboard.vsLast30d") : "vs last 30d";

  const tone =
    trend === "up"     ? "success" :
    trend === "up-bad" ? "destructive" :
    trend === "down"   ? "destructive" : "secondary";
  const arrow =
    trend === "up" || trend === "up-bad" ? "arrow-up-right" :
    trend === "down" ? "arrow-down-right" : null;
  return (
    <div className="card stat-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ font: "500 13px var(--font-sans)", color: "var(--color-muted-foreground)" }}>{label}</div>
        <div className="stat-icon" style={{ background: color + "14", color }}>
          <Icon name={icon} size={16} />
        </div>
      </div>
      <div className="stat-num">{value}</div>
      <div style={{ marginTop: 8 }}>
        <span className={"badge badge-" + tone}>
          {arrow && <Icon name={arrow} size={10} />}
          {delta} {periodLabel}
        </span>
      </div>
    </div>
  );
};

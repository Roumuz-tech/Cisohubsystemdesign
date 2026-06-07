/* ============================================================
 * 2. StatusRing — circular progress (SVG) with semantic colors
 * ========================================================== */
function Ring({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "success" | "warning" | "destructive" | "primary";
}) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const color =
    tone === "success"
      ? "var(--success)"
      : tone === "warning"
        ? "var(--warning)"
        : tone === "destructive"
          ? "var(--destructive)"
          : "var(--primary)";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative size-[72px]">
        <svg viewBox="0 0 72 72" className="size-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="6"
          />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={off}
            style={{
              transition: "stroke-dashoffset var(--duration-slow) var(--ease-out)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold">
          {value}%
        </div>
      </div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatusRingDemo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-around p-4 border border-border rounded-lg bg-card">
      <Ring value={92} label="Healthy" tone="success" />
      <Ring value={68} label="Warning" tone="warning" />
      <Ring value={34} label="Critical" tone="destructive" />
      <Ring value={50} label="In progress" tone="primary" />
    </div>
  );
}

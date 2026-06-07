import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

/* ───────────────────────── 1. Compliance Gauge ───────────────────────── */
function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const data = [{ name: label, value, fill: color }];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-[140px]">
        <RadialBarChart
          width={140}
          height={140}
          cx="50%"
          cy="50%"
          innerRadius="75%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={6} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[28px] font-semibold leading-none">{value}%</div>
          <div className="text-[11px] text-muted-foreground mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function ComplianceGaugeDemo() {
  return (
    <div className="flex flex-wrap gap-8 items-end justify-around">
      <Gauge value={92} label="NCA ECC" color="var(--success)" />
      <Gauge value={78} label="ISO 27001" color="var(--primary)" />
      <Gauge value={64} label="SAMA CSF" color="var(--warning)" />
      <Gauge value={41} label="PCI DSS" color="var(--destructive)" />
    </div>
  );
}

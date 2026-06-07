import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
} from "recharts";

/* ───────────────────────── Charts ───────────────────────── */
const lineData = [
  { name: "Jan", score: 72 }, { name: "Feb", score: 74 }, { name: "Mar", score: 71 },
  { name: "Apr", score: 78 }, { name: "May", score: 81 }, { name: "Jun", score: 86 },
];
const barData = [
  { f: "NCA", open: 24, closed: 18 },
  { f: "SAMA", open: 12, closed: 22 },
  { f: "ISO", open: 9, closed: 31 },
  { f: "PDPL", open: 7, closed: 14 },
  { f: "NIST", open: 15, closed: 19 },
];
const pieData = [
  { name: "Critical", value: 6, color: "#ef4444" },
  { name: "High", value: 12, color: "#f59e0b" },
  { name: "Medium", value: 28, color: "#3b82f6" },
  { name: "Low", value: 18, color: "#a1a1aa" },
];

export function ChartsDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Compliance trend */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-[13px] font-medium mb-1">Compliance score</div>
        <div className="text-[24px] font-bold tracking-tight">86%</div>
        <div className="text-[11px] text-muted-foreground mb-2">last 6 months</div>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={lineData}>
            <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.15} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Open vs closed */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-[13px] font-medium mb-1">Risks by framework</div>
        <div className="text-[24px] font-bold tracking-tight">67</div>
        <div className="text-[11px] text-muted-foreground mb-2">open · across 5 frameworks</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={barData}>
            <XAxis dataKey="f" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Bar dataKey="open" name="Open" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="closed" name="Closed" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Severity donut */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-[13px] font-medium mb-1">Severity mix</div>
        <div className="text-[24px] font-bold tracking-tight">64</div>
        <div className="text-[11px] text-muted-foreground mb-2">total active</div>
        <div className="flex items-center gap-3">
          <PieChart width={120} height={120}>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={32} outerRadius={56} paddingAngle={2}>
              {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
          </PieChart>
          <div className="flex flex-col gap-1 text-[12px]">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: d.color }} />
                <span>{d.name}</span>
                <span className="text-muted-foreground ms-1">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Switch } from "../../ui/switch";
import { Slider } from "../../ui/slider";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Menu, LayoutGrid, Grid3x3 } from "lucide-react";

/* ───────────────────────── Slider ───────────────────────── */
export function SliderDemo() {
  const [v, setV] = useState([65]);
  const [range, setRange] = useState([25, 80]);
  return (
    <div className="flex flex-col gap-6 max-w-[520px]">
      <div>
        <div className="flex justify-between text-[12px] font-medium mb-2">
          <span>Severity threshold</span>
          <span className="text-muted-foreground">value: {v[0]}</span>
        </div>
        <Slider value={v} onValueChange={setV} max={100} step={1} />
      </div>
      <div>
        <div className="flex justify-between text-[12px] font-medium mb-2">
          <span>Risk score range</span>
          <span className="text-muted-foreground">{range[0]} – {range[1]}</span>
        </div>
        <Slider value={range} onValueChange={setRange} max={100} step={1} />
      </div>
    </div>
  );
}

/* ───────────────────────── Toggle Group ───────────────────────── */
export function ToggleGroupDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Default · single</div>
        <ToggleGroup type="single" defaultValue="day" variant="default">
          <ToggleGroupItem value="day" className="px-3">Day</ToggleGroupItem>
          <ToggleGroupItem value="week" className="px-3">Week</ToggleGroupItem>
          <ToggleGroupItem value="month" className="px-3">Month</ToggleGroupItem>
          <ToggleGroupItem value="year" className="px-3">Year</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Outline</div>
        <ToggleGroup type="single" defaultValue="list" variant="outline">
          <ToggleGroupItem value="list" className="px-3">List</ToggleGroupItem>
          <ToggleGroupItem value="grid" className="px-3">Grid</ToggleGroupItem>
          <ToggleGroupItem value="kanban" className="px-3">Kanban</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Icons only</div>
        <ToggleGroup type="single" defaultValue="list-i" variant="outline">
          <ToggleGroupItem value="list-i"><Menu className="size-3.5" /></ToggleGroupItem>
          <ToggleGroupItem value="grid-i"><Grid3x3 className="size-3.5" /></ToggleGroupItem>
          <ToggleGroupItem value="kanban-i"><LayoutGrid className="size-3.5" /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

/* ───────────────────────── Patterns ───────────────────────── */
export function ToggleSettingsList() {
  const [state, setState] = useState({
    email: true,
    twofa: true,
    archive: false,
    telemetry: false,
  });
  const rows: Array<{ key: keyof typeof state; title: string; sub: string }> = [
    { key: "email", title: "Email notifications", sub: "Weekly digest + critical alerts" },
    { key: "twofa", title: "Two-factor authentication", sub: "Required on every sign-in" },
    { key: "archive", title: "Auto-archive resolved risks", sub: "After 90 days" },
    { key: "telemetry", title: "Share telemetry with vendor", sub: "Anonymous usage data" },
  ];
  return (
    <div className="border border-border rounded-xl bg-card divide-y divide-border">
      {rows.map((r) => (
        <div key={r.key} className="flex items-center gap-3 px-4.5 py-3.5">
          <div className="flex-1">
            <div className="font-medium text-[14px]">{r.title}</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">{r.sub}</div>
          </div>
          <Switch
            checked={state[r.key]}
            onCheckedChange={(v) => setState({ ...state, [r.key]: v })}
          />
        </div>
      ))}
    </div>
  );
}

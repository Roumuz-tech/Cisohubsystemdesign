import { ColorSwatch, SwatchGroup } from "./ColorSwatch";

export function ColorsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <SwatchGroup title="Primary (Blue)">
        <ColorSwatch color="#3b82f6" name="blue-500" value="#3b82f6" label="--primary" />
        <ColorSwatch color="#2563eb" name="blue-600" value="#2563eb" label="hover" />
        <ColorSwatch color="#eff6ff" name="blue-50" value="#eff6ff" label="Tint" />
        <ColorSwatch color="#dbeafe" name="blue-100" value="#dbeafe" label="Tint" />
        <ColorSwatch color="#1d4ed8" name="blue-700" value="#1d4ed8" label="Shade" />
        <ColorSwatch color="#8b5cf6" name="violet-500" value="#8b5cf6" label="--info" />
      </SwatchGroup>

      <SwatchGroup title="Semantic">
        <ColorSwatch color="#22c55e" name="success" value="#22c55e" label="Paid / Active" />
        <ColorSwatch color="#f59e0b" name="warning" value="#f59e0b" label="Pending" />
        <ColorSwatch color="#ef4444" name="destructive" value="#ef4444" label="Expired" />
        <ColorSwatch color="#8b5cf6" name="info" value="#8b5cf6" label="Info notice" />
        <ColorSwatch color="#3b82f6" name="primary" value="#3b82f6" label="In progress" />
        <ColorSwatch color="#09090b" name="mono" value="#09090b" label="Default" />
      </SwatchGroup>

      <SwatchGroup title="Neutrals — Zinc">
        {[
          ["50", "#fafafa"], ["100", "#f4f4f5"], ["200", "#e4e4e7"],
          ["300", "#d4d4d8"], ["400", "#a1a1aa"], ["500", "#71717a"],
          ["600", "#52525b"], ["700", "#3f3f46"], ["800", "#27272a"],
          ["900", "#18181b"], ["950", "#09090b"],
        ].map(([n, v]) => (
          <ColorSwatch key={n} color={v} name={n} value={v} />
        ))}
      </SwatchGroup>

      <SwatchGroup title="Dark Mode Surfaces">
        <ColorSwatch color="#0a0a0d" name="bg" value="#0a0a0d" label="Page" />
        <ColorSwatch color="#18181b" name="card" value="#18181b" label="Card" />
        <ColorSwatch color="#27272a" name="muted" value="#27272a" label="Muted" />
        <ColorSwatch color="#fafafa" name="foreground" value="#fafafa" label="Text" />
        <ColorSwatch color="#3b82f6" name="primary" value="#3b82f6" label="Stays blue" />
      </SwatchGroup>
    </div>
  );
}

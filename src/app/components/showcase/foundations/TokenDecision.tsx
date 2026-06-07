import { useState } from "react";
import { Moon, Sun, Bell, Settings } from "lucide-react";

type Tone = { name: string; hex: string };

const APP_TONES: Tone[] = [
  { name: "Primary", hex: "#3b82f6" },
  { name: "Destructive", hex: "#dc2626" },
  { name: "Success", hex: "#16a34a" },
  { name: "Warning", hex: "#f59e0b" },
  { name: "Info", hex: "#8b5cf6" },
];

const FIGMA_TONES: Tone[] = [
  { name: "Primary", hex: "#3b82f6" },
  { name: "Destructive", hex: "#ef4444" },
  { name: "Success", hex: "#22c55e" },
  { name: "Warning", hex: "#f59e0b" },
  { name: "Info", hex: "#8b5cf6" },
];

const APP_SEVERITY: Tone[] = [
  { name: "Critical", hex: "#dc2626" },
  { name: "High", hex: "#ea580c" },
  { name: "Medium", hex: "#ca8a04" },
  { name: "Low", hex: "#16a34a" },
  { name: "Info", hex: "#2563eb" },
];

const FIGMA_SEVERITY: Tone[] = [
  { name: "Critical", hex: "#ef4444" },
  { name: "High", hex: "#f97316" },
  { name: "Medium", hex: "#f59e0b" },
  { name: "Low", hex: "#3b82f6" },
  { name: "Info", hex: "#8b5cf6" },
];

const SHADOWS_LIGHT: Record<string, string> = {
  xs: "0 1px 2px 0 rgba(0,0,0,.05)",
  sm: "0 1px 3px 0 rgba(0,0,0,.05), 0 1px 2px -1px rgba(0,0,0,.05)",
  md: "0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -2px rgba(0,0,0,.05)",
  lg: "0 10px 15px -3px rgba(0,0,0,.05), 0 4px 6px -4px rgba(0,0,0,.05)",
  xl: "0 20px 25px -5px rgba(0,0,0,.06)",
};

const SHADOWS_DARK: Record<string, string> = {
  xs: "0 1px 2px 0 rgba(0,0,0,.5)",
  sm: "0 1px 3px 0 rgba(0,0,0,.5), 0 1px 2px -1px rgba(0,0,0,.5)",
  md: "0 4px 6px -1px rgba(0,0,0,.5), 0 2px 4px -2px rgba(0,0,0,.5)",
  lg: "0 10px 15px -3px rgba(0,0,0,.5), 0 4px 6px -4px rgba(0,0,0,.5)",
  xl: "0 20px 25px -5px rgba(0,0,0,.55)",
};

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SolidBadge({ tone }: { tone: Tone }) {
  return (
    <div
      className="inline-flex items-center px-2.5 py-1 rounded-md text-white"
      style={{ background: tone.hex, fontSize: 12 }}
    >
      {tone.name}
    </div>
  );
}

function SoftBadge({ tone }: { tone: Tone }) {
  return (
    <div
      className="inline-flex items-center px-2.5 py-1 rounded-md"
      style={{ background: hexToRgba(tone.hex, 0.1), color: tone.hex, fontSize: 12 }}
    >
      {tone.name}
    </div>
  );
}

function HexLine({ tone }: { tone: Tone }) {
  return (
    <div className="flex items-center gap-2" style={{ fontSize: 11 }}>
      <span
        className="inline-block w-3 h-3 rounded-sm border"
        style={{ background: tone.hex, borderColor: "rgba(0,0,0,.1)" }}
      />
      <span className="text-muted-foreground">{tone.name}</span>
      <code
        className="ms-auto font-mono text-muted-foreground"
        style={{ fontSize: 11 }}
      >
        {tone.hex}
      </code>
    </div>
  );
}

function PaletteColumn({
  title,
  tones,
  severity,
}: {
  title: string;
  tones: Tone[];
  severity: Tone[];
}) {
  const primary = tones[0];
  const destructive = tones[1];
  return (
    <div className="flex-1 border border-border rounded-lg p-5 bg-card flex flex-col gap-5">
      <div>
        <div
          className="uppercase tracking-wider text-muted-foreground"
          style={{ fontSize: 11 }}
        >
          Column
        </div>
        <div className="font-semibold" style={{ fontSize: 14 }}>
          {title}
        </div>
      </div>

      <div>
        <div
          className="uppercase tracking-wider text-muted-foreground mb-2"
          style={{ fontSize: 11 }}
        >
          Solid badges
        </div>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <SolidBadge key={t.name} tone={t} />
          ))}
        </div>
      </div>

      <div>
        <div
          className="uppercase tracking-wider text-muted-foreground mb-2"
          style={{ fontSize: 11 }}
        >
          Soft badges · 10% tint
        </div>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <SoftBadge key={t.name} tone={t} />
          ))}
        </div>
      </div>

      <div>
        <div
          className="uppercase tracking-wider text-muted-foreground mb-2"
          style={{ fontSize: 11 }}
        >
          Buttons
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1.5 rounded-md text-white"
            style={{ background: primary.hex, fontSize: 13 }}
          >
            Primary
          </button>
          <button
            className="px-3 py-1.5 rounded-md text-white"
            style={{ background: destructive.hex, fontSize: 13 }}
          >
            Destructive
          </button>
        </div>
      </div>

      <div>
        <div
          className="uppercase tracking-wider text-muted-foreground mb-2"
          style={{ fontSize: 11 }}
        >
          Severity row
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {severity.map((t) => (
            <div
              key={t.name}
              className="px-2.5 py-1 rounded-md text-white"
              style={{ background: t.hex, fontSize: 12 }}
            >
              {t.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {severity.map((t) => (
            <HexLine key={t.name} tone={t} />
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border flex flex-col gap-1">
        <div
          className="uppercase tracking-wider text-muted-foreground mb-1"
          style={{ fontSize: 11 }}
        >
          Hex reference
        </div>
        {tones.map((t) => (
          <HexLine key={t.name} tone={t} />
        ))}
      </div>
    </div>
  );
}

function ShadowCard({
  label,
  shadow,
}: {
  label: string;
  shadow: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <div
        className="w-full h-24 rounded-lg bg-card border border-border flex items-center justify-center font-semibold"
        style={{ boxShadow: shadow, fontSize: 14 }}
      >
        {label}
      </div>
      <code
        className="font-mono text-muted-foreground text-center break-all"
        style={{ fontSize: 10 }}
      >
        {shadow}
      </code>
    </div>
  );
}

function MiniSidebar({
  title,
  subColor,
  subLabel,
}: {
  title: string;
  subColor: string;
  subLabel: string;
}) {
  const items = [
    { label: "Compliance", sub: "12 controls open" },
    { label: "Risk Register", sub: "3 critical findings" },
  ];
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div
        className="uppercase tracking-wider text-muted-foreground"
        style={{ fontSize: 11 }}
      >
        {title}
      </div>
      <div
        className="rounded-lg p-3 flex flex-col gap-1"
        style={{ background: "#2a3042" }}
      >
        <div
          className="px-2 pb-2 uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}
        >
          Workspace
        </div>
        {items.map((it) => (
          <div
            key={it.label}
            className="px-2 py-2 rounded-md flex flex-col gap-0.5"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div style={{ color: "#ffffff", fontSize: 13 }}>{it.label}</div>
            <div style={{ color: subColor, fontSize: 11 }}>{it.sub}</div>
          </div>
        ))}
        <div
          className="mt-2 pt-2 px-2 border-t font-mono"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.55)",
            fontSize: 10,
          }}
        >
          sub-line: {subLabel}
        </div>
      </div>
    </div>
  );
}

function Section({
  num,
  title,
  desc,
  children,
}: {
  num: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <div
          className="font-mono text-muted-foreground"
          style={{ fontSize: 12 }}
        >
          §{num}
        </div>
        <h2 className="font-semibold" style={{ fontSize: 18 }}>
          {title}
        </h2>
      </div>
      <p className="text-muted-foreground" style={{ fontSize: 13 }}>
        {desc}
      </p>
      <div className="border border-border rounded-xl p-5 bg-background">
        {children}
      </div>
    </section>
  );
}

export function TokenDecisionDemo() {
  const [dark, setDark] = useState(false);
  const shadows = dark ? SHADOWS_DARK : SHADOWS_LIGHT;

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className="bg-muted text-foreground rounded-lg p-5 flex flex-col gap-8"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="font-semibold" style={{ fontSize: 14 }}>
              Token Decision — App vs Figma
            </div>
            <div className="text-muted-foreground" style={{ fontSize: 11 }}>
              Internal · dev-facing · toggle below to verify both modes
            </div>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <span
              className="px-2 py-1 rounded-md bg-background text-muted-foreground border border-border"
              style={{ fontSize: 11 }}
            >
              {dark ? "Dark" : "Light"} mode
            </span>
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-md border border-border bg-background flex items-center justify-center hover:bg-muted"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>

        <Section
          num={1}
          title="Color values"
          desc="Same set rendered with each candidate. Compare badges, soft tints, primary/destructive buttons, and the 5-step severity scale."
        >
          <div className="flex flex-col lg:flex-row gap-5">
            <PaletteColumn title="App" tones={APP_TONES} severity={APP_SEVERITY} />
            <PaletteColumn title="Figma" tones={FIGMA_TONES} severity={FIGMA_SEVERITY} />
          </div>
        </Section>

        <Section
          num={2}
          title="Shadow scale"
          desc="xs → xl. In dark mode, opacity is raised to ~0.5 so depth stays readable on dark cards."
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((k) => (
              <ShadowCard key={k} label={k} shadow={shadows[k]} />
            ))}
          </div>
        </Section>

        <Section
          num={3}
          title="Sidebar muted sub-line"
          desc="Both sidebars use the same dark-navy surface (#2a3042) and the same white (#ffffff) title. Only the secondary line differs — opacity-based vs solid token."
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <MiniSidebar
              title="App (opacity)"
              subColor="rgba(255,255,255,0.55)"
              subLabel="#ffffff @ 55%"
            />
            <MiniSidebar title="Figma (token)" subColor="#6a7187" subLabel="#6a7187" />
          </div>
        </Section>
      </div>
    </div>
  );
}

export default function TokenDecisionPage() {
  const [dark, setDark] = useState(false);
  const shadows = dark ? SHADOWS_DARK : SHADOWS_LIGHT;

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className="min-h-screen bg-muted text-foreground"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <header className="bg-background border-b border-border sticky top-0 z-10">
          <div
            className="mx-auto flex items-center px-5 gap-4"
            style={{ maxWidth: "var(--content-max-width)", height: 56 }}
          >
            <div className="flex flex-col">
              <div className="font-semibold" style={{ fontSize: 14 }}>
                Token Decision
              </div>
              <div
                className="text-muted-foreground"
                style={{ fontSize: 11 }}
              >
                Internal · App vs Figma · dev-facing
              </div>
            </div>
            <div className="ms-auto flex items-center gap-2">
              <span
                className="px-2 py-1 rounded-md bg-muted text-muted-foreground"
                style={{ fontSize: 11 }}
              >
                {dark ? "Dark" : "Light"} mode
              </span>
              <button
                onClick={() => setDark(!dark)}
                className="w-9 h-9 rounded-md border border-border bg-background flex items-center justify-center hover:bg-muted"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            </div>
          </div>
        </header>

        <main
          className="mx-auto flex flex-col gap-10 p-5 py-8"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold tracking-tight" style={{ fontSize: 28 }}>
              Token Decision — App vs Figma
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: 13 }}>
              Side-by-side comparison of token candidates. Pick a column, lock the
              palette, then propagate. Toggle the theme to verify both modes.
            </p>
          </div>

          <Section
            num={1}
            title="Color values"
            desc="Same set rendered with each candidate. Compare badges, soft tints, primary/destructive buttons, and the 5-step severity scale."
          >
            <div className="flex flex-col lg:flex-row gap-5">
              <PaletteColumn title="App" tones={APP_TONES} severity={APP_SEVERITY} />
              <PaletteColumn
                title="Figma"
                tones={FIGMA_TONES}
                severity={FIGMA_SEVERITY}
              />
            </div>
          </Section>

          <Section
            num={2}
            title="Shadow scale"
            desc="xs → xl. In dark mode, opacity is raised to ~0.5 so depth stays readable on dark cards."
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((k) => (
                <ShadowCard key={k} label={k} shadow={shadows[k]} />
              ))}
            </div>
          </Section>

          <Section
            num={3}
            title="Sidebar muted sub-line"
            desc="Both sidebars use the same dark-navy surface (#2a3042) and the same white (#ffffff) title. Only the secondary line differs — opacity-based vs solid token."
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <MiniSidebar
                title="App (opacity)"
                subColor="rgba(255,255,255,0.55)"
                subLabel="#ffffff @ 55%"
              />
              <MiniSidebar
                title="Figma (token)"
                subColor="#6a7187"
                subLabel="#6a7187"
              />
            </div>
          </Section>

          <footer
            className="text-muted-foreground text-center py-6 border-t border-border"
            style={{ fontSize: 11 }}
          >
            Internal token comparison · not a product screen
          </footer>
        </main>
      </div>
    </div>
  );
}

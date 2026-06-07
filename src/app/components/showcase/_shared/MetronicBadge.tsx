import * as React from "react";
import { cn } from "../../ui/utils";

type Color = "primary" | "destructive" | "success" | "warning" | "info" | "mono" | "secondary";
type Appearance = "solid" | "light" | "outline" | "dot";
type Size = "xs" | "sm" | "md" | "lg";

const colors: Record<Color, { solid: string; hex: string; light: { bg: string; fg: string }; dark: { bg: string; fg: string } }> = {
  primary:     { solid: "bg-primary text-primary-foreground",         hex: "#3b82f6", light: { bg: "rgba(59,130,246,0.10)",  fg: "#1d4ed8" }, dark: { bg: "rgba(59,130,246,0.14)",  fg: "#93c5fd" } },
  destructive: { solid: "bg-destructive text-destructive-foreground", hex: "#ef4444", light: { bg: "rgba(239,68,68,0.10)",   fg: "#b91c1c" }, dark: { bg: "rgba(239,68,68,0.14)",   fg: "#f87171" } },
  success:     { solid: "bg-[#22c55e] text-white",                    hex: "#22c55e", light: { bg: "rgba(34,197,94,0.10)",   fg: "#15803d" }, dark: { bg: "rgba(34,197,94,0.14)",   fg: "#4ade80" } },
  warning:     { solid: "bg-[#f59e0b] text-white",                    hex: "#f59e0b", light: { bg: "rgba(245,158,11,0.12)",  fg: "#b45309" }, dark: { bg: "rgba(245,158,11,0.16)",  fg: "#fbbf24" } },
  info:        { solid: "bg-[#8b5cf6] text-white",                    hex: "#8b5cf6", light: { bg: "rgba(139,92,246,0.12)",  fg: "#6d28d9" }, dark: { bg: "rgba(139,92,246,0.16)",  fg: "#c4b5fd" } },
  mono:        { solid: "bg-[#09090b] text-white",                    hex: "#09090b", light: { bg: "rgba(9,9,11,0.06)",      fg: "#27272a" }, dark: { bg: "rgba(255,255,255,0.08)", fg: "#d4d4d8" } },
  secondary:   { solid: "bg-zinc-100 text-zinc-700",                  hex: "#a1a1aa", light: { bg: "rgba(161,161,170,0.10)", fg: "#52525b" }, dark: { bg: "rgba(255,255,255,0.08)", fg: "#d4d4d8" } },
};

const sizes: Record<Size, string> = {
  xs: "h-4 px-1.5 text-[10px] rounded-[4px] gap-1",
  sm: "h-5 px-[7px] text-[11px] rounded-[5px] gap-1",
  md: "h-6 px-2 text-xs rounded-md gap-1",
  lg: "h-7 px-2.5 text-xs rounded-md gap-1.5",
};

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  appearance?: Appearance;
  size?: Size;
  dot?: boolean;
}

export function MBadge({
  color = "primary",
  appearance = "solid",
  size = "md",
  dot = false,
  className,
  children,
  style,
  ...rest
}: Props) {
  const c = colors[color];
  const base = "inline-flex items-center font-medium whitespace-nowrap";

  if (appearance === "dot") {
    return (
      <span className={cn(base, "gap-1.5 text-xs text-foreground", className)} {...rest}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.hex }} />
        {children}
      </span>
    );
  }

  let variantCls = "";
  let inline: React.CSSProperties = { ...style };
  if (appearance === "solid") {
    variantCls = c.solid;
  } else if (appearance === "light") {
    inline = { background: c.light.bg, color: c.light.fg, ...inline };
  } else if (appearance === "outline") {
    inline = { borderColor: c.hex, color: c.hex, background: "transparent", borderWidth: 1, borderStyle: "solid", ...inline };
  }

  return (
    <span className={cn(base, sizes[size], variantCls, className)} style={inline} {...rest}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

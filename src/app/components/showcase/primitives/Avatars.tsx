import * as React from "react";
import { cn } from "../../ui/utils";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, { wh: number; font: number }> = {
  xs: { wh: 24, font: 10 },
  sm: { wh: 32, font: 13 },
  md: { wh: 40, font: 16 },
  lg: { wh: 48, font: 19 },
  xl: { wh: 64, font: 26 },
};

interface AvatarProps {
  size?: Size;
  initials: string;
  background?: string;
  className?: string;
  ring?: boolean;
}

export function Avatar({ size = "md", initials, background, className, ring }: AvatarProps) {
  const { wh, font } = sizeMap[size];
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full text-white font-semibold shrink-0", className)}
      style={{
        width: wh,
        height: wh,
        fontSize: font,
        background: background ?? "linear-gradient(135deg,#3b82f6,#8b5cf6)",
        border: ring ? "2px solid var(--background)" : undefined,
      }}
    >
      {initials}
    </div>
  );
}

interface GroupProps {
  size?: Size;
  items: { initials: string; background?: string }[];
  extra?: number;
}

export function AvatarGroup({ size = "sm", items, extra }: GroupProps) {
  const { wh, font } = sizeMap[size];
  return (
    <div className="flex items-center">
      {items.map((it, i) => (
        <div key={i} style={{ marginInlineStart: i === 0 ? 0 : -10 }}>
          <Avatar size={size} initials={it.initials} background={it.background} ring />
        </div>
      ))}
      {extra !== undefined && (
        <div
          className="inline-flex items-center justify-center rounded-full font-semibold shrink-0 bg-secondary text-zinc-600"
          style={{
            width: wh,
            height: wh,
            fontSize: font - 2,
            border: "2px solid var(--background)",
            marginInlineStart: -10,
          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

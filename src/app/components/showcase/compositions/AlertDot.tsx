type AlertVariant = "info" | "success" | "warning" | "destructive";

const styles: Record<AlertVariant, { bg: string; border: string; dot: string; title: string }> = {
  info: {
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.20)",
    dot: "#3b82f6",
    title: "#1d4ed8",
  },
  success: {
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.20)",
    dot: "#22c55e",
    title: "#15803d",
  },
  warning: {
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.20)",
    dot: "#f59e0b",
    title: "#b45309",
  },
  destructive: {
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.20)",
    dot: "#ef4444",
    title: "#b91c1c",
  },
};

interface Props {
  variant: AlertVariant;
  title: string;
  description: string;
}

export function AlertDot({ variant, title, description }: Props) {
  const s = styles[variant];
  return (
    <div
      className="flex gap-3 items-start px-3.5 py-3 rounded-lg border"
      style={{ background: s.bg, borderColor: s.border }}
    >
      <span
        className="w-2 h-2 rounded-full mt-[7px] shrink-0"
        style={{ background: s.dot }}
      />
      <div className="flex-1">
        <div className="text-[13px] font-semibold" style={{ color: s.title }}>
          {title}
        </div>
        <div className="text-[13px] leading-[1.5] text-zinc-700 dark:text-zinc-300 mt-0.5">
          {description}
        </div>
      </div>
    </div>
  );
}

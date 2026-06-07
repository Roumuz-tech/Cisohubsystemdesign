import { Fragment } from "react";

/* ───────────────────────── Risk Matrix 5×5 ───────────────────────── */
const LIKELIHOOD = ["Rare", "Unlikely", "Possible", "Likely", "Certain"];
const IMPACT = ["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"];

// 5x5 risk score table — row=likelihood (0 bottom→4 top), col=impact (0..4)
function scoreColor(likelihood: number, impact: number) {
  const score = (likelihood + 1) * (impact + 1);
  if (score >= 17) return { bg: "#ef4444", fg: "#fff", label: "Critical" };
  if (score >= 10) return { bg: "#f59e0b", fg: "#fff", label: "High" };
  if (score >= 5) return { bg: "#fbbf24", fg: "#3f3f46", label: "Medium" };
  return { bg: "#22c55e", fg: "#fff", label: "Low" };
}

// Cell counts (mock distribution)
const CELLS: Record<string, number> = {
  "4-4": 2, "4-3": 1, "4-2": 0, "4-1": 0, "4-0": 0,
  "3-4": 3, "3-3": 4, "3-2": 2, "3-1": 1, "3-0": 0,
  "2-4": 2, "2-3": 5, "2-2": 8, "2-1": 3, "2-0": 1,
  "1-4": 1, "1-3": 2, "1-2": 4, "1-1": 6, "1-0": 4,
  "0-4": 0, "0-3": 1, "0-2": 2, "0-1": 3, "0-0": 5,
};

export function RiskMatrixDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex">
        <div className="w-24 shrink-0 flex flex-col items-center justify-center">
          <div className="-rotate-90 text-[11px] uppercase tracking-wider text-muted-foreground whitespace-nowrap font-medium">
            Likelihood →
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1">
            {/* y-axis labels and cells */}
            {[4, 3, 2, 1, 0].map((y) => (
              <Fragment key={y}>
                <div className="flex items-center justify-end pe-2 text-[11px] text-muted-foreground font-medium">
                  {LIKELIHOOD[y]}
                </div>
                {[0, 1, 2, 3, 4].map((x) => {
                  const { bg, fg, label } = scoreColor(y, x);
                  const count = CELLS[`${y}-${x}`] ?? 0;
                  return (
                    <div
                      key={`c-${y}-${x}`}
                      className="aspect-square rounded flex flex-col items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-foreground/20 transition-all"
                      style={{ background: bg, color: fg }}
                      title={`${LIKELIHOOD[y]} × ${IMPACT[x]} — ${label} (${count} risks)`}
                    >
                      <div className="text-[18px] font-bold leading-none">{count}</div>
                      <div className="text-[9px] mt-0.5 opacity-80">{label}</div>
                    </div>
                  );
                })}
              </Fragment>
            ))}

            {/* x-axis labels */}
            <div />
            {IMPACT.map((l) => (
              <div key={l} className="text-[11px] text-muted-foreground font-medium text-center pt-1">
                {l}
              </div>
            ))}
          </div>

          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium text-center mt-2">
            Impact →
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <div className="text-[11px] text-muted-foreground font-medium">Legend:</div>
        {[
          { bg: "#22c55e", label: "Low (1–4)" },
          { bg: "#fbbf24", label: "Medium (5–9)" },
          { bg: "#f59e0b", label: "High (10–16)" },
          { bg: "#ef4444", label: "Critical (17–25)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="size-3 rounded" style={{ background: l.bg }} />
            <span className="text-[12px]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

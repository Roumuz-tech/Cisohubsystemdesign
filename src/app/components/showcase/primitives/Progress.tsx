import { Check } from "lucide-react";

function Bar({ label, value, display, color }: { label: string; value: number; display: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <div className="font-medium text-[13px]">{label}</div>
        <div className="font-semibold text-[13px]">{display}</div>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export function ProgressDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Bar label="Compliance score" value={86} display="86%" color="#22c55e" />
      <Bar label="Vulnerabilities patched" value={70} display="42 / 60" color="#3b82f6" />
      <Bar label="Overdue items" value={9} display="9%" color="#ef4444" />

      <div className="flex items-center mt-2">
        {[
          { label: "Scope", done: true },
          { label: "Map", done: true },
          { label: "Assess", done: true },
          { label: "Submit", done: false, n: 4 },
          { label: "Approve", done: false, n: 5 },
        ].map((step, i, arr) => (
          <div key={step.label} className={"flex items-center " + (i < arr.length - 1 ? "flex-1" : "")}>
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <div
                className={
                  "size-7 rounded-full border-2 flex items-center justify-center text-[12px] font-semibold " +
                  (step.done
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground")
                }
              >
                {step.done ? <Check className="size-3.5" /> : step.n}
              </div>
              <div className={"text-[11px] font-medium text-center " + (step.done ? "" : "text-muted-foreground")}>
                {step.label}
              </div>
            </div>
            {i < arr.length - 1 && (
              <div
                className={
                  "flex-1 h-0.5 mx-1 self-start mt-3.5 " +
                  (arr[i + 1].done ? "bg-primary" : "bg-border")
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { Check } from "lucide-react";

/* ───────────────────────── Stepper (size-6 indicator) ───────────────────────── */
export function StepperDemo() {
  const steps = [
    { label: "Scope", done: true },
    { label: "Map controls", done: true },
    { label: "Assess", done: false, current: true, n: 3 },
    { label: "Submit", done: false, n: 4 },
    { label: "Approve", done: false, n: 5 },
  ];
  return (
    <div className="flex items-start px-5">
      {steps.map((s, i) => {
        const filled = s.done || s.current;
        return (
          <div key={s.label} className={"flex items-center " + (i < steps.length - 1 ? "flex-1" : "")}>
            <div className="flex flex-col items-center gap-1.5 w-24">
              <div
                className={
                  "size-6 rounded-full flex items-center justify-center text-[12px] font-semibold border-2 border-background " +
                  (filled
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-muted-foreground")
                }
              >
                {s.done ? <Check className="size-3" strokeWidth={3} /> : s.n}
              </div>
              <div className={"text-[14px] font-medium text-center " + (filled ? "" : "text-muted-foreground")}>
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={
                  "flex-1 h-0.5 rounded-full mt-[11px] self-start " +
                  (steps[i + 1].done || steps[i + 1].current ? "bg-primary" : "bg-muted")
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

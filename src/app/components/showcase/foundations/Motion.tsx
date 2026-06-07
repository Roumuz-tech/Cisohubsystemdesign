import { useState } from "react";
import { MButton } from "../_shared/MetronicButton";

export function MotionDemo() {
  const [pulse, setPulse] = useState(0);
  const durations = [
    { name: "fast", ms: 150, use: "hover · color · small fades" },
    { name: "base", ms: 200, use: "default — most transitions" },
    { name: "slow", ms: 300, use: "modal · sheet · larger movement" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {durations.map((d) => (
          <div key={d.name} className="flex items-center gap-4">
            <div className="w-16 font-mono text-[12px] text-muted-foreground">--duration-{d.name}</div>
            <div className="w-14 font-mono text-[12px]">{d.ms}ms</div>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden relative">
              <div
                key={`${d.name}-${pulse}`}
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{
                  width: "100%",
                  animation: `motion-demo ${d.ms}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                }}
              />
            </div>
            <div className="text-[11px] text-muted-foreground w-44">{d.use}</div>
          </div>
        ))}
      </div>
      <MButton variant="outline" size="sm" onClick={() => setPulse((p) => p + 1)}>Replay</MButton>
      <div className="text-[11px] text-muted-foreground border-t border-border pt-3">
        Easing: <code className="font-mono">cubic-bezier(0.16, 1, 0.3, 1)</code> (ease-out) · respects <code className="font-mono">prefers-reduced-motion</code>
      </div>
      <style>{`
        @keyframes motion-demo {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

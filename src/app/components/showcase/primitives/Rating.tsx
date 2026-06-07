import { useState } from "react";
import { Star } from "lucide-react";

/* ───────────────────────── Rating ───────────────────────── */
function StarRow({ value, max = 5, onChange }: { value: number; max?: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            onClick={() => onChange?.(i + 1)}
            className={"size-5 cursor-pointer " + (filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

export function RatingDemo() {
  const [v, setV] = useState(3);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3.5"><span className="w-[90px] text-[11px] font-medium text-muted-foreground">5 / 5</span><StarRow value={5} /></div>
      <div className="flex items-center gap-3.5"><span className="w-[90px] text-[11px] font-medium text-muted-foreground">4 / 5</span><StarRow value={4} /></div>
      <div className="flex items-center gap-3.5"><span className="w-[90px] text-[11px] font-medium text-muted-foreground">3 / 5</span><StarRow value={3} /></div>
      <div className="flex items-center gap-3.5">
        <span className="w-[90px] text-[11px] font-medium text-muted-foreground">Interactive</span>
        <StarRow value={v} onChange={setV} />
        <span className="text-[11px] font-mono text-muted-foreground ms-2">value: {v}</span>
      </div>
    </div>
  );
}

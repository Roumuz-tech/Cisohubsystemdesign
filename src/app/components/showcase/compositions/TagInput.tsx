import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

/* ───────────────────────── Tag Input ───────────────────────── */
export function TagInputDemo() {
  const [tags, setTags] = useState<string[]>(["pci-dss", "high-priority", "q2-2026"]);
  const [draft, setDraft] = useState("");

  const add = (v: string) => {
    const t = v.trim();
    if (!t || tags.includes(t)) return;
    setTags([...tags, t]);
    setDraft("");
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-1.5 max-w-md">
      <label className="text-[12px] font-medium">Tags</label>
      <div className="flex flex-wrap gap-1.5 px-2 py-1.5 border border-border rounded-md bg-background shadow-xs min-h-9 focus-within:ring-[3px] focus-within:ring-primary/20 focus-within:border-primary">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 h-6 px-2 rounded bg-primary/10 text-primary text-[12px]">
            {t}
            <X
              className="size-3 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => setTags(tags.filter((x) => x !== t))}
            />
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={() => draft && add(draft)}
          placeholder={tags.length ? "" : "Type and press Enter…"}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-[13px] py-1"
        />
      </div>
      <div className="text-[11px] text-muted-foreground">Enter or comma to add · Backspace to remove last</div>
    </div>
  );
}

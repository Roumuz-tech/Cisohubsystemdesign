import { Separator } from "../../ui/separator";

/* ───────────────────────── ScrollArea (native + custom scrollbar) ───────────────────────── */
export function ScrollAreaDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <div className="w-[300px] h-[180px] border border-border rounded-lg overflow-y-auto p-3.5 scrollable">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="py-1 border-b border-border text-[13px]">
              Risk item #100{i + 1}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="text-[11px] font-medium text-muted-foreground">ScrollArea anatomy</div>
          <div className="text-[11px] font-mono text-muted-foreground">Bar v/h: 5.6px pill thumb</div>
          <div className="text-[11px] font-mono text-muted-foreground">Thumb idle: muted/15%</div>
          <div className="text-[11px] font-mono text-muted-foreground">Thumb hover: muted/30%</div>
        </div>
      </div>

      <div className="border border-border rounded-lg py-3.5">
        <div className="overflow-x-auto flex gap-2.5 px-3.5 scrollable whitespace-nowrap pb-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="px-2.5 py-1.5 bg-muted rounded-md text-[12px] font-medium">RSK-00{(i + 1).toString().padStart(2, "0")}</span>
          ))}
        </div>
        <div className="text-[11px] font-medium text-muted-foreground px-3.5 mt-2">Horizontal scroll · pill chips</div>
      </div>
    </div>
  );
}

/* ───────────────────────── Separator ───────────────────────── */
export function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Horizontal</div>
        <Separator />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Vertical</div>
        <div className="flex items-center gap-3.5 h-10">
          <span className="text-[13px] font-medium">Profile</span>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-[13px] font-medium">Settings</span>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-[13px] font-medium">Sign out</span>
        </div>
      </div>
    </div>
  );
}

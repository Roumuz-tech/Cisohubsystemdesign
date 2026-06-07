import { FileText, Plus, ChevronLeft, ChevronRight, Search, FileCheck, AlertTriangle, ShieldCheck } from "lucide-react";
import { MButton } from "../_shared/MetronicButton";

/* ─────────────────  EmptyState  ───────────────── */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="size-14 rounded-2xl flex items-center justify-center mb-3.5" style={{ background: "rgba(59,130,246,0.08)", color: "var(--primary)" }}>
        <FileText className="size-7" />
      </div>
      <div className="text-base font-semibold">No frameworks linked yet</div>
      <div className="text-[13px] leading-[1.5] text-muted-foreground max-w-[300px] mt-1.5">
        Add a framework to this engagement to start tracking compliance against its controls.
      </div>
      <MButton className="mt-4"><Plus />Add framework</MButton>
    </div>
  );
}

/* ─────────────────  Container  ───────────────── */
export function ContainerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
          width="fixed" · max-w-[1320px] px-4 lg:px-6
        </div>
        <div className="bg-muted p-2 rounded-md">
          <div className="bg-background border border-dashed border-border rounded mx-auto px-4 text-xs font-medium leading-[48px] text-muted-foreground" style={{ maxWidth: 1320 }}>
            Centered · capped at 1320px
          </div>
        </div>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
          width="fluid" · no max-width
        </div>
        <div className="bg-muted p-2 rounded-md">
          <div className="bg-background border border-dashed border-border rounded w-full px-4 text-xs font-medium leading-[48px] text-muted-foreground">
            Fills parent
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────  Footer  ───────────────── */
export function FooterDemo() {
  return (
    <div className="border border-border rounded-lg px-5">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5 text-sm text-muted-foreground">
        <div>2026 © <strong className="font-medium text-foreground">CISO Hub</strong>. All rights reserved.</div>
        <div className="flex items-center gap-[18px]">
          {["Docs", "Status", "FAQ", "Support", "License"].map((l) => (
            <a key={l} className="hover:text-primary cursor-pointer">{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────  Calendar (single, with range) ─────────── */
export function CalendarRangeMock() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // -2..32 to include outside days
  const start = 12, end = 23;

  return (
    <div className="inline-block bg-popover border border-border rounded-lg p-3.5 shadow-md max-w-[280px]">
      <div className="flex items-center justify-between pb-3 px-1">
        <button className="size-7 inline-flex items-center justify-center rounded opacity-60 hover:opacity-100">
          <ChevronLeft className="size-3.5" />
        </button>
        <div className="text-sm font-medium">April 2026</div>
        <button className="size-7 inline-flex items-center justify-center rounded opacity-60 hover:opacity-100">
          <ChevronRight className="size-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 justify-center" style={{ gridTemplateColumns: "repeat(7, 32px)" }}>
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (
          <div key={d} className="size-8 inline-flex items-center justify-center text-xs text-muted-foreground">{d}</div>
        ))}
        {days.map((d, idx) => {
          const inMonth = d >= 1 && d <= 30;
          const isStart = d === start;
          const isEnd = d === end;
          const isMiddle = d > start && d < end;
          let cls = "size-8 inline-flex items-center justify-center text-sm cursor-pointer";
          let style: React.CSSProperties = {};
          if (!inMonth) { cls += " text-muted-foreground opacity-50"; }
          if (isStart || isEnd) {
            style = { background: "var(--primary)", color: "var(--primary-foreground)" };
            if (isStart) Object.assign(style, { borderStartStartRadius: 6, borderEndStartRadius: 6 });
            if (isEnd)   Object.assign(style, { borderStartEndRadius: 6, borderEndEndRadius: 6 });
          } else if (isMiddle) {
            style = { background: "color-mix(in srgb, var(--primary) 10%, transparent)" };
          }
          return <div key={idx} className={cls} style={style}>{inMonth ? d : Math.abs(d) + 28}</div>;
        })}
      </div>
    </div>
  );
}

/* ─────────────────  Command Palette mock  ───────────────── */
export function CommandPaletteMock() {
  const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="px-1.5 py-0.5 text-[11px] font-medium bg-muted border border-border rounded text-muted-foreground">
      {children}
    </kbd>
  );
  return (
    <div className="bg-popover border border-border rounded-lg shadow-md w-full max-w-[520px] overflow-hidden">
      <div className="h-10 border-b border-border flex items-center px-3.5 gap-2.5">
        <Search className="size-4 text-muted-foreground" />
        <input placeholder="Type a command or search..." className="flex-1 bg-transparent border-0 outline-none text-sm" />
        <Kbd>esc</Kbd>
      </div>
      <div className="flex border-b border-border px-2 text-xs font-medium">
        {[
          ["All", 12, true],
          ["Pages", 7],
          ["Frameworks", 3],
          ["People", 2],
        ].map(([l, n, active], i) => (
          <div
            key={i}
            className={`px-3 py-2 -mb-px border-b-2 cursor-pointer ${
              active ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            {l} <span className="text-muted-foreground font-normal">{n}</span>
          </div>
        ))}
      </div>
      <div className="py-1.5 max-h-[280px] overflow-y-auto">
        <div className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Suggestions</div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 mx-1.5 rounded-sm text-sm bg-accent">
          <FileCheck className="size-3.5" />
          <span className="flex-1">New evidence file</span>
          <Kbd>⌘ E</Kbd>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 mx-1.5 rounded-sm text-sm hover:bg-accent cursor-pointer">
          <AlertTriangle className="size-3.5" />
          <span className="flex-1">Add risk</span>
          <Kbd>⌘ R</Kbd>
        </div>
        <div className="h-px bg-border mx-1.5 my-1.5" />
        <div className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Frameworks</div>
        {[
          ["NCA ECC", "92%"],
          ["SAMA Cyber Security", "84%"],
        ].map(([l, v]) => (
          <div key={l} className="flex items-center gap-2 px-2.5 py-1.5 mx-1.5 rounded-sm text-sm hover:bg-accent cursor-pointer">
            <ShieldCheck className="size-3.5" />
            <span className="flex-1">{l}</span>
            <span className="text-[11px] font-medium text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-border text-[11px] text-muted-foreground">
        <div>Move with <Kbd>↑</Kbd> <Kbd>↓</Kbd> · Select with <Kbd>↵</Kbd></div>
        <div>Command palette</div>
      </div>
    </div>
  );
}

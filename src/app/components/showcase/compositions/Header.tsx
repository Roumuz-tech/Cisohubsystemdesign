import { useState } from "react";
import { Search, Bell, Sun, Globe, ChevronDown } from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar } from "../primitives/Avatars";

/* ───────────────────────── Header ───────────────────────── */
export function HeaderDemo() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="flex items-center gap-4 px-4 h-[60px] border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[13px]"
            style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
          >C</div>
          <span className="font-semibold tracking-tight text-[14px]">CISO Hub</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[13px] text-muted-foreground ms-2">
          <span>Dashboards</span>
          <span className="text-zinc-400">/</span>
          <span>Compliance</span>
          <span className="text-zinc-400">/</span>
          <span className="text-foreground font-medium">NCA ECC</span>
        </div>

        <div className="ms-auto flex-1 max-w-[320px] hidden lg:block">
          <div className="relative">
            <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search controls, evidence…" className="ps-8 h-9" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="size-9 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground relative">
            <Bell className="size-4" />
            <span className="absolute top-1.5 end-1.5 size-1.5 rounded-full bg-destructive" />
          </button>
          <button className="size-9 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground">
            <Sun className="size-4" />
          </button>
          <button className="size-9 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground">
            <Globe className="size-4" />
          </button>
          <Avatar size="sm" initials="L" background="#3b82f6" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Nav parts ───────────────────────── */
export function NavPartsDemo() {
  const [tab, setTab] = useState("Overview");
  const [pill, setPill] = useState("Week");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Breadcrumbs</div>
        <div className="flex items-center gap-2 text-[13px]">
          <a className="text-muted-foreground cursor-pointer hover:text-foreground">Dashboards</a>
          <span className="text-zinc-400">/</span>
          <a className="text-muted-foreground cursor-pointer hover:text-foreground">Compliance</a>
          <span className="text-zinc-400">/</span>
          <span className="font-medium">NCA ECC</span>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Tabs · underline</div>
        <div className="flex border-b border-border">
          {["Overview", "Evidence", "Tasks", "Risks", "Audit history"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "px-3.5 py-2.5 text-[13px] font-medium -mb-px border-b-2 transition-colors " +
                (tab === t
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Pill tabs · segmented</div>
        <div className="inline-flex gap-0.5 bg-muted p-0.5 rounded-lg">
          {["Day", "Week", "Month", "Quarter"].map((p) => (
            <button
              key={p}
              onClick={() => setPill(p)}
              className={
                "px-3.5 py-1.5 text-[12px] font-medium rounded-md transition-all " +
                (pill === p
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── PageNavbar ───────────────────────── */
export function PageNavbarDemo() {
  const [active, setActive] = useState("Overview");
  const items = [
    { label: "Overview" },
    { label: "Notifications" },
    { label: "Integrations" },
    { label: "Account", chevron: true },
    { label: "Security", chevron: true },
    { label: "Billing" },
    { label: "More", chevron: true },
  ];
  return (
    <div className="border-b border-border flex items-center overflow-x-auto">
      {items.map((it) => {
        const isActive = active === it.label;
        return (
          <button
            key={it.label}
            onClick={() => setActive(it.label)}
            className={
              "inline-flex items-center gap-1.5 px-3.5 py-2.5 -mb-px border-b-2 text-[14px] font-medium whitespace-nowrap transition-colors " +
              (isActive
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground")
            }
          >
            {it.label}
            {it.chevron && <ChevronDown className="size-3" />}
          </button>
        );
      })}
    </div>
  );
}

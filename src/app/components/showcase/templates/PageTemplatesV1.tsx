import { useState } from "react";
import {
  Shield,
  FileText,
  Search,
  Plus,
  Filter,
  ChevronRight,
  Home,
  Settings as SettingsIcon,
  Users,
  Bell,
  LayoutDashboard,
  FileSearch,
  Inbox,
  ServerCrash,
  Lock,
  Globe,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { MButton } from "../_shared/MetronicButton";
import { Input } from "../../ui/input";

/* ───────────────────────── 5. Page Templates ───────────────────────── */
type TemplateKey = "list" | "detail" | "dashboard" | "settings" | "empty" | "404" | "500";

function MiniShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card h-[360px] flex flex-col">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2 bg-muted/30">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/60" />
          <div className="size-2.5 rounded-full bg-warning/60" />
          <div className="size-2.5 rounded-full bg-success/60" />
        </div>
        <div className="text-[11px] font-mono text-muted-foreground ms-2">{title}</div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function ListTemplate() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[14px] font-semibold">Risks</div>
          <div className="text-[11px] text-muted-foreground">142 items</div>
        </div>
        <div className="flex gap-1.5">
          <MButton size="sm" variant="outline"><Filter className="size-3.5" /></MButton>
          <MButton size="sm" variant="primary"><Plus className="size-3.5" /> New</MButton>
        </div>
      </div>
      <div className="px-4 py-2 border-b border-border">
        <div className="relative">
          <Search className="size-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search…" className="ps-8 h-8 text-[12px]" />
        </div>
      </div>
      <div className="flex-1 overflow-auto scrollable">
        {["RSK-0184 · Unpatched OpenSSL", "RSK-0183 · Weak MFA on admin", "RSK-0182 · Public S3 bucket", "RSK-0181 · Stale firewall rule", "RSK-0180 · Phishing campaign"].map((r) => (
          <div key={r} className="px-4 py-2.5 border-b border-border text-[12px] flex items-center justify-between hover:bg-muted/40 cursor-pointer">
            <span>{r}</span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailTemplate() {
  return (
    <div className="grid grid-cols-[160px_1fr] h-full">
      <div className="border-e border-border overflow-auto scrollable">
        {["RSK-0184", "RSK-0183", "RSK-0182", "RSK-0181", "RSK-0180"].map((r, i) => (
          <div key={r} className={"px-3 py-2 text-[11px] font-mono border-b border-border cursor-pointer " + (i === 0 ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted/40")}>
            {r}
          </div>
        ))}
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[13px] font-semibold">Unpatched OpenSSL CVE-2024-0727</div>
          <div className="flex gap-1.5 mt-1.5">
            <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>
            <Badge variant="outline">Open</Badge>
          </div>
        </div>
        <div className="p-4 overflow-auto scrollable text-[12px] flex flex-col gap-2">
          <div><span className="text-muted-foreground">Owner: </span>Ahmed S.</div>
          <div><span className="text-muted-foreground">Asset: </span>web-prod-01</div>
          <div><span className="text-muted-foreground">Due: </span>2026-06-01</div>
          <div className="pt-2 text-muted-foreground leading-relaxed">OpenSSL version 3.0.x prior to 3.0.13 vulnerable to NULL deref…</div>
        </div>
      </div>
    </div>
  );
}

function DashboardTemplate() {
  return (
    <div className="p-3 grid grid-cols-3 gap-2 h-full">
      {[
        { l: "Open Risks", v: "142", c: "text-destructive" },
        { l: "Controls", v: "324", c: "text-primary" },
        { l: "Evidence", v: "1.2k", c: "text-success" },
      ].map((k) => (
        <div key={k.l} className="border border-border rounded-md p-2.5">
          <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
          <div className={"text-[20px] font-semibold " + k.c}>{k.v}</div>
        </div>
      ))}
      <div className="col-span-2 border border-border rounded-md p-3 row-span-2">
        <div className="text-[11px] font-medium mb-2">Risk Trend (30d)</div>
        <svg viewBox="0 0 200 80" className="w-full h-[calc(100%-20px)]">
          <polyline fill="none" stroke="var(--primary)" strokeWidth="2" points="0,60 20,55 40,50 60,52 80,40 100,42 120,30 140,35 160,20 180,25 200,15" />
        </svg>
      </div>
      <div className="border border-border rounded-md p-3 row-span-2">
        <div className="text-[11px] font-medium mb-2">By severity</div>
        <div className="flex flex-col gap-1.5">
          {[{ l: "Critical", w: "85%", c: "var(--destructive)" }, { l: "High", w: "60%", c: "#f97316" }, { l: "Medium", w: "40%", c: "var(--warning)" }, { l: "Low", w: "20%", c: "var(--primary)" }].map((b) => (
            <div key={b.l}>
              <div className="flex justify-between text-[10px] mb-0.5"><span>{b.l}</span></div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div style={{ width: b.w, background: b.c }} className="h-full" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsTemplate() {
  const items = [
    { i: Users, l: "Members", n: "12 users" },
    { i: Lock, l: "Security", n: "MFA enforced" },
    { i: Bell, l: "Notifications", n: "Email · Slack" },
    { i: Globe, l: "Region", n: "KSA · ar-SA" },
  ];
  return (
    <div className="grid grid-cols-[140px_1fr] h-full">
      <div className="border-e border-border p-2 flex flex-col gap-0.5">
        {items.map((it, idx) => {
          const I = it.i;
          return (
            <div key={it.l} className={"flex items-center gap-2 px-2 py-1.5 rounded text-[12px] cursor-pointer " + (idx === 0 ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/40")}>
              <I className="size-3.5" />{it.l}
            </div>
          );
        })}
      </div>
      <div className="p-4 overflow-auto scrollable">
        <div className="text-[13px] font-semibold mb-3">Members</div>
        <div className="flex flex-col gap-2">
          {["Ahmed S.", "Sara M.", "Khalid R."].map((n) => (
            <div key={n} className="flex items-center gap-2 p-2 border border-border rounded text-[12px]">
              <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-semibold">{n[0]}</div>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyTemplate() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-3">
        <Inbox className="size-7 text-muted-foreground" />
      </div>
      <div className="text-[14px] font-semibold mb-1">No risks yet</div>
      <div className="text-[12px] text-muted-foreground mb-4 max-w-[260px]">Start tracking risks across your frameworks. Add your first one to begin.</div>
      <MButton size="sm" variant="primary"><Plus className="size-3.5" /> New risk</MButton>
    </div>
  );
}

function NotFoundTemplate() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="text-[48px] font-bold text-primary leading-none mb-2">404</div>
      <div className="text-[14px] font-semibold mb-1">Page not found</div>
      <div className="text-[12px] text-muted-foreground mb-4 max-w-[260px]">The control or framework you requested doesn't exist or was moved.</div>
      <MButton size="sm" variant="outline"><Home className="size-3.5" /> Go home</MButton>
    </div>
  );
}

function ServerErrorTemplate() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="size-14 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
        <ServerCrash className="size-7 text-destructive" />
      </div>
      <div className="text-[48px] font-bold text-destructive leading-none mb-1">500</div>
      <div className="text-[14px] font-semibold mb-1">Something went wrong</div>
      <div className="text-[12px] text-muted-foreground mb-4 max-w-[260px]">Our team has been notified. Trace: <span className="font-mono">req_8af2…b1</span></div>
      <div className="flex gap-2">
        <MButton size="sm" variant="outline">Retry</MButton>
        <MButton size="sm" variant="primary">Contact support</MButton>
      </div>
    </div>
  );
}

export function PageTemplatesDemo() {
  const [tab, setTab] = useState<TemplateKey>("list");
  const tabs: { k: TemplateKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { k: "list", label: "List", icon: FileSearch },
    { k: "detail", label: "Detail", icon: FileText },
    { k: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { k: "settings", label: "Settings", icon: SettingsIcon },
    { k: "empty", label: "Empty", icon: Inbox },
    { k: "404", label: "404", icon: Shield },
    { k: "500", label: "500", icon: ServerCrash },
  ];
  const render = () => {
    switch (tab) {
      case "list": return <ListTemplate />;
      case "detail": return <DetailTemplate />;
      case "dashboard": return <DashboardTemplate />;
      case "settings": return <SettingsTemplate />;
      case "empty": return <EmptyTemplate />;
      case "404": return <NotFoundTemplate />;
      case "500": return <ServerErrorTemplate />;
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const I = t.icon;
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors " +
                (active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted")
              }
            >
              <I className="size-3.5" /> {t.label}
            </button>
          );
        })}
      </div>
      <MiniShell title={`/ciso-hub/${tab}`}>{render()}</MiniShell>
    </div>
  );
}

import { useState } from "react";
import {
  Shield,
  FileText,
  Search,
  Plus,
  Home,
  Settings as SettingsIcon,
  LayoutDashboard,
  FileSearch,
  Inbox,
  ServerCrash,
  ChevronRight,
  AlertTriangle,
  Lock,
  Activity,
  Download,
  ChevronDown,
  RefreshCw,
  MoreHorizontal,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import { MButton } from "../_shared/MetronicButton";
import { Input } from "../../ui/input";

/* ───────────────────────── 7. Page Templates · Variant 3 (Enterprise) ───────────────────────── */
type TemplateKey = "list" | "detail" | "dashboard" | "settings" | "empty" | "404" | "500";

function ProShell({ children, title, breadcrumb }: { children: React.ReactNode; title: string; breadcrumb?: string }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card h-[420px] flex flex-col shadow-sm">
      <div className="h-9 border-b border-border bg-muted/40 flex items-center px-3 gap-3">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/50" />
          <div className="size-2.5 rounded-full bg-warning/50" />
          <div className="size-2.5 rounded-full bg-success/50" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-background border border-border rounded px-3 py-0.5 text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
            <Lock className="size-2.5 text-success" />
            ciso-hub.io{breadcrumb || `/${title.toLowerCase()}`}
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function ProSidebar({ active }: { active: string }) {
  const nav = [
    { k: "dashboard", l: "Dashboard", i: LayoutDashboard },
    { k: "risks", l: "Risks", i: AlertTriangle, badge: 12 },
    { k: "controls", l: "Controls", i: Shield },
    { k: "evidence", l: "Evidence", i: FileText },
    { k: "audit", l: "Audit log", i: Activity },
  ];
  return (
    <div className="w-[160px] bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded bg-primary flex items-center justify-center"><Shield className="size-3.5 text-white" /></div>
          <div className="text-[12px] font-semibold">CISO Hub</div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 p-2 flex-1">
        {nav.map((n) => {
          const I = n.i;
          const isActive = active === n.k;
          return (
            <div key={n.k} className={"flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium cursor-pointer " + (isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5")}>
              <I className="size-3.5" />
              <span className="flex-1">{n.l}</span>
              {n.badge && <span className="bg-destructive text-white text-[9px] px-1.5 rounded-full">{n.badge}</span>}
            </div>
          );
        })}
      </div>
      <div className="p-2 border-t border-white/10">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer">
          <div className="size-6 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-semibold text-white">AS</div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-white truncate">Ahmed S.</div>
            <div className="text-[9px] text-white/50">CISO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListTemplateV3() {
  const [selected, setSelected] = useState<string[]>(["RSK-0183"]);
  const rows = [
    { id: "RSK-0184", t: "Unpatched OpenSSL CVE-2024-0727", sev: "Critical", owner: "Ahmed S.", framework: "NCA ECC", due: "Tomorrow", status: "Open" },
    { id: "RSK-0183", t: "Weak MFA enforcement on admin accounts", sev: "High", owner: "Sara M.", framework: "ISO 27001", due: "5d", status: "In progress" },
    { id: "RSK-0182", t: "Public S3 bucket exposing audit logs", sev: "High", owner: "Khalid R.", framework: "SAMA CSF", due: "1w", status: "Open" },
    { id: "RSK-0181", t: "Stale firewall rule allowing 0.0.0.0/0", sev: "Medium", owner: "Ahmed S.", framework: "NCA ECC", due: "2w", status: "Review" },
    { id: "RSK-0180", t: "Phishing campaign targeting finance", sev: "Low", owner: "Sara M.", framework: "ISO 27001", due: "1mo", status: "Mitigated" },
  ];
  const sevCls: Record<string, string> = {
    Critical: "bg-destructive text-destructive-foreground",
    High: "bg-[#f97316] text-white",
    Medium: "bg-warning text-warning-foreground",
    Low: "bg-primary text-primary-foreground",
  };
  const statusCls: Record<string, string> = {
    Open: "bg-destructive/10 text-destructive",
    "In progress": "bg-primary/10 text-primary",
    Review: "bg-warning/10 text-warning",
    Mitigated: "bg-success/10 text-success",
  };
  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="flex h-full">
      <ProSidebar active="risks" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-0.5">
              <span>GRC</span><ChevronRight className="size-2.5" /><span>Risks</span>
            </div>
            <div className="text-[15px] font-semibold">Risk register</div>
          </div>
          <div className="flex items-center gap-1.5">
            <MButton size="sm" variant="outline"><Download className="size-3.5" /> Export</MButton>
            <MButton size="sm" variant="primary"><Plus className="size-3.5" /> New risk</MButton>
          </div>
        </div>

        <div className="px-5 py-2.5 border-b border-border flex items-center gap-2 bg-muted/20">
          <div className="relative flex-1 max-w-[240px]">
            <Search className="size-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search risks..." className="ps-8 h-7 text-[11px]" />
          </div>
          {["All severity", "All frameworks", "All owners"].map((f) => (
            <button key={f} className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border bg-card text-[11px] hover:bg-muted">
              {f} <ChevronDown className="size-3" />
            </button>
          ))}
          <div className="flex-1" />
          {selected.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-primary font-medium">
              {selected.length} selected
              <button className="text-muted-foreground hover:text-foreground"><RefreshCw className="size-3" /></button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[28px_70px_1fr_70px_90px_90px_70px_80px_24px] gap-2 px-5 py-2 bg-muted/30 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
          <div></div><div>ID</div><div>Title</div><div>Severity</div><div>Status</div><div>Framework</div><div>Owner</div><div>Due</div><div></div>
        </div>

        <div className="flex-1 overflow-auto scrollable">
          {rows.map((r) => {
            const isSel = selected.includes(r.id);
            return (
              <div key={r.id} className={"grid grid-cols-[28px_70px_1fr_70px_90px_90px_70px_80px_24px] gap-2 px-5 py-2.5 border-b border-border items-center text-[11px] cursor-pointer " + (isSel ? "bg-primary/5" : "hover:bg-muted/40")}>
                <div><input type="checkbox" checked={isSel} onChange={() => toggle(r.id)} className="accent-primary" /></div>
                <div className="font-mono text-[10px] text-muted-foreground">{r.id}</div>
                <div className="truncate font-medium">{r.t}</div>
                <div><span className={"px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase " + sevCls[r.sev]}>{r.sev}</span></div>
                <div><span className={"px-1.5 py-0.5 rounded text-[10px] font-medium " + statusCls[r.status]}>{r.status}</span></div>
                <div className="text-[10px] font-mono text-muted-foreground">{r.framework}</div>
                <div className="truncate text-muted-foreground">{r.owner}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{r.due}</div>
                <div><MoreHorizontal className="size-3.5 text-muted-foreground" /></div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border px-5 py-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <div>Showing 1–5 of 142</div>
          <div className="flex gap-1">
            <button className="size-6 rounded border border-border bg-card hover:bg-muted">‹</button>
            <button className="size-6 rounded border border-primary bg-primary text-primary-foreground">1</button>
            <button className="size-6 rounded border border-border bg-card hover:bg-muted">2</button>
            <button className="size-6 rounded border border-border bg-card hover:bg-muted">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailTemplateV3() {
  return (
    <div className="flex h-full">
      <ProSidebar active="risks" />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky header */}
        <div className="px-5 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
            <span>Risks</span><ChevronRight className="size-2.5" /><span className="font-mono">RSK-0184</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="text-muted-foreground hover:text-warning"><Star className="size-4" /></button>
              <div className="text-[15px] font-semibold">Unpatched OpenSSL CVE-2024-0727</div>
            </div>
            <div className="flex gap-1.5">
              <MButton size="sm" variant="outline"><Eye className="size-3.5" /> Watch</MButton>
              <MButton size="sm" variant="outline">Assign</MButton>
              <MButton size="sm" variant="primary">Mark mitigated</MButton>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-destructive text-destructive-foreground">Critical</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-destructive/10 text-destructive">Open</span>
            <span className="text-[11px] text-muted-foreground">Opened by Ahmed S. · 2 days ago</span>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main content */}
          <div className="flex-1 overflow-auto scrollable p-4 flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2">
              {[
                { l: "CVSS", v: "9.8", c: "text-destructive" },
                { l: "EPSS", v: "0.87", c: "text-warning" },
                { l: "Assets", v: "3", c: "" },
                { l: "Age", v: "2d", c: "" },
              ].map((k) => (
                <div key={k.l} className="border border-border rounded-md p-2.5 bg-card">
                  <div className="text-[9px] uppercase text-muted-foreground tracking-wider">{k.l}</div>
                  <div className={"text-[16px] font-semibold " + k.c}>{k.v}</div>
                </div>
              ))}
            </div>
            <div className="border border-border rounded-md p-3 bg-card">
              <div className="text-[11px] font-semibold mb-1.5">Description</div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">OpenSSL version 3.0.x prior to 3.0.13 is vulnerable to a NULL pointer dereference when processing maliciously formatted PKCS12 files. Remote attacker may cause DoS via crafted certificates.</div>
            </div>
            <div className="border border-border rounded-md p-3 bg-card">
              <div className="text-[11px] font-semibold mb-2">Affected controls</div>
              <div className="flex flex-wrap gap-1">
                {["SC-7 Boundary protection", "SI-2 Flaw remediation", "RA-5 Vulnerability scanning"].map((c) => (
                  <span key={c} className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Activity rail */}
          <div className="w-[200px] border-s border-border bg-muted/30 overflow-auto scrollable p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Activity</div>
            <div className="flex flex-col gap-2.5">
              {[
                { who: "Khalid R.", what: "patched libssl on web-prod-01", t: "4h", c: "bg-success" },
                { who: "Sara M.", what: "assigned to Khalid R.", t: "1d", c: "bg-primary" },
                { who: "Ahmed S.", what: "opened risk · severity Critical", t: "2d", c: "bg-destructive" },
              ].map((a) => (
                <div key={a.t} className="flex gap-2 text-[11px]">
                  <div className={"size-1.5 rounded-full mt-1.5 " + a.c} />
                  <div className="flex-1">
                    <div><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span></div>
                    <div className="text-[10px] text-muted-foreground">{a.t} ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardTemplateV3() {
  const kpis = [
    { l: "Compliance score", v: "86%", d: "+2.4%", up: true, c: "var(--success)" },
    { l: "Open risks", v: "142", d: "+8", up: false, c: "var(--destructive)" },
    { l: "Controls covered", v: "324/410", d: "79%", up: true, c: "var(--primary)" },
    { l: "Evidence verified", v: "1,247", d: "+38", up: true, c: "var(--info)" },
  ];
  return (
    <div className="flex h-full">
      <ProSidebar active="dashboard" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold">Security posture</div>
            <div className="text-[10px] text-muted-foreground">Updated 2 minutes ago</div>
          </div>
          <div className="flex gap-1.5">
            {["7d", "30d", "90d", "All"].map((p, i) => (
              <button key={p} className={"px-2 py-1 text-[11px] rounded border " + (i === 1 ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted")}>{p}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollable p-4 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-2">
            {kpis.map((k) => (
              <div key={k.l} className="border border-border rounded-lg p-3 bg-card">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{k.l}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <div className="text-[18px] font-semibold" style={{ color: k.c }}>{k.v}</div>
                  <div className={"text-[10px] inline-flex items-center gap-0.5 " + (k.up ? "text-success" : "text-destructive")}>
                    {k.up ? <ArrowUpRight className="size-2.5" /> : <ArrowDownRight className="size-2.5" />} {k.d}
                  </div>
                </div>
                <svg viewBox="0 0 100 24" className="w-full h-5 mt-1.5">
                  <polyline fill="none" stroke={k.c} strokeWidth="1.5" points={k.up ? "0,18 20,15 40,16 60,10 80,8 100,4" : "0,4 20,8 40,6 60,12 80,14 100,18"} />
                </svg>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 border border-border rounded-lg p-3 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[12px] font-semibold">Compliance trend</div>
                  <div className="text-[10px] text-muted-foreground">Across all frameworks</div>
                </div>
                <TrendingUp className="size-4 text-success" />
              </div>
              <svg viewBox="0 0 300 80" className="w-full h-[80px]">
                <defs>
                  <linearGradient id="grad-v3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,60 L 30,55 60,58 90,45 120,48 150,38 180,32 210,28 240,22 270,18 300,12 L 300,80 L 0,80 Z" fill="url(#grad-v3)" />
                <polyline fill="none" stroke="var(--primary)" strokeWidth="2" points="0,60 30,55 60,58 90,45 120,48 150,38 180,32 210,28 240,22 270,18 300,12" />
              </svg>
            </div>
            <div className="border border-border rounded-lg p-3 bg-card">
              <div className="text-[12px] font-semibold mb-2">Risks by severity</div>
              <div className="flex flex-col gap-2">
                {[
                  { l: "Critical", v: 6, w: "12%", c: "var(--destructive)" },
                  { l: "High", v: 23, w: "32%", c: "#f97316" },
                  { l: "Medium", v: 58, w: "55%", c: "var(--warning)" },
                  { l: "Low", v: 55, w: "48%", c: "var(--primary)" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-medium">{s.l}</span>
                      <span className="font-mono text-muted-foreground">{s.v}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div style={{ width: s.w, background: s.c }} className="h-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg bg-card">
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <div className="text-[12px] font-semibold">Recent incidents</div>
              <button className="text-[10px] text-primary font-medium">View all →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageTemplatesV3Demo() {
  const [tab, setTab] = useState<TemplateKey>("list");
  const tabs: { k: TemplateKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { k: "list", label: "List (Data grid)", icon: FileSearch },
    { k: "detail", label: "Detail (Split view)", icon: FileText },
    { k: "dashboard", label: "Dashboard (KPIs)", icon: LayoutDashboard },
  ];
  const render = () => {
    switch (tab) {
      case "list": return <ListTemplateV3 />;
      case "detail": return <DetailTemplateV3 />;
      case "dashboard": return <DashboardTemplateV3 />;
      default: return <ListTemplateV3 />;
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
      <ProShell title={`/v3/${tab}`}>{render()}</ProShell>
    </div>
  );
}

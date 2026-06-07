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
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── 6. Page Templates · Variant 2 ───────────────────────── */
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

function ListTemplateV2() {
  const rows = [
    { id: "RSK-0184", t: "Unpatched OpenSSL", sev: "Critical", owner: "AS", due: "2d" },
    { id: "RSK-0183", t: "Weak MFA on admin", sev: "High", owner: "SM", due: "5d" },
    { id: "RSK-0182", t: "Public S3 bucket", sev: "High", owner: "KR", due: "1w" },
    { id: "RSK-0181", t: "Stale firewall rule", sev: "Medium", owner: "AS", due: "2w" },
    { id: "RSK-0180", t: "Phishing campaign", sev: "Low", owner: "SM", due: "1mo" },
  ];
  const sevCls: Record<string, string> = {
    Critical: "bg-destructive/10 text-destructive",
    High: "bg-[#f97316]/10 text-[#f97316]",
    Medium: "bg-warning/10 text-warning",
    Low: "bg-primary/10 text-primary",
  };
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
        <div className="text-[13px] font-semibold flex-1">Risks · table view</div>
        <Badge variant="outline" className="text-[10px]">142</Badge>
        <MButton size="sm" variant="primary"><Plus className="size-3.5" /></MButton>
      </div>
      <div className="grid grid-cols-[80px_1fr_70px_50px_50px] gap-2 px-4 py-2 bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        <div>ID</div><div>Title</div><div>Severity</div><div>Owner</div><div className="text-end">Due</div>
      </div>
      <div className="flex-1 overflow-auto scrollable">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[80px_1fr_70px_50px_50px] gap-2 px-4 py-2.5 border-b border-border items-center text-[12px] hover:bg-muted/40 cursor-pointer">
            <div className="font-mono text-[11px]">{r.id}</div>
            <div className="truncate">{r.t}</div>
            <div><span className={"px-1.5 py-0.5 rounded text-[10px] font-medium " + sevCls[r.sev]}>{r.sev}</span></div>
            <div><div className="size-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-semibold">{r.owner}</div></div>
            <div className="text-end font-mono text-[11px] text-muted-foreground">{r.due}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailTemplateV2() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>Risks</span><ChevronRight className="size-3" /><span>Critical</span><ChevronRight className="size-3" /><span className="font-mono">RSK-0184</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[14px] font-semibold">Unpatched OpenSSL CVE-2024-0727</div>
          <div className="flex gap-1.5">
            <MButton size="sm" variant="outline">Assign</MButton>
            <MButton size="sm" variant="primary">Mitigate</MButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-3 flex-1 overflow-auto scrollable">
        {[
          { l: "Severity", v: "Critical", c: "text-destructive" },
          { l: "CVSS", v: "9.8", c: "text-destructive" },
          { l: "Asset", v: "web-prod-01", c: "" },
        ].map((k) => (
          <div key={k.l} className="border border-border rounded-md p-2.5">
            <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
            <div className={"text-[16px] font-semibold " + k.c}>{k.v}</div>
          </div>
        ))}
        <div className="col-span-3 border border-border rounded-md p-3">
          <div className="text-[11px] font-medium mb-1.5">Description</div>
          <div className="text-[12px] text-muted-foreground leading-relaxed">OpenSSL version 3.0.x prior to 3.0.13 is vulnerable to a NULL pointer dereference when processing maliciously formatted PKCS12 files.</div>
        </div>
        <div className="col-span-3 border border-border rounded-md p-3">
          <div className="text-[11px] font-medium mb-2">Activity</div>
          <div className="flex flex-col gap-1.5 text-[11px]">
            {["Ahmed S. opened · 2d ago", "Sara M. assigned to Khalid · 1d ago", "Khalid R. patched libssl · 4h ago"].map((a) => (
              <div key={a} className="text-muted-foreground"><span className="text-success">●</span> {a}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardTemplateV2() {
  return (
    <div className="p-3 grid grid-cols-4 grid-rows-3 gap-2 h-full">
      {[
        { l: "Compliance", v: "86%", c: "var(--success)" },
        { l: "Open Risks", v: "142", c: "var(--destructive)" },
        { l: "Controls", v: "324", c: "var(--primary)" },
        { l: "Evidence", v: "1.2k", c: "var(--info)" },
      ].map((k) => (
        <div key={k.l} className="border border-border rounded-md p-2.5 flex flex-col justify-between">
          <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
          <div className="text-[18px] font-semibold" style={{ color: k.c }}>{k.v}</div>
        </div>
      ))}
      <div className="col-span-2 row-span-2 border border-border rounded-md p-3">
        <div className="text-[11px] font-medium mb-2">Frameworks coverage</div>
        <div className="flex flex-col gap-2">
          {[{ l: "NCA ECC", w: "92%" }, { l: "ISO 27001", w: "78%" }, { l: "SAMA CSF", w: "64%" }, { l: "PCI DSS", w: "41%" }].map((b) => (
            <div key={b.l}>
              <div className="flex justify-between text-[10px] mb-0.5"><span>{b.l}</span><span className="font-mono text-muted-foreground">{b.w}</span></div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div style={{ width: b.w, background: "var(--primary)" }} className="h-full" /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 row-span-2 border border-border rounded-md p-3">
        <div className="text-[11px] font-medium mb-2">Recent activity</div>
        <div className="flex flex-col gap-1.5">
          {[
            { i: CheckCircle2, c: "text-success", t: "Evidence approved · firewall-q2.pdf" },
            { i: AlertTriangle, c: "text-warning", t: "Control SC-7 review due" },
            { i: AlertOctagon, c: "text-destructive", t: "New critical risk RSK-0184" },
            { i: FileText, c: "text-muted-foreground", t: "Policy access-control updated" },
          ].map((a, i) => {
            const I = a.i;
            return (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <I className={"size-3.5 mt-0.5 " + a.c} />
                <span className="text-muted-foreground">{a.t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SettingsTemplateV2() {
  const tabs = ["General", "Members", "Security", "Integrations", "Billing"];
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 border-b border-border">
        <div className="text-[14px] font-semibold mb-2">Workspace settings</div>
        <div className="flex gap-1">
          {tabs.map((t, i) => (
            <div key={t} className={"px-3 py-1.5 text-[12px] cursor-pointer border-b-2 " + (i === 0 ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground")}>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto scrollable flex flex-col gap-3">
        {[
          { l: "Workspace name", v: "Saudi British Bank" },
          { l: "Region", v: "KSA · ar-SA" },
          { l: "Default framework", v: "NCA ECC" },
        ].map((r) => (
          <div key={r.l} className="flex items-center justify-between p-3 border border-border rounded-md">
            <div>
              <div className="text-[12px] font-medium">{r.l}</div>
              <div className="text-[11px] text-muted-foreground">{r.v}</div>
            </div>
            <MButton size="sm" variant="outline">Edit</MButton>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyTemplateV2() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="border-2 border-dashed border-border rounded-xl p-8 max-w-[320px] text-center">
        <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
          <FileText className="size-6" />
        </div>
        <div className="text-[14px] font-semibold mb-1">Upload your first evidence</div>
        <div className="text-[12px] text-muted-foreground mb-4">Drag a file here or browse to attach proof for a control.</div>
        <MButton size="sm" variant="primary">Browse files</MButton>
      </div>
    </div>
  );
}

function NotFoundTemplateV2() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="flex items-center gap-6">
        <div className="text-[80px] font-bold text-muted leading-none">404</div>
        <div className="border-s border-border ps-6 max-w-[220px]">
          <div className="text-[14px] font-semibold mb-1">Not found</div>
          <div className="text-[12px] text-muted-foreground mb-3">This control or framework no longer exists in your workspace.</div>
          <div className="flex gap-2">
            <MButton size="sm" variant="outline"><Home className="size-3.5" /> Home</MButton>
            <MButton size="sm" variant="primary"><Search className="size-3.5" /> Search</MButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerErrorTemplateV2() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2">
        <AlertOctagon className="size-4 text-destructive" />
        <span className="text-[12px] text-destructive font-medium">Service incident · 500 Internal Server Error</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-[300px]">
          <div className="text-[14px] font-semibold mb-1">We're investigating</div>
          <div className="text-[12px] text-muted-foreground mb-3">Trace: <span className="font-mono">req_8af2b1</span> · 2026-05-26 14:22 UTC</div>
          <div className="flex flex-col gap-2 text-start bg-muted rounded-md p-3 text-[11px] font-mono text-muted-foreground mb-3">
            <div>at FrameworkService.fetch (line 142)</div>
            <div>at ControlsLoader.load (line 38)</div>
          </div>
          <div className="flex gap-2 justify-center">
            <MButton size="sm" variant="outline">Retry</MButton>
            <MButton size="sm" variant="primary">Status page</MButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageTemplatesV2Demo() {
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
      case "list": return <ListTemplateV2 />;
      case "detail": return <DetailTemplateV2 />;
      case "dashboard": return <DashboardTemplateV2 />;
      case "settings": return <SettingsTemplateV2 />;
      case "empty": return <EmptyTemplateV2 />;
      case "404": return <NotFoundTemplateV2 />;
      case "500": return <ServerErrorTemplateV2 />;
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
      <MiniShell title={`/ciso-hub/v2/${tab}`}>{render()}</MiniShell>
    </div>
  );
}

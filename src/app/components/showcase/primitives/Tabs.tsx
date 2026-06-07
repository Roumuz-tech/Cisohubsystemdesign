import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";

/* ───────────────────────── Tabs (3 variants) ───────────────────────── */
export function TabsDemo() {
  const [v2, setV2] = useState("all");
  const [v3, setV3] = useState("Evidence");
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">default · pill</div>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-[13px] text-muted-foreground py-2">Overview tab content…</TabsContent>
          <TabsContent value="activity" className="text-[13px] text-muted-foreground py-2">Activity tab content…</TabsContent>
          <TabsContent value="reports" className="text-[13px] text-muted-foreground py-2">Reports tab content…</TabsContent>
        </Tabs>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">button · bordered triggers</div>
        <div className="inline-flex gap-1.5">
          {["all", "open", "closed"].map((t) => (
            <button
              key={t}
              onClick={() => setV2(t)}
              className={
                "px-3.5 py-1.5 text-[14px] font-medium rounded-md transition-all capitalize " +
                (v2 === t
                  ? "bg-background text-foreground border border-border shadow-xs"
                  : "bg-transparent text-muted-foreground border border-transparent")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">line · underline</div>
        <div className="flex border-b border-border">
          {["Evidence", "Tasks", "Audit history"].map((t) => (
            <button
              key={t}
              onClick={() => setV3(t)}
              className={
                "px-3.5 py-2.5 text-[14px] font-medium -mb-px border-b-2 transition-colors " +
                (v3 === t
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

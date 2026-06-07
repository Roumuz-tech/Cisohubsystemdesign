import { Shield, AlertTriangle, Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

/* ============================================================
 * 3. AccordionMenu — nested nav with collapsible groups
 * ========================================================== */
export function AccordionMenuDemo() {
  const groups = [
    {
      k: "compliance",
      l: "Compliance",
      i: Shield,
      items: ["Frameworks", "Controls", "Assessments"],
    },
    {
      k: "risk",
      l: "Risk management",
      i: AlertTriangle,
      items: ["Risk register", "Risk matrix", "Treatments"],
    },
    {
      k: "evidence",
      l: "Evidence",
      i: Folder,
      items: ["Documents", "Collections", "Approvals"],
    },
  ];
  return (
    <div className="max-w-[320px] border border-border rounded-lg bg-card p-1">
      <Accordion type="multiple" defaultValue={["compliance"]}>
        {groups.map((g) => {
          const I = g.i;
          return (
            <AccordionItem key={g.k} value={g.k} className="border-b-0">
              <AccordionTrigger className="px-2.5 py-2 rounded-md hover:bg-muted hover:no-underline">
                <span className="flex items-center gap-2.5 text-[12px] font-medium">
                  <I className="size-4 text-muted-foreground" strokeWidth={1.5} />
                  {g.l}
                </span>
              </AccordionTrigger>
              <AccordionContent className="ps-9 pe-2 pb-1">
                <div className="flex flex-col">
                  {g.items.map((it, i) => (
                    <button
                      key={it}
                      className={
                        "text-start px-2 py-1.5 rounded-md text-[11px] transition-colors " +
                        (i === 0 && g.k === "compliance"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground")
                      }
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from "../../ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger } from "../../ui/drawer";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── Drawer (bottom — Vaul) ───────────────────────── */
export function DrawerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Drawer>
        <DrawerTrigger asChild>
          <MButton variant="outline">Open drawer (bottom)</MButton>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Quick actions</DrawerTitle>
              <DrawerDescription>Mobile-first slide-up panel — use for short flows on touch devices.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 flex flex-col gap-2">
              {["Run risk assessment", "Upload evidence", "Invite teammate"].map((a) => (
                <button key={a} className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-accent text-[14px] text-start">
                  <Plus className="size-4 text-muted-foreground" />
                  {a}
                </button>
              ))}
            </div>
            <DrawerFooter>
              <MButton variant="primary">Confirm</MButton>
              <MButton variant="ghost">Cancel</MButton>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <div className="text-[11px] text-muted-foreground">
        Drawer slides from bottom (mobile-first, via Vaul). Sheet slides from a side edge (desktop-first).
      </div>
    </div>
  );
}

/* ───────────────────────── Sheet ───────────────────────── */
export function SheetDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl"] as const).map((sz) => (
        <SheetSized key={sz} size={sz} />
      ))}
    </div>
  );
}

function SheetSized({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const widths: Record<string, string> = {
    sm: "sm:max-w-sm",   // ~384px
    md: "sm:max-w-lg",   // ~512px
    lg: "sm:max-w-3xl",  // ~768px
    xl: "sm:max-w-full",
  };
  const labels: Record<string, string> = {
    sm: "Default · 384",
    md: "Medium · 512",
    lg: "Wide · ~768",
    xl: "Full",
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MButton variant="outline">{labels[size]}</MButton>
      </SheetTrigger>
      <SheetContent className={"w-3/4 " + widths[size]}>
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle>Edit risk</SheetTitle>
              <SheetDescription>RSK-0184 · {labels[size]}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="px-4 text-[13px] text-muted-foreground">Form fields would render here…</div>
        <SheetFooter>
          <MButton variant="outline" size="sm">Cancel</MButton>
          <MButton variant="primary" size="sm">Save</MButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

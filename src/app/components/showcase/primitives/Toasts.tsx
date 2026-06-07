import { toast, Toaster } from "sonner";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── Toast (Sonner) ───────────────────────── */
export function ToastDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <MButton variant="outline" onClick={() => toast.success("Saved", { description: "Risk assessment submitted for approval." })}>Success</MButton>
        <MButton variant="outline" onClick={() => toast.error("Failed", { description: "Could not reach Active Directory." })}>Error</MButton>
        <MButton variant="outline" onClick={() => toast.warning("Heads up", { description: "Token expires in 3 days." })}>Warning</MButton>
        <MButton variant="outline" onClick={() => toast.info("Notice", { description: "New compliance framework available." })}>Info</MButton>
      </div>
      <div className="text-[11px] text-muted-foreground">Sonner toaster mounted at app root · top-right by default.</div>
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
}

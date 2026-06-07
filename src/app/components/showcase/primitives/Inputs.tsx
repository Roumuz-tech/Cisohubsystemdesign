import { Mail, DollarSign } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── Form Controls ───────────────────────── */
export function FormControlsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Checkbox</div>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-[13px]"><Checkbox defaultChecked /> Email alerts</label>
          <label className="flex items-center gap-2 text-[13px]"><Checkbox /> SMS alerts</label>
          <label className="flex items-center gap-2 text-[13px] text-muted-foreground"><Checkbox disabled /> Push (coming soon)</label>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Radio</div>
        <RadioGroup defaultValue="weekly" className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-[13px]"><RadioGroupItem value="daily" id="r1" /> Daily digest</label>
          <label className="flex items-center gap-2 text-[13px]"><RadioGroupItem value="weekly" id="r2" /> Weekly digest</label>
          <label className="flex items-center gap-2 text-[13px]"><RadioGroupItem value="off" id="r3" /> Off</label>
        </RadioGroup>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Switch</div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-[13px]"><Switch defaultChecked /> Two-factor authentication</label>
          <label className="flex items-center gap-3 text-[13px]"><Switch /> Share telemetry</label>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Select</div>
        <Select defaultValue="nca">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nca">NCA ECC</SelectItem>
            <SelectItem value="sama">SAMA CSF</SelectItem>
            <SelectItem value="iso">ISO 27001:2022</SelectItem>
            <SelectItem value="nist">NIST CSF 2.0</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ───────────────────────── Input Addons ───────────────────────── */
export function InputAddonsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      <div className="flex flex-col gap-1.5">
        <Label>Start addon</Label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-e-0 border-border rounded-s-md bg-muted text-muted-foreground text-[13px]">$</span>
          <Input className="rounded-s-none" defaultValue="1,250.00" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>End addon</Label>
        <div className="flex">
          <Input className="rounded-e-none" defaultValue="cisohub" />
          <span className="inline-flex items-center px-3 border border-s-0 border-border rounded-e-md bg-muted text-muted-foreground text-[13px]">.cisohub.app</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Leading icon</Label>
        <div className="relative">
          <Mail className="absolute start-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input className="ps-9" placeholder="you@example.com" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Input + Button</Label>
        <div className="flex gap-2">
          <Input placeholder="Invite teammate by email" />
          <MButton variant="primary">Invite</MButton>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Input States ───────────────────────── */
export function InputStatesDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <Label>Default</Label>
        <Input placeholder="Placeholder" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Focused</Label>
        <Input
          defaultValue="Focused value"
          className="border-primary ring-[3px] ring-primary/20"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-destructive">Error</Label>
        <Input defaultValue="bad@" aria-invalid />
        <span className="text-[11px] text-destructive">Enter a valid email address.</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Disabled</Label>
        <Input disabled defaultValue="Read-only" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>
          With prefix $ <span className="text-muted-foreground">— numeric</span>
        </Label>
        <div className="relative">
          <DollarSign className="absolute start-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input className="ps-9" defaultValue="980.00" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Textarea ───────────────────────── */
export function TextareaDemo() {
  return (
    <div className="flex flex-col gap-3.5 max-w-[520px]">
      <div>
        <Label className="mb-1.5 block">Description</Label>
        <Textarea placeholder="Describe the risk scenario..." className="min-h-20" />
      </div>
      <div>
        <Label className="mb-1.5 block">Filled state</Label>
        <Textarea
          className="min-h-20"
          defaultValue="Unpatched MongoDB exposed to internet. Discovered 2026-04-12 during external scan. Affects production tenant SB-001."
        />
      </div>
      <div className="flex gap-3.5">
        <div className="flex-1">
          <Label className="mb-1.5 block text-destructive">Error state</Label>
          <Textarea aria-invalid defaultValue="Too short" className="min-h-16" />
          <div className="text-[12px] font-medium text-destructive mt-1">Must be at least 20 characters</div>
        </div>
        <div className="flex-1">
          <Label className="mb-1.5 block">Disabled</Label>
          <Textarea disabled defaultValue="Locked content" className="min-h-16" />
        </div>
      </div>
    </div>
  );
}

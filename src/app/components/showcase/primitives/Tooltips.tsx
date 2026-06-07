import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { MButton } from "../_shared/MetronicButton";
import { Avatar } from "./Avatars";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

/* ───────────────────────── Popover (Filter) ───────────────────────── */
export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MButton variant="outline">Filter <ChevronDown className="size-3.5" /></MButton>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="flex flex-col gap-3">
          <div className="font-medium text-[13px]">Filter evidence</div>
          <div className="flex flex-col gap-2">
            <Label className="text-[12px]">Status</Label>
            <Select defaultValue="all">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[12px]">Framework</Label>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-[13px]"><Checkbox defaultChecked /> NCA ECC</label>
              <label className="flex items-center gap-2 text-[13px]"><Checkbox /> SAMA CSF</label>
              <label className="flex items-center gap-2 text-[13px]"><Checkbox /> ISO 27001</label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <MButton variant="ghost" size="sm">Reset</MButton>
            <MButton variant="primary" size="sm">Apply</MButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ───────────────────────── HoverCard ───────────────────────── */
export function HoverCardDemo() {
  return (
    <div className="text-[13px]">
      Comment by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a className="text-primary underline cursor-pointer">@layla.khan</a>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="flex items-start gap-3">
            <Avatar size="lg" initials="L" background="linear-gradient(135deg,#22c55e,#3b82f6)" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px]">Layla Khan</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">
                GRC Analyst · Saudi British Bank
              </div>
              <div className="flex gap-3.5 mt-2.5 text-[11px] text-muted-foreground">
                <span><strong className="text-foreground">42</strong> evidence</span>
                <span><strong className="text-foreground">7</strong> controls</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      {" "}— reviewed the latest control mapping.
    </div>
  );
}

/* ───────────────────────── Tooltip ───────────────────────── */
export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-12 items-start">
        <div className="flex flex-col items-center gap-3">
          <Tooltip><TooltipTrigger asChild><MButton variant="outline">Hover me</MButton></TooltipTrigger>
            <TooltipContent>Run risk assessment</TooltipContent>
          </Tooltip>
          <div className="text-[11px] text-muted-foreground">dark (default)</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Tooltip><TooltipTrigger asChild><MButton variant="outline">Hover me</MButton></TooltipTrigger>
            <TooltipContent className="bg-background text-foreground border border-border">
              <strong>Layla Khan</strong> · last seen 1h ago
            </TooltipContent>
          </Tooltip>
          <div className="text-[11px] text-muted-foreground">light</div>
        </div>
      </div>
    </TooltipProvider>
  );
}

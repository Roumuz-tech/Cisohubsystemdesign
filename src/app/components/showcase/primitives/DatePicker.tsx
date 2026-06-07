import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";

/* ───────────────────────── DatePicker ───────────────────────── */
export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-1.5 max-w-xs">
      <label className="text-[12px] font-medium">Due date</label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center h-9 w-full px-3 rounded-md border border-border bg-background text-[13px] shadow-xs gap-2">
            <CalendarIcon className="size-3.5 text-muted-foreground" />
            <span className={date ? "" : "text-muted-foreground"}>
              {date ? format(date, "PPP") : "Pick a date"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

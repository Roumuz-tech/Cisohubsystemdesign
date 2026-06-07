import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

/* ───────────────────────── Combobox ───────────────────────── */
const FRAMEWORKS = [
  { value: "nca", label: "NCA ECC" },
  { value: "sama", label: "SAMA CSF" },
  { value: "iso27001", label: "ISO 27001:2022" },
  { value: "pdpl", label: "PDPL" },
  { value: "nist", label: "NIST CSF 2.0" },
  { value: "soc2", label: "SOC 2 Type II" },
  { value: "pci", label: "PCI DSS 4.0" },
];

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("nca");
  const current = FRAMEWORKS.find((f) => f.value === value);
  return (
    <div className="flex flex-col gap-1.5 max-w-xs">
      <label className="text-[12px] font-medium">Framework</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center h-9 w-full px-3 rounded-md border border-border bg-background text-[13px] shadow-xs"
          >
            <span className={current ? "" : "text-muted-foreground"}>
              {current?.label ?? "Select framework…"}
            </span>
            <ChevronsUpDown className="ms-auto size-3.5 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[260px]" align="start">
          <Command>
            <CommandInput placeholder="Search framework…" />
            <CommandList>
              <CommandEmpty>No framework.</CommandEmpty>
              <CommandGroup>
                {FRAMEWORKS.map((f) => (
                  <CommandItem
                    key={f.value}
                    value={f.label}
                    onSelect={() => {
                      setValue(f.value);
                      setOpen(false);
                    }}
                  >
                    {f.label}
                    {value === f.value && <Check className="ms-auto size-3.5" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ───────────────────────── Multi-select w/ chips ───────────────────────── */
export function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>(["nca", "iso27001"]);
  const [open, setOpen] = useState(false);
  const toggle = (v: string) =>
    setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <div className="flex flex-col gap-1.5 max-w-md">
      <label className="text-[12px] font-medium">Frameworks (multi)</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-start min-h-9 w-full px-2 py-1 rounded-md border border-border bg-background shadow-xs gap-1.5 flex-wrap">
            {selected.length === 0 && (
              <span className="text-muted-foreground text-[13px] px-1 self-center">
                Select frameworks…
              </span>
            )}
            {selected.map((v) => {
              const f = FRAMEWORKS.find((x) => x.value === v);
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 h-6 px-2 rounded bg-muted text-[12px]"
                >
                  {f?.label}
                  <X
                    className="size-3 cursor-pointer hover:text-foreground text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(v);
                    }}
                  />
                </span>
              );
            })}
            <ChevronsUpDown className="ms-auto size-3.5 text-muted-foreground self-center" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[260px]" align="start">
          <Command>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>No match.</CommandEmpty>
              <CommandGroup>
                {FRAMEWORKS.map((f) => (
                  <CommandItem key={f.value} value={f.label} onSelect={() => toggle(f.value)}>
                    <div
                      className={
                        "size-4 rounded border me-2 flex items-center justify-center " +
                        (selected.includes(f.value)
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border")
                      }
                    >
                      {selected.includes(f.value) && <Check className="size-3" />}
                    </div>
                    {f.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

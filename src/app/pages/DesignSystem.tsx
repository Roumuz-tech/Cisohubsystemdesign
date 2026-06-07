import { useState } from "react";
import { Link } from "react-router";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Settings, ChevronDown, Eye, Pencil, Copy, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
/* ── Shared helpers ── */
import { MButton } from "../components/showcase/_shared/MetronicButton";
import { MBadge } from "../components/showcase/_shared/MetronicBadge";

/* ── Foundations ── */
import { ColorsDemo } from "../components/showcase/foundations/Colors";
import {
  DisplayTypeDemo,
  BodyTypeDemo,
  WeightsTypeDemo,
  MonoTypeDemo,
  ArabicTypeDemo,
} from "../components/showcase/foundations/Typography";
import { SpacingScale } from "../components/showcase/foundations/Spacing";
import { RadiusScale } from "../components/showcase/foundations/Radius";
import { ShadowScale } from "../components/showcase/foundations/Shadows";
import { ZIndexLayers } from "../components/showcase/foundations/ZIndex";
import { MotionDemo } from "../components/showcase/foundations/Motion";
import { IconReference } from "../components/showcase/foundations/Icons";

/* ── Primitives ── */
import {
  FormControlsDemo,
  InputAddonsDemo,
  InputStatesDemo,
  TextareaDemo,
} from "../components/showcase/primitives/Inputs";
import { ComboboxDemo, MultiSelectDemo } from "../components/showcase/primitives/Selects";
import { DatePickerDemo } from "../components/showcase/primitives/DatePicker";
import { SliderDemo, ToggleGroupDemo, ToggleSettingsList } from "../components/showcase/primitives/Toggles";
import { TabsDemo } from "../components/showcase/primitives/Tabs";
import { TooltipDemo, PopoverDemo, HoverCardDemo } from "../components/showcase/primitives/Tooltips";
import { SheetDemo, DrawerDemo } from "../components/showcase/primitives/Sheets";
import { ToastDemo } from "../components/showcase/primitives/Toasts";
import { SkeletonDemo, SkeletonWithPatternDemo } from "../components/showcase/primitives/Skeletons";
import { StatusRingDemo } from "../components/showcase/primitives/StatusRing";
import { StepperDemo } from "../components/showcase/primitives/Stepper";
import { Avatar, AvatarGroup } from "../components/showcase/primitives/Avatars";
import { CalendarRangeMock } from "../components/showcase/primitives/Calendar";
import { CommandPaletteMock } from "../components/showcase/primitives/Command";
import { RatingDemo } from "../components/showcase/primitives/Rating";
import { ProgressDemo } from "../components/showcase/primitives/Progress";
import { ScrollAreaDemo, SeparatorDemo } from "../components/showcase/primitives/Scroll";

/* ── Compositions ── */
import { DataGrid } from "../components/showcase/compositions/DataGrid";
import { SidebarDemo } from "../components/showcase/compositions/Sidebar";
import { NavigationRailDemo } from "../components/showcase/compositions/NavigationRail";
import { AccordionMenuDemo } from "../components/showcase/compositions/AccordionMenu";
import { CommentThreadDemo } from "../components/showcase/compositions/CommentThread";
import { TimelineDemo } from "../components/showcase/compositions/Timeline";
import { TagInputDemo } from "../components/showcase/compositions/TagInput";
import { CodeBlockDemo } from "../components/showcase/compositions/CodeBlock";
import { DiffViewerDemo } from "../components/showcase/compositions/DiffViewer";
import { TranslatedFormMessageDemo } from "../components/showcase/compositions/TranslatedFormMessage";
import { ContainerDemo } from "../components/showcase/compositions/Container";
import { HeaderDemo, NavPartsDemo, PageNavbarDemo } from "../components/showcase/compositions/Header";
import { KpiStatRow, StatCardRow, CardAnatomy } from "../components/showcase/compositions/AppStats";
import { EmptyState } from "../components/showcase/compositions/EmptyState";
import { FooterDemo } from "../components/showcase/compositions/Footer";
import { AlertDot } from "../components/showcase/compositions/AlertDot";
import { SettingsKvTable } from "../components/showcase/compositions/Settings";
import { ChartsDemo } from "../components/showcase/compositions/Charts";
import {
  SignInCard,
  SignUpCard,
  ResetPasswordCard,
  TwoFactorCard,
} from "../components/showcase/compositions/Auth";
import { FileUploadDemo } from "../components/showcase/compositions/FileUpload";
import { TablePaginationDemo } from "../components/showcase/compositions/TablePagination";
import { A11yGuide } from "../components/showcase/compositions/A11y";

/* ── CISO Patterns ── */
import { RiskMatrixDemo } from "../components/showcase/ciso-patterns/RiskMatrix";
import { ComplianceGaugeDemo } from "../components/showcase/ciso-patterns/ComplianceGauge";
import { ControlMappingDemo } from "../components/showcase/ciso-patterns/ControlMapping";
import { EvidenceCardDemo } from "../components/showcase/ciso-patterns/EvidenceCard";
import { SeverityScaleDemo } from "../components/showcase/ciso-patterns/SeverityScale";

/* ── Templates ── */
import { PageTemplatesDemo } from "../components/showcase/templates/PageTemplatesV1";
import { PageTemplatesV2Demo } from "../components/showcase/templates/PageTemplatesV2";
import { PageTemplatesV3Demo } from "../components/showcase/templates/PageTemplatesV3";
import { LayoutOptionsDemo } from "../components/showcase/templates/LayoutOptions";

export default function DesignSystem() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-muted text-foreground">
        {/* Header */}
        <header
          className="bg-background border-b border-border sticky top-0 z-10 flex items-center px-5 gap-4"
          style={{ height: "var(--header-height)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
            >
              C
            </div>
            <div>
              <div className="font-semibold tracking-tight">CISO Hub</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">
                Design System v1.0
              </div>
            </div>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><ArrowLeft className="size-4" /> Home</Link>
            </Button>
            <Badge variant="secondary">Metronic v9</Badge>
            <Badge variant="secondary">shadcn default</Badge>
            <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
              {dark ? <Sun /> : <Moon />}
            </Button>
          </div>
        </header>

        <main
          className="mx-auto flex flex-col gap-5 p-5"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div>
            <h1>CISO Hub Design System</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Foundation tokens, primitives, and patterns. Built on Tailwind v4 + shadcn/ui (default).
            </p>
          </div>

          {/* COLORS */}
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent><ColorsDemo /></CardContent>
          </Card>

          {/* TYPOGRAPHY */}
          <Card>
            <CardHeader>
              <CardTitle>Typography — Inter + Cairo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">H1 · 30/600</div>
                <h1>Cybersecurity, simplified.</h1>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">H2 · Arabic</div>
                <h2 dir="rtl">الأمن السيبراني، مبسّط</h2>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Body · 13/400</div>
                <p>
                  Body text uses 13px (--text-body-size) — Metronic's table/form default. Pairs Inter (Latin) with Cairo (Arabic) for full RTL support.
                </p>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Stat · 48/700</div>
                <div className="text-5xl font-bold leading-none tracking-tight">$34,233</div>
              </div>
            </CardContent>
          </Card>

          {/* BUTTONS */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons — 9 variants × 4 sizes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Variants (md)</div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  <MButton variant="primary">Primary</MButton>
                  <MButton variant="mono">Mono</MButton>
                  <MButton variant="destructive">Destructive</MButton>
                  <MButton variant="secondary">Secondary</MButton>
                  <MButton variant="outline">Outline</MButton>
                  <MButton variant="dashed">Dashed</MButton>
                  <MButton variant="ghost">Ghost</MButton>
                  <MButton variant="dim">Dim</MButton>
                  <MButton variant="link">Link</MButton>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Sizes</div>
                <div className="flex flex-wrap gap-2.5 items-end">
                  <div className="flex flex-col items-center gap-1.5">
                    <MButton size="lg">Large</MButton>
                    <div className="text-[11px] text-muted-foreground">lg · h-40 · 14px</div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <MButton size="md">Medium</MButton>
                    <div className="text-[11px] text-muted-foreground">md · h-34 · 13px</div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <MButton size="sm">Small</MButton>
                    <div className="text-[11px] text-muted-foreground">sm · h-28 · 12px</div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <MButton variant="outline" size="icon" aria-label="Settings"><Settings /></MButton>
                    <div className="text-[11px] text-muted-foreground">icon · 34×34</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BADGES */}
          <Card>
            <CardHeader>
              <CardTitle>Badges — 4 appearances × 6 colors × 4 sizes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Solid</div>
                <div className="flex flex-wrap gap-2">
                  <MBadge color="primary">primary</MBadge>
                  <MBadge color="destructive">destructive</MBadge>
                  <MBadge color="success">success</MBadge>
                  <MBadge color="info">info</MBadge>
                  <MBadge color="warning">warning</MBadge>
                  <MBadge color="mono">mono</MBadge>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Light · DataGrid cells</div>
                <div className="flex flex-wrap gap-2">
                  <MBadge appearance="light" color="success">Active</MBadge>
                  <MBadge appearance="light" color="warning">Pending</MBadge>
                  <MBadge appearance="light" color="destructive">Expired</MBadge>
                  <MBadge appearance="light" color="info">Info</MBadge>
                  <MBadge appearance="light" color="primary">Draft</MBadge>
                  <MBadge appearance="light" color="secondary">N/A</MBadge>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Outline</div>
                <div className="flex flex-wrap gap-2">
                  <MBadge appearance="outline" color="primary">Primary</MBadge>
                  <MBadge appearance="outline" color="success">Success</MBadge>
                  <MBadge appearance="outline" color="destructive">Destructive</MBadge>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Dot · compact lists</div>
                <div className="flex flex-wrap gap-4">
                  <MBadge appearance="dot" color="success">In Office</MBadge>
                  <MBadge appearance="dot" color="warning">Away</MBadge>
                  <MBadge appearance="dot" color="destructive">On Leave</MBadge>
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Sizes</div>
                <div className="flex items-end gap-3">
                  <MBadge appearance="light" color="primary" size="xs">Beta</MBadge>
                  <MBadge appearance="light" color="success" size="sm">Active</MBadge>
                  <MBadge appearance="light" color="success" size="md">Verified</MBadge>
                  <MBadge appearance="light" color="destructive" size="lg">Critical</MBadge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AVATARS */}
          <Card>
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-8 items-end">
              <div className="flex items-end gap-3.5">
                {(["xs","sm","md","lg","xl"] as const).map(s => (
                  <div key={s} className="flex flex-col items-center gap-1.5">
                    <Avatar size={s} initials="A" />
                    <div className="text-[11px] text-muted-foreground">{s}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="text-[11px] text-muted-foreground">Group · stacked</div>
                <AvatarGroup
                  items={[
                    { initials: "M", background: "#3b82f6" },
                    { initials: "L", background: "#22c55e" },
                    { initials: "K", background: "#f59e0b" },
                    { initials: "N", background: "#ef4444" },
                  ]}
                  extra={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* INPUTS */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 max-w-md">
              <Input placeholder="Default input" />
              <Input placeholder="Email address" type="email" />
              <Input placeholder="Disabled" disabled />
            </CardContent>
          </Card>

          {/* ALERTS */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              <AlertDot variant="info" title="Heads up" description="New compliance framework available for review." />
              <AlertDot variant="success" title="Saved" description="Risk assessment submitted for approval." />
              <AlertDot variant="warning" title="Heads up" description="Token expires in 3 days. Refresh now." />
              <AlertDot variant="destructive" title="Failed" description="Could not reach Active Directory. Retrying in 30s." />
            </CardContent>
          </Card>

          {/* ACCORDION */}
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="a1">
                <AccordionItem value="a1">
                  <AccordionTrigger>What frameworks does CISO Hub support?</AccordionTrigger>
                  <AccordionContent>
                    NCA ECC, SAMA, ISO 27001:2022, PDPL, NIST CSF 2.0, plus customs. Active expansion every quarter.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a2">
                  <AccordionTrigger>How is evidence stored?</AccordionTrigger>
                  <AccordionContent>
                    Encrypted object storage with per-tenant keys; immutable audit log entries.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a3">
                  <AccordionTrigger>Can I export an audit pack?</AccordionTrigger>
                  <AccordionContent>
                    Yes — PDF + ZIP with all evidence, attestations and signature chain.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* DATAGRID */}
          <Card>
            <CardHeader>
              <CardTitle>DataGrid</CardTitle>
            </CardHeader>
            <CardContent>
              <DataGrid />
            </CardContent>
          </Card>

          {/* DIALOG + DROPDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <MButton variant="outline">Delete evidence file…</MButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-[380px]">
                    <DialogHeader>
                      <DialogTitle>Delete evidence file?</DialogTitle>
                      <DialogDescription>
                        This permanently removes the file and detaches it from 3 controls.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <MButton variant="outline">Cancel</MButton>
                      <MButton variant="destructive">Delete file</MButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MButton variant="outline">
                      Actions <ChevronDown className="size-3.5" />
                    </MButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><Eye />View details</DropdownMenuItem>
                    <DropdownMenuItem><Pencil />Edit</DropdownMenuItem>
                    <DropdownMenuItem><Copy />Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive"><Trash />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>

          {/* EMPTY STATE + CALENDAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Empty State</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Calendar — Range</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <CalendarRangeMock />
              </CardContent>
            </Card>
          </div>

          {/* COMMAND PALETTE */}
          <Card>
            <CardHeader>
              <CardTitle>Command Palette</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center bg-muted/40">
              <CommandPaletteMock />
            </CardContent>
          </Card>

          {/* CONTAINER */}
          <Card>
            <CardHeader>
              <CardTitle>Container — fixed vs fluid</CardTitle>
            </CardHeader>
            <CardContent>
              <ContainerDemo />
            </CardContent>
          </Card>

          {/* FOOTER */}
          <Card>
            <CardHeader>
              <CardTitle>Footer</CardTitle>
            </CardHeader>
            <CardContent>
              <FooterDemo />
            </CardContent>
          </Card>

          {/* HEADER */}
          <Card>
            <CardHeader><CardTitle>App Header</CardTitle></CardHeader>
            <CardContent><HeaderDemo /></CardContent>
          </Card>

          {/* PAGE NAVBAR */}
          <Card>
            <CardHeader><CardTitle>PageNavbar — line variant</CardTitle></CardHeader>
            <CardContent><PageNavbarDemo /></CardContent>
          </Card>

          {/* NAV PARTS */}
          <Card>
            <CardHeader><CardTitle>Nav parts — breadcrumbs, tabs, pills</CardTitle></CardHeader>
            <CardContent><NavPartsDemo /></CardContent>
          </Card>

          {/* FORM CONTROLS */}
          <Card>
            <CardHeader><CardTitle>Form controls — checkbox · radio · switch · select</CardTitle></CardHeader>
            <CardContent><FormControlsDemo /></CardContent>
          </Card>

          {/* INPUT ADDONS + STATES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Input addons</CardTitle></CardHeader>
              <CardContent><InputAddonsDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Input states</CardTitle></CardHeader>
              <CardContent><InputStatesDemo /></CardContent>
            </Card>
          </div>

          {/* POPOVER + HOVERCARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Popover — Filter</CardTitle></CardHeader>
              <CardContent><PopoverDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>HoverCard — @mention preview</CardTitle></CardHeader>
              <CardContent><HoverCardDemo /></CardContent>
            </Card>
          </div>

          {/* PATTERNS */}
          <Card>
            <CardHeader><CardTitle>Pattern — Toggle Settings List</CardTitle></CardHeader>
            <CardContent><ToggleSettingsList /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pattern — KPI Stat Row</CardTitle></CardHeader>
            <CardContent><KpiStatRow /></CardContent>
          </Card>

          {/* PROGRESS */}
          <Card>
            <CardHeader><CardTitle>Progress bars + Stepper</CardTitle></CardHeader>
            <CardContent><ProgressDemo /></CardContent>
          </Card>

          {/* SIDEBAR */}
          <Card>
            <CardHeader><CardTitle>Sidebar — Comply dark</CardTitle></CardHeader>
            <CardContent><SidebarDemo /></CardContent>
          </Card>

          {/* SETTINGS KV */}
          <Card>
            <CardHeader><CardTitle>Settings — Key/Value table</CardTitle></CardHeader>
            <CardContent><SettingsKvTable /></CardContent>
          </Card>

          {/* SHEET + SEPARATOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Sheet — width variants</CardTitle></CardHeader>
              <CardContent><SheetDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Separator</CardTitle></CardHeader>
              <CardContent><SeparatorDemo /></CardContent>
            </Card>
          </div>

          {/* RATING + SKELETON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Rating — stars</CardTitle></CardHeader>
              <CardContent><RatingDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Skeleton — loading shimmer</CardTitle></CardHeader>
              <CardContent><SkeletonDemo /></CardContent>
            </Card>
          </div>

          {/* SCROLL AREA */}
          <Card>
            <CardHeader><CardTitle>ScrollArea + custom scrollbar</CardTitle></CardHeader>
            <CardContent><ScrollAreaDemo /></CardContent>
          </Card>

          {/* STAT CARDS */}
          <Card>
            <CardHeader><CardTitle>Stat cards · KPI tiles</CardTitle></CardHeader>
            <CardContent><StatCardRow /></CardContent>
          </Card>

          {/* CARD ANATOMY + RADIUS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Card anatomy</CardTitle></CardHeader>
              <CardContent><CardAnatomy /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Radius scale</CardTitle></CardHeader>
              <CardContent><RadiusScale /></CardContent>
            </Card>
          </div>

          {/* SHADOWS */}
          <Card>
            <CardHeader><CardTitle>Shadow scale</CardTitle></CardHeader>
            <CardContent><ShadowScale /></CardContent>
          </Card>

          {/* STEPPER */}
          <Card>
            <CardHeader><CardTitle>Stepper — 5 steps · 2 done / 1 current</CardTitle></CardHeader>
            <CardContent><StepperDemo /></CardContent>
          </Card>

          {/* TABS */}
          <Card>
            <CardHeader><CardTitle>Tabs — default · button · line</CardTitle></CardHeader>
            <CardContent><TabsDemo /></CardContent>
          </Card>

          {/* TOGGLE GROUP + SLIDER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Toggle group</CardTitle></CardHeader>
              <CardContent><ToggleGroupDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Slider — single + range</CardTitle></CardHeader>
              <CardContent><SliderDemo /></CardContent>
            </Card>
          </div>

          {/* TOOLTIP + TOAST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Tooltip</CardTitle></CardHeader>
              <CardContent><TooltipDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Toast — Sonner</CardTitle></CardHeader>
              <CardContent><ToastDemo /></CardContent>
            </Card>
          </div>

          {/* TEXTAREA */}
          <Card>
            <CardHeader><CardTitle>Textarea</CardTitle></CardHeader>
            <CardContent><TextareaDemo /></CardContent>
          </Card>

          {/* RISK MATRIX */}
          <Card>
            <CardHeader><CardTitle>Risk Matrix — 5×5 (Likelihood × Impact)</CardTitle></CardHeader>
            <CardContent><RiskMatrixDemo /></CardContent>
          </Card>

          {/* CHARTS */}
          <Card>
            <CardHeader><CardTitle>Charts — Recharts</CardTitle></CardHeader>
            <CardContent><ChartsDemo /></CardContent>
          </Card>

          {/* TABLE + PAGINATION */}
          <Card>
            <CardHeader><CardTitle>Table + Pagination</CardTitle></CardHeader>
            <CardContent><TablePaginationDemo /></CardContent>
          </Card>

          {/* COMBOBOX + DATEPICKER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Combobox — searchable select</CardTitle></CardHeader>
              <CardContent><ComboboxDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Date Picker — single</CardTitle></CardHeader>
              <CardContent><DatePickerDemo /></CardContent>
            </Card>
          </div>

          {/* MULTI-SELECT + FILE UPLOAD */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Multi-select — chips</CardTitle></CardHeader>
              <CardContent><MultiSelectDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>File Upload — dropzone</CardTitle></CardHeader>
              <CardContent><FileUploadDemo /></CardContent>
            </Card>
          </div>

          {/* FOUNDATIONS — Batch 10 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Spacing — scale swatch</CardTitle></CardHeader>
              <CardContent><SpacingScale /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Z-index — layer stack</CardTitle></CardHeader>
              <CardContent><ZIndexLayers /></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Motion — duration tokens</CardTitle></CardHeader>
              <CardContent><MotionDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Icons — sizes & reference</CardTitle></CardHeader>
              <CardContent><IconReference /></CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Accessibility — WCAG 2.2 AA</CardTitle></CardHeader>
            <CardContent><A11yGuide /></CardContent>
          </Card>

          {/* COMPONENTS — Batch 10 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Tag Input — chips with keyboard</CardTitle></CardHeader>
              <CardContent><TagInputDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Timeline — audit events</CardTitle></CardHeader>
              <CardContent><TimelineDemo /></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>Drawer — bottom sheet (vaul)</CardTitle></CardHeader>
              <CardContent><DrawerDemo /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Code Block — copy</CardTitle></CardHeader>
              <CardContent><CodeBlockDemo /></CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Diff Viewer — YAML changes</CardTitle></CardHeader>
            <CardContent><DiffViewerDemo /></CardContent>
          </Card>

          {/* CISO PATTERNS — Batch 11 */}
          <Card>
            <CardHeader><CardTitle>Layout container options — 4 samples</CardTitle></CardHeader>
            <CardContent><LayoutOptionsDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Compliance — score gauges</CardTitle></CardHeader>
            <CardContent><ComplianceGaugeDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Control Mapping — framework ↔ control</CardTitle></CardHeader>
            <CardContent><ControlMappingDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Evidence — standard card</CardTitle></CardHeader>
            <CardContent><EvidenceCardDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Severity Scale — Critical → Info</CardTitle></CardHeader>
            <CardContent><SeverityScaleDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Page Templates · V1 — List · Detail · Dashboard · Settings · Empty · 404 · 500</CardTitle></CardHeader>
            <CardContent><PageTemplatesDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Page Templates · V2 — alternative layouts</CardTitle></CardHeader>
            <CardContent><PageTemplatesV2Demo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Page Templates · V3 — Enterprise (full app shell)</CardTitle></CardHeader>
            <CardContent><PageTemplatesV3Demo /></CardContent>
          </Card>

          {/* BATCH 12 — extra primitives */}
          <Card>
            <CardHeader><CardTitle>Navigation Rail — compact vertical nav</CardTitle></CardHeader>
            <CardContent><NavigationRailDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Status Ring — circular progress</CardTitle></CardHeader>
            <CardContent><StatusRingDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Accordion Menu — collapsible nav groups</CardTitle></CardHeader>
            <CardContent><AccordionMenuDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Comment Thread — threaded discussion</CardTitle></CardHeader>
            <CardContent><CommentThreadDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Skeleton with Pattern — composed placeholders</CardTitle></CardHeader>
            <CardContent><SkeletonWithPatternDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Translated Form Message — bilingual AR/EN validation</CardTitle></CardHeader>
            <CardContent><TranslatedFormMessageDemo /></CardContent>
          </Card>

          {/* BATCH 13 — Typography specimens (from Figma imports) */}
          <Card>
            <CardHeader><CardTitle>Type · Display — Hero / H1 / H2</CardTitle></CardHeader>
            <CardContent><DisplayTypeDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Type · Body — lg / md / base / sm / overline</CardTitle></CardHeader>
            <CardContent><BodyTypeDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Type · Weights — 300 → 700</CardTitle></CardHeader>
            <CardContent><WeightsTypeDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Type · Mono — stat / code / IDs</CardTitle></CardHeader>
            <CardContent><MonoTypeDemo /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Type · Arabic (Cairo) — RTL H1 · body · badge</CardTitle></CardHeader>
            <CardContent><ArabicTypeDemo /></CardContent>
          </Card>

          {/* AUTH FLOW */}
          <Card>
            <CardHeader>
              <CardTitle>Auth — 4 flows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="flex items-start justify-center"><SignInCard /></div>
                <div className="flex items-start justify-center"><SignUpCard /></div>
                <div className="flex items-start justify-center"><TwoFactorCard /></div>
                <div className="flex items-start justify-center"><ResetPasswordCard /></div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

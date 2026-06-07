import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  HelpCircle,
  Languages,
  Clock,
  Sparkles,
  CheckCircle2,
  Edit3,
  ArrowRight,
  Keyboard,
  ShieldCheck,
  Circle,
  CircleDot,
  Save,
  SkipForward,
  ListChecks,
  LayoutGrid,
  Gauge,
  MoreVertical,
} from "lucide-react";
import { Progress } from "../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { MButton } from "../components/showcase/_shared/MetronicButton";
import { MBadge } from "../components/showcase/_shared/MetronicBadge";

/* ───────────────────────── i18n ───────────────────────── */
type Lang = "ar" | "en";
const T = {
  ar: {
    title: "التقييم السريع",
    subtitle: "خط الأساس للامتثال عبر 5 أُطر",
    qCounter: (c: number, t: number) => `سؤال ${c} / ${t}`,
    defaultHint: "اختر ما يصف حالة مؤسستك حالياً.",
    kbdHint: "[1][2][3][4] للإجابة · → للتالي · ← للسابق · Esc للخروج",
    timeLeft: (m: number) => `~${m} د متبقية`,
    notCovered: "غير مغطّى",
    prev: "السابق", next: "التالي", skip: "تخطّي", finish: "إنهاء",
    exitTitle: "حفظ والخروج؟",
    exitDesc: (a: number) => `${a} إجابة محفوظة. يمكنك الاستئناف لاحقاً.`,
    exitContinue: "متابعة", exitSave: "حفظ والخروج",
    doneTitle: "اكتمل التقييم",
    doneDesc: "خط الأساس جاهز. راجع إجاباتك أو انتقل للتقييم التفصيلي.",
    reviewAnswers: "مراجعة", startDetailed: "التقييم التفصيلي",
    reviewBanner: "وضع المراجعة", exitReview: "إنهاء المراجعة",
    answers: { YES: "نعم", NO: "لا", PARTIAL: "جزئي", DONT_KNOW: "لا أعرف" },
    answerHints: {
      YES: "مُطبَّق ومُوثَّق",
      NO: "غير مطبّق",
      PARTIAL: "تطبيق جزئي",
      DONT_KNOW: "يحتاج تحقّق",
    },
    domains: "المجالات",
    insights: "اللوحة التحليلية",
    tabScore: "النتيجة", tabDomains: "المجالات", tabIndex: "الفهرس",
    coverage: "التغطية", domain: "المجال", question: "السؤال",
    overall: "الإجمالي", baseline: "خط الأساس للقطاع",
    statusGood: "جيد", statusMid: "متوسط", statusLow: "منخفض",
    save: "حفظ المسودة", language: "اللغة",
    progress: "التقدم", answered: "مُجاب",
    of: "من",
  },
  en: {
    title: "Quick Assessment",
    subtitle: "Compliance baseline across 5 frameworks",
    qCounter: (c: number, t: number) => `Question ${c} / ${t}`,
    defaultHint: "Pick what best describes your organization today.",
    kbdHint: "[1][2][3][4] answer · → next · ← prev · Esc to exit",
    timeLeft: (m: number) => `~${m}m left`,
    notCovered: "Not covered",
    prev: "Previous", next: "Next", skip: "Skip", finish: "Finish",
    exitTitle: "Save & Exit?",
    exitDesc: (a: number) => `${a} answers saved. You can resume anytime.`,
    exitContinue: "Continue", exitSave: "Save & Exit",
    doneTitle: "Assessment Complete",
    doneDesc: "Baseline ready. Review your answers or move to the detailed assessment.",
    reviewAnswers: "Review", startDetailed: "Detailed Assessment",
    reviewBanner: "Review mode", exitReview: "Exit review",
    answers: { YES: "Yes", NO: "No", PARTIAL: "Partial", DONT_KNOW: "Don't Know" },
    answerHints: {
      YES: "Implemented & documented",
      NO: "Not implemented",
      PARTIAL: "Partial implementation",
      DONT_KNOW: "Needs verification",
    },
    domains: "Domains",
    insights: "Insights",
    tabScore: "Score", tabDomains: "Domains", tabIndex: "Index",
    coverage: "Coverage", domain: "Domain", question: "Question",
    overall: "Overall", baseline: "Industry baseline",
    statusGood: "Good", statusMid: "Fair", statusLow: "Low",
    save: "Save draft", language: "Language",
    progress: "Progress", answered: "answered",
    of: "of",
  },
} as const;

/* ───────────────────────── Data ───────────────────────── */
type Ans = "YES" | "NO" | "PARTIAL" | "DONT_KNOW";
const ANS_ORDER: Ans[] = ["YES", "PARTIAL", "NO", "DONT_KNOW"];

const FRAMEWORKS = [
  { id: "NCA",  short: "NCA ECC",   color: "var(--color-sev-info)" },
  { id: "SAMA", short: "SAMA",      color: "var(--color-sev-medium)" },
  { id: "ISO",  short: "ISO 27001", color: "var(--color-sev-low)" },
  { id: "PDPL", short: "PDPL",      color: "var(--color-sev-high)" },
  { id: "NIST", short: "NIST CSF",  color: "var(--color-sev-critical)" },
];

const DOMAINS_AR = [
  "الحوكمة", "إدارة المخاطر", "إدارة الأصول", "التحكم بالوصول",
  "التشفير", "الأمن المادي", "أمن العمليات", "أمن الاتصالات",
  "اقتناء الأنظمة", "إدارة الحوادث", "استمرارية الأعمال",
];
const DOMAINS_EN = [
  "Governance", "Risk Mgmt", "Asset Mgmt", "Access Control",
  "Cryptography", "Physical Sec.", "Operations", "Communications",
  "Acquisition", "Incident Mgmt", "Business Continuity",
];

type Q = {
  id: string; domainIdx: number;
  ar: string; en: string;
  hintAr?: string; hintEn?: string;
  coverage: Record<string, boolean>;
};

function makeQuestions(): Q[] {
  const seeds = [
    { ar: "هل تم تعيين مسؤول أو إدارة مستقلة للأمن السيبراني؟", en: "Is there a dedicated cybersecurity officer or unit?" },
    { ar: "هل تُراجَع سياسات الأمن السيبراني دورياً؟", en: "Are cybersecurity policies reviewed periodically?",
      hintAr: "تشمل التحديث بناءً على المتغيرات التنظيمية والتقنية.", hintEn: "Includes updates based on regulatory & technical changes." },
    { ar: "هل تُدار الأصول المعلوماتية وتُصنَّف بانتظام؟", en: "Are information assets managed and classified regularly?" },
    { ar: "هل توجد عملية رسمية لإدارة الهويات والصلاحيات؟", en: "Is there a formal identity & access management process?" },
    { ar: "هل تُشفَّر البيانات الحساسة أثناء النقل والتخزين؟", en: "Is sensitive data encrypted in transit and at rest?" },
    { ar: "هل توجد ضوابط للأمن المادي للمناطق الحساسة؟", en: "Are physical security controls in place for sensitive areas?" },
    { ar: "هل تُراقب العمليات وتُدار السجلات الأمنية؟", en: "Are operations monitored and security logs managed?" },
    { ar: "هل توجد ضوابط لأمن الشبكات والاتصالات؟", en: "Are network & communications security controls in place?" },
    { ar: "هل يُدمج الأمن في دورة حياة اقتناء الأنظمة؟", en: "Is security integrated into the system acquisition lifecycle?" },
    { ar: "هل توجد خطة موثّقة للاستجابة للحوادث؟", en: "Is there a documented incident response plan?" },
    { ar: "هل تُختبر خطط استمرارية الأعمال دورياً؟", en: "Are business continuity plans tested periodically?" },
  ];
  const counts = [3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3];
  const out: Q[] = [];
  let qi = 0;
  counts.forEach((n, dIdx) => {
    for (let k = 0; k < n; k++) {
      const s = seeds[dIdx];
      out.push({
        id: `q${qi++}`, domainIdx: dIdx,
        ar: k === 0 ? s.ar : `${s.ar} (${k + 1})`,
        en: k === 0 ? s.en : `${s.en} (${k + 1})`,
        hintAr: s.hintAr, hintEn: s.hintEn,
        coverage: {
          NCA: dIdx !== 4, SAMA: dIdx < 8, ISO: true,
          PDPL: [0, 1, 3, 4, 9].includes(dIdx), NIST: dIdx !== 5,
        },
      });
    }
  });
  return out;
}

const QUESTIONS = makeQuestions();
const TOTAL = QUESTIONS.length;
const ANS_WEIGHT: Record<Ans, number> = { YES: 1, PARTIAL: 0.5, DONT_KNOW: 0, NO: 0 };

function scoreFor(answers: Record<string, Ans | undefined>, qIds: string[]) {
  let total = 0, answered = 0;
  qIds.forEach((id) => {
    const a = answers[id];
    if (a) { answered++; total += ANS_WEIGHT[a]; }
  });
  return { pct: answered ? Math.round((total / answered) * 100) : 0, answered };
}
function statusOf(pct: number) {
  if (pct >= 70) return { key: "good", color: "var(--color-sev-low)" };
  if (pct >= 40) return { key: "mid",  color: "var(--color-sev-medium)" };
  return { key: "low", color: "var(--color-sev-critical)" };
}

/* ───────────────────────── Pieces ───────────────────────── */

function DomainRail({
  domainNames, current, answers, onJump, t,
}: {
  domainNames: string[];
  current: number;
  answers: Record<string, Ans | undefined>;
  onJump: (qIdx: number) => void;
  t: typeof T["ar"];
}) {
  const currentDomain = QUESTIONS[current].domainIdx;
  return (
    <div className="rounded-xl border border-border bg-card flex flex-col" style={{ boxShadow: "var(--shadow-xs)" }}>
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <LayoutGrid className="size-4 text-muted-foreground" />
        <h4>{t.domains}</h4>
      </div>
      <ol className="flex flex-col p-2">
        {domainNames.map((name, idx) => {
          const ids = QUESTIONS.filter((q) => q.domainIdx === idx).map((q) => q.id);
          const firstQIdx = QUESTIONS.findIndex((q) => q.domainIdx === idx);
          const { pct, answered } = scoreFor(answers, ids);
          const complete = answered === ids.length;
          const isActive = idx === currentDomain;
          const st = statusOf(pct);
          return (
            <li key={idx}>
              <button
                onClick={() => onJump(firstQIdx)}
                className="w-full text-start rounded-lg px-3 py-2.5 flex items-center gap-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  background: isActive ? "var(--accent)" : undefined,
                }}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className="flex items-center justify-center rounded-full shrink-0 font-mono tabular-nums text-[11px]"
                  style={{
                    width: 22, height: 22,
                    background: complete ? st.color : isActive ? "var(--primary)" : "var(--muted)",
                    color: complete || isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {complete ? <Check className="size-3" /> : idx + 1}
                </span>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="truncate">{name}</span>
                  <span className="text-muted-foreground tabular-nums text-[11px]">
                    {answered}/{ids.length}
                  </span>
                </div>
                {answered > 0 && (
                  <span
                    className="font-mono tabular-nums text-[11px]"
                    style={{ color: complete ? st.color : "var(--muted-foreground)" }}
                  >
                    {pct}%
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AnswerOption({
  ans, label, hint, num, selected, onClick, dir,
}: {
  ans: Ans; label: string; hint: string; num: number;
  selected: boolean; onClick: () => void; dir: "ltr" | "rtl";
}) {
  const accent: Record<Ans, string> = {
    YES: "var(--color-sev-low)",
    PARTIAL: "var(--color-sev-medium)",
    NO: "var(--color-sev-critical)",
    DONT_KNOW: "var(--muted-foreground)",
  };
  return (
    <button
      onClick={onClick}
      dir={dir}
      className="group relative w-full text-start rounded-lg border bg-card p-4 transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      style={{
        borderColor: selected ? accent[ans] : "var(--border)",
        background: selected ? `color-mix(in srgb, ${accent[ans]} 6%, var(--card))` : undefined,
        boxShadow: selected ? `0 0 0 1px ${accent[ans]} inset` : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex items-center justify-center rounded-md font-mono shrink-0 text-[12px]"
          style={{
            width: 28, height: 28,
            background: selected ? accent[ans] : "var(--muted)",
            color: selected ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
        >
          {num}
        </span>
        <div className="flex-1 flex flex-col gap-0.5">
          <span>{label}</span>
          <span className="text-muted-foreground text-[12px]">{hint}</span>
        </div>
        {selected ? (
          <CircleDot className="size-4" style={{ color: accent[ans] }} />
        ) : (
          <Circle className="size-4 text-muted-foreground/40" />
        )}
      </div>
    </button>
  );
}

function CoverageRow({ q, t }: { q: Q; t: typeof T["ar"] }) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-muted-foreground text-[11px]">{t.coverage}</span>
        <Separator orientation="vertical" className="h-4" />
        {FRAMEWORKS.map((fw) => {
          const covered = q.coverage[fw.id];
          return (
            <Tooltip key={fw.id}>
              <TooltipTrigger asChild>
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px]"
                  style={{
                    color: covered ? fw.color : "var(--muted-foreground)",
                    opacity: covered ? 1 : 0.5,
                    textDecoration: covered ? "none" : "line-through",
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: covered ? fw.color : "var(--muted-foreground)" }}
                  />
                  {fw.short}
                </span>
              </TooltipTrigger>
              {!covered && <TooltipContent>{t.notCovered}</TooltipContent>}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function ScorePanel({ answers, t }: { answers: Record<string, Ans | undefined>; t: typeof T["ar"] }) {
  const fwScores = FRAMEWORKS.map((fw) => {
    const ids = QUESTIONS.filter((q) => q.coverage[fw.id]).map((q) => q.id);
    return { fw, ...scoreFor(answers, ids) };
  });
  const overall = Math.round(fwScores.reduce((s, f) => s + f.pct, 0) / fwScores.length);
  const ost = statusOf(overall);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-lg bg-muted p-4 flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-[11px]">{t.overall}</span>
        <span
          className="font-mono tabular-nums text-[32px]"
          style={{ color: ost.color, fontWeight: "var(--font-weight-bold)" }}
        >
          {overall}%
        </span>
        <span className="text-muted-foreground text-[11px]">
          {t.baseline} ~62%
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {fwScores.map(({ fw, pct, answered }) => {
          const st = statusOf(pct);
          return (
            <div key={fw.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: fw.color }} />
                  {fw.short}
                </span>
                <span className="font-mono tabular-nums" style={{ color: answered ? st.color : "var(--muted-foreground)" }}>
                  {answered ? `${pct}%` : "—"}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: st.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DomainsPanel({
  answers, t, domainNames,
}: { answers: Record<string, Ans | undefined>; t: typeof T["ar"]; domainNames: string[] }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      {domainNames.map((name, idx) => {
        const ids = QUESTIONS.filter((q) => q.domainIdx === idx).map((q) => q.id);
        const { pct, answered } = scoreFor(answers, ids);
        const st = statusOf(pct);
        const complete = answered === ids.length;
        return (
          <div key={idx} className="rounded-lg border border-border p-2.5 flex flex-col gap-1.5"
            style={{
              borderColor: complete ? st.color : "var(--border)",
              background: complete ? `color-mix(in srgb, ${st.color} 5%, var(--card))` : "var(--card)",
            }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] truncate">{name}</span>
              {complete && <CheckCircle2 className="size-3.5" style={{ color: st.color }} />}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden me-2">
                <div className="h-full" style={{ width: `${pct}%`, background: st.color }} />
              </div>
              <span className="font-mono tabular-nums text-[11px]"
                style={{ color: answered ? st.color : "var(--muted-foreground)" }}>
                {answered ? `${pct}%` : "—"}
              </span>
              <span className="text-muted-foreground font-mono ms-2 text-[10px]">{answered}/{ids.length}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IndexPanel({
  answers, current, onJump,
}: {
  answers: Record<string, Ans | undefined>; current: number; onJump: (i: number) => void;
}) {
  return (
    <div className="p-4 flex flex-wrap gap-1.5">
      {QUESTIONS.map((q, i) => {
        const a = answers[q.id];
        const isCur = i === current;
        let bg = "var(--muted)";
        let fg = "var(--muted-foreground)";
        if (a === "YES") { bg = "var(--color-sev-low)"; fg = "var(--primary-foreground)"; }
        else if (a === "PARTIAL") { bg = "var(--color-sev-medium)"; fg = "var(--primary-foreground)"; }
        else if (a === "NO") { bg = "var(--color-sev-critical)"; fg = "var(--primary-foreground)"; }
        else if (a === "DONT_KNOW") { bg = "var(--muted-foreground)"; fg = "var(--primary-foreground)"; }
        return (
          <button
            key={q.id}
            onClick={() => onJump(i)}
            className="rounded-md font-mono tabular-nums transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-[11px]"
            style={{
              width: 28, height: 28,
              background: bg, color: fg,
              outline: isCur ? "2px solid var(--primary)" : "none",
              outlineOffset: 2,
            }}
            aria-label={`Question ${i + 1}${a ? ` · ${a}` : ""}`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Completion ───────────────────────── */
function CompletionScreen({
  answers, t, lang, onReview, onExit,
}: {
  answers: Record<string, Ans | undefined>;
  t: typeof T["ar"]; lang: Lang;
  onReview: () => void; onExit: () => void;
}) {
  const fwScores = FRAMEWORKS.map((fw) => {
    const ids = QUESTIONS.filter((q) => q.coverage[fw.id]).map((q) => q.id);
    return { fw, ...scoreFor(answers, ids) };
  });
  const overall = Math.round(fwScores.reduce((s, f) => s + f.pct, 0) / fwScores.length);
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="w-full max-w-2xl rounded-xl bg-card border border-border p-8 flex flex-col gap-6"
        style={{ boxShadow: "var(--shadow-xl)" }}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "color-mix(in srgb, var(--color-sev-low) 15%, transparent)" }}>
            <CheckCircle2 className="size-8" style={{ color: "var(--color-sev-low)" }} />
          </div>
          <h2>{t.doneTitle}</h2>
          <p className="text-muted-foreground" style={{ maxWidth: 480 }}>{t.doneDesc}</p>
        </div>
        <div className="rounded-xl bg-muted p-5 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground text-[12px]">{t.overall}</span>
            <span className="font-mono tabular-nums text-[32px]"
              style={{ color: statusOf(overall).color, fontWeight: "var(--font-weight-bold)" }}>
              {overall}%
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fwScores.map(({ fw, pct }) => (
              <div key={fw.id} className="flex items-center justify-between rounded-md bg-card p-2.5 border border-border">
                <span className="text-[12px]">{fw.short}</span>
                <span className="font-mono tabular-nums" style={{ color: statusOf(pct).color }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <MButton variant="outline" onClick={onReview} className="flex-1">
            <Edit3 /> {t.reviewAnswers}
          </MButton>
          <MButton variant="primary" onClick={onExit} className="flex-1">
            {t.startDetailed} <ArrowRight />
          </MButton>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Main ───────────────────────── */
export default function QuickAssessmentV2() {
  const navigate = useNavigate();
  const [uiLang, setUiLang] = useState<Lang>("ar");
  const [qLang, setQLang] = useState<Lang>("ar");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Ans | undefined>>({});
  const [exitOpen, setExitOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"score" | "domains" | "index">("score");

  const t = T[uiLang];
  const dir: "ltr" | "rtl" = uiLang === "ar" ? "rtl" : "ltr";
  const domainNames = uiLang === "ar" ? DOMAINS_AR : DOMAINS_EN;

  const q = QUESTIONS[current];
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = (answeredCount / TOTAL) * 100;
  const allAnswered = answeredCount === TOTAL;
  const minLeft = Math.max(1, Math.round((TOTAL - answeredCount) * 0.5));

  const fwScores = useMemo(() =>
    FRAMEWORKS.map((fw) => {
      const ids = QUESTIONS.filter((qq) => qq.coverage[fw.id]).map((qq) => qq.id);
      return { fw, ...scoreFor(answers, ids) };
    }), [answers]);
  const overall = useMemo(() =>
    Math.round(fwScores.reduce((s, f) => s + f.pct, 0) / fwScores.length), [fwScores]);

  const handleAnswer = useCallback((ans: Ans) => {
    setAnswers((prev) => ({ ...prev, [q.id]: ans }));
    if (!reviewMode) {
      setTimeout(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), 350);
    }
  }, [q.id, reviewMode]);

  const goNext = useCallback(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), []);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);

  useEffect(() => {
    if (completed) return;
    const handler = (e: KeyboardEvent) => {
      if (exitOpen) return;
      if (e.key === "1") handleAnswer("YES");
      else if (e.key === "2") handleAnswer("PARTIAL");
      else if (e.key === "3") handleAnswer("NO");
      else if (e.key === "4") handleAnswer("DONT_KNOW");
      else if (e.key === "Enter" || e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft" || e.key === "Backspace") goPrev();
      else if (e.key === "Escape") setExitOpen(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleAnswer, goNext, goPrev, exitOpen, completed]);

  if (completed && !reviewMode) {
    return (
      <CompletionScreen
        answers={answers} t={t} lang={uiLang}
        onReview={() => { setReviewMode(true); setCompleted(false); setCurrent(0); }}
        onExit={() => navigate("/")}
      />
    );
  }

  const qText = qLang === "ar" ? q.ar : q.en;
  const qHint = qLang === "ar" ? q.hintAr : q.hintEn;
  const domainLabel = domainNames[q.domainIdx];
  const currentAns = answers[q.id];
  const ost = statusOf(overall);

  return (
    <div dir={dir}>
      <div className="min-h-screen bg-muted text-foreground flex flex-col">
        {/* HEADER */}
        <header
          className="bg-background border-b border-border sticky top-0 flex items-center px-5 gap-4"
          style={{ height: "var(--topbar-height)", zIndex: "var(--z-header)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)" }}>
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <h4>{t.title}</h4>
              <span className="text-muted-foreground text-[11px]">{t.subtitle}</span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6 mx-2 hidden md:block" />

          <nav className="hidden md:flex items-center gap-2 text-muted-foreground text-[12px]" aria-label="breadcrumb">
            <span>{t.domain}</span>
            <ChevronRight className="size-3.5 rtl:rotate-180" />
            <span className="text-foreground">{domainLabel}</span>
            <ChevronRight className="size-3.5 rtl:rotate-180" />
            <span className="font-mono tabular-nums">{t.qCounter(current + 1, TOTAL)}</span>
          </nav>

          <div className="ms-auto flex items-center gap-2">
            <MBadge appearance="light" color={ost.key === "good" ? "success" : ost.key === "mid" ? "warning" : "destructive"} size="sm">
              {t.overall} {overall}%
            </MBadge>
            <div className="hidden md:flex items-center gap-1.5 text-muted-foreground text-[11px]">
              <Clock className="size-3.5" />
              <span>{t.timeLeft(minLeft)}</span>
            </div>
            <MButton variant="outline" size="sm" onClick={() => setUiLang(uiLang === "ar" ? "en" : "ar")}>
              <Languages />
              {uiLang === "ar" ? "EN" : "AR"}
            </MButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MButton variant="ghost" size="icon" aria-label="More">
                  <MoreVertical />
                </MButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setQLang(qLang === "ar" ? "en" : "ar")}>
                  <Languages className="me-2 size-4" />
                  {t.language}: {qLang === "ar" ? "ع" : "EN"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Save className="me-2 size-4" />
                  {t.save}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setExitOpen(true)}>
                  <X className="me-2 size-4" />
                  {t.exitSave}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* PROGRESS STRIP */}
        <div className="bg-background border-b border-border px-5 py-2 flex items-center gap-3">
          <span className="text-muted-foreground tabular-nums text-[11px]">
            {answeredCount} {t.of} {TOTAL} {t.answered}
          </span>
          <Progress value={progress} className="h-1.5 flex-1" />
          <span className="font-mono tabular-nums text-[11px]">{Math.round(progress)}%</span>
        </div>

        {reviewMode && (
          <div className="px-5 py-2 flex items-center justify-center gap-3 border-b border-border text-[12px]"
            style={{ background: "color-mix(in srgb, var(--color-sev-medium) 12%, var(--card))" }}>
            <Edit3 className="size-4" style={{ color: "var(--color-sev-medium)" }} />
            <span>{t.reviewBanner}</span>
            <MButton variant="outline" size="sm" onClick={() => { setReviewMode(false); setCompleted(true); }}>
              {t.exitReview}
            </MButton>
          </div>
        )}

        {/* MAIN — 3 columns */}
        <main
          className="flex-1 mx-auto w-full p-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] gap-5 pb-24"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* LEFT — domain rail */}
          <aside className="hidden lg:block lg:sticky lg:self-start" style={{ top: "calc(var(--topbar-height) + 60px)" }}>
            <DomainRail
              domainNames={domainNames}
              current={current}
              answers={answers}
              onJump={setCurrent}
              t={t}
            />
          </aside>

          {/* CENTER — question */}
          <section className="flex flex-col gap-4 min-w-0">
            <div className="rounded-xl bg-card border border-border p-6 lg:p-8 flex flex-col gap-5"
              style={{ boxShadow: "var(--shadow-sm)" }}>
              {/* Metadata strip */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <MBadge appearance="light" color="primary" size="sm">
                    {domainLabel}
                  </MBadge>
                  <span className="font-mono tabular-nums text-muted-foreground text-[11px]">
                    {q.id.toUpperCase()}
                  </span>
                </div>
                <MButton variant="ghost" size="sm" onClick={() => setQLang(qLang === "ar" ? "en" : "ar")}>
                  <Languages />
                  {qLang === "ar" ? "EN" : "ع"}
                </MButton>
              </div>

              <CoverageRow q={q} t={t} />

              {/* Question */}
              <div className="flex flex-col gap-2" dir={qLang === "ar" ? "rtl" : "ltr"}>
                <span className="text-muted-foreground font-mono tabular-nums text-[11px]">
                  {t.question} {current + 1}/{TOTAL}
                </span>
                <h2>{qText}</h2>
                {qHint ? (
                  <div className="flex gap-2 items-start text-muted-foreground">
                    <HelpCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{qHint}</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t.defaultHint}</p>
                )}
              </div>

              {/* Answers — vertical for clarity */}
              <div className="flex flex-col gap-2">
                {ANS_ORDER.map((ans, i) => (
                  <AnswerOption
                    key={ans}
                    ans={ans}
                    label={t.answers[ans]}
                    hint={t.answerHints[ans]}
                    num={i + 1}
                    selected={currentAns === ans}
                    onClick={() => handleAnswer(ans)}
                    dir={dir}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                <Keyboard className="size-3.5" />
                <span>{t.kbdHint}</span>
              </div>
            </div>
          </section>

          {/* RIGHT — tabbed insights */}
          <aside className="lg:sticky lg:self-start" style={{ top: "calc(var(--topbar-height) + 60px)" }}>
            <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-xs)" }}>
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <Gauge className="size-4 text-muted-foreground" />
                <h4>{t.insights}</h4>
                <MBadge appearance="light" color="primary" size="xs" className="ms-auto">
                  {answeredCount}/{TOTAL}
                </MBadge>
              </div>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0 h-auto">
                  <TabsTrigger value="score" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                    <Sparkles className="size-3.5 me-1.5" />
                    {t.tabScore}
                  </TabsTrigger>
                  <TabsTrigger value="domains" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                    <LayoutGrid className="size-3.5 me-1.5" />
                    {t.tabDomains}
                  </TabsTrigger>
                  <TabsTrigger value="index" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                    <ListChecks className="size-3.5 me-1.5" />
                    {t.tabIndex}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="score" className="m-0">
                  <ScorePanel answers={answers} t={t} />
                </TabsContent>
                <TabsContent value="domains" className="m-0">
                  <DomainsPanel answers={answers} t={t} domainNames={domainNames} />
                </TabsContent>
                <TabsContent value="index" className="m-0">
                  <IndexPanel answers={answers} current={current} onJump={setCurrent} />
                </TabsContent>
              </Tabs>
            </div>
          </aside>
        </main>

        {/* FIXED ACTION BAR */}
        <div
          className="fixed bottom-0 inset-x-0 bg-background border-t border-border"
          style={{ zIndex: "var(--z-sticky)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="mx-auto flex items-center gap-3 px-5 py-3"
            style={{ maxWidth: "var(--content-max-width)" }}>
            <MButton variant="outline" onClick={goPrev} disabled={current === 0}>
              {dir === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              {t.prev}
            </MButton>
            <MButton variant="ghost" onClick={goNext} disabled={current === TOTAL - 1}>
              <SkipForward />
              {t.skip}
            </MButton>
            <div className="ms-auto flex items-center gap-3">
              <span className="hidden sm:inline text-muted-foreground tabular-nums text-[11px]">
                {t.qCounter(current + 1, TOTAL)}
              </span>
              {allAnswered ? (
                <MButton variant="primary" onClick={() => setCompleted(true)}>
                  <Check />
                  {t.finish}
                </MButton>
              ) : (
                <MButton variant="primary" onClick={goNext} disabled={!currentAns || current === TOTAL - 1}>
                  {t.next}
                  {dir === "rtl" ? <ChevronLeft /> : <ChevronRight />}
                </MButton>
              )}
            </div>
          </div>
        </div>

        {/* Exit dialog */}
        <Dialog open={exitOpen} onOpenChange={setExitOpen}>
          <DialogContent className="max-w-[420px]">
            <DialogHeader>
              <DialogTitle>{t.exitTitle}</DialogTitle>
              <DialogDescription>{t.exitDesc(answeredCount)}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <MButton variant="outline" onClick={() => setExitOpen(false)}>
                {t.exitContinue}
              </MButton>
              <MButton variant="primary" onClick={() => navigate("/")}>
                {t.exitSave}
              </MButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

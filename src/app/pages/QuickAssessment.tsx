import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router";
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
  RotateCcw,
  Edit3,
  ArrowRight,
  Keyboard,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
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
import { MButton } from "../components/showcase/_shared/MetronicButton";
import { MBadge } from "../components/showcase/_shared/MetronicBadge";

/* ───────────────────────── i18n strings ───────────────────────── */
type Lang = "ar" | "en";
const T = {
  ar: {
    title: "التقييم السريع",
    qCounter: (c: number, t: number) => `السؤال ${c} من ${t}`,
    defaultHint: "اختر الإجابة التي تصف حالة مؤسستك الحالية بشكل أفضل.",
    kbdHint: "[1][2][3][4] للإجابة · Enter للتالي",
    timeLeft: (m: number) => `~${m} د متبقّية`,
    notCovered: "هذا السؤال لا يُغطّي هذا الإطار",
    prev: "السابق",
    next: "التالي",
    finish: "إنهاء التقييم",
    exitTitle: "حفظ والخروج؟",
    exitDesc: (a: number) => `${a} إجابة محفوظة. يمكنك الاستئناف في أي وقت.`,
    exitContinue: "متابعة",
    exitSave: "حفظ والخروج",
    resumed: "تم الاستكمال من آخر نقطة",
    doneTitle: "اكتمل التقييم السريع",
    doneDesc: "أكملت التقييم السريع. يمكنك مراجعة إجاباتك أو الانتقال إلى التقييم التفصيلي.",
    reviewAnswers: "مراجعة الإجابات",
    startDetailed: "بدء التقييم التفصيلي",
    reviewBanner: "أنت في وضع المراجعة — راجع إجاباتك وعدّل ما تشاء",
    exitReview: "إنهاء المراجعة",
    indexProgress: (a: number, t: number) => `${a} من ${t} تمت الإجابة`,
    answers: { YES: "نعم", NO: "لا", PARTIAL: "جزئي", DONT_KNOW: "لا أعرف" },
    live: "النتيجة الحيّة",
    domain: "المجال",
    domainScore: "نتيجة المجال",
    baseline: "تقدير مبدئي",
    baselineDesc: (p: number) => `منظمات بحجمك في قطاعك عادةً عند ~${p}%`,
    domainDone: "اكتمل المجال",
    coverage: "تغطية الأُطر",
    index: "الفهرس",
    exit: "خروج",
    answeredOf: (a: number, t: number) => `${a} / ${t}`,
    statusGood: "جيد", statusMid: "متوسط", statusLow: "منخفض",
    dismiss: "إغلاق",
  },
  en: {
    title: "Quick Assessment",
    qCounter: (c: number, t: number) => `Question ${c} of ${t}`,
    defaultHint: "Select the answer that best describes your organization's current state.",
    kbdHint: "[1][2][3][4] to answer · Enter for next",
    timeLeft: (m: number) => `~${m} min remaining`,
    notCovered: "This question does not cover this framework",
    prev: "Previous",
    next: "Next",
    finish: "Finish Assessment",
    exitTitle: "Save & Exit?",
    exitDesc: (a: number) => `${a} answers saved. You can resume anytime.`,
    exitContinue: "Continue",
    exitSave: "Save & Exit",
    resumed: "Resumed from last saved point",
    doneTitle: "Quick Assessment Completed",
    doneDesc: "You have completed the quick assessment. You can review your answers or move to the detailed assessment for higher accuracy.",
    reviewAnswers: "Review Answers",
    startDetailed: "Start Detailed Assessment",
    reviewBanner: "You're in review mode — go through your answers and edit anything you need to",
    exitReview: "Exit review",
    indexProgress: (a: number, t: number) => `${a} of ${t} answered`,
    answers: { YES: "Yes", NO: "No", PARTIAL: "Partial", DONT_KNOW: "Don't Know" },
    live: "Live Score",
    domain: "Domain",
    domainScore: "Domain score",
    baseline: "Baseline estimate",
    baselineDesc: (p: number) => `Organizations like yours typically score ~${p}%`,
    domainDone: "Domain complete",
    coverage: "Framework coverage",
    index: "Index",
    exit: "Exit",
    answeredOf: (a: number, t: number) => `${a} / ${t}`,
    statusGood: "Good", statusMid: "Fair", statusLow: "Low",
    dismiss: "Dismiss",
  },
} as const;

/* ───────────────────────── Mock data ───────────────────────── */
type Ans = "YES" | "NO" | "PARTIAL" | "DONT_KNOW";
const ANS_ORDER: Ans[] = ["YES", "NO", "PARTIAL", "DONT_KNOW"];

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
  "Cryptography", "Physical Security", "Operations Security", "Communications",
  "Acquisition", "Incident Mgmt", "Business Continuity",
];

type Q = {
  id: string;
  domainIdx: number;
  ar: string;
  en: string;
  hintAr?: string;
  hintEn?: string;
  coverage: Record<string, boolean>;
};

function makeQuestions(): Q[] {
  const seeds: { ar: string; en: string; hintAr?: string; hintEn?: string }[] = [
    { ar: "هل تم تعيين مسؤول أو إدارة مستقلة للأمن السيبراني في الجهة؟", en: "Is there a dedicated cybersecurity officer or independent unit?" },
    { ar: "هل يتم مراجعة سياسات ومعايير الأمن السيبراني بشكل دوري؟", en: "Are cybersecurity policies and standards reviewed periodically?",
      hintAr: "تشمل المراجعة تحديث السياسات والمعايير بناءً على المتغيرات التنظيمية والتقنية.",
      hintEn: "Includes updates based on regulatory and technical changes." },
    { ar: "هل يتم إدارة الأصول المعلوماتية والتقنية وتصنيفها بشكل منتظم؟", en: "Are information and technology assets managed and classified regularly?" },
    { ar: "هل توجد عملية رسمية لإدارة الهويات والصلاحيات؟", en: "Is there a formal identity and access management process?" },
    { ar: "هل يتم تشفير البيانات الحساسة أثناء النقل والتخزين؟", en: "Is sensitive data encrypted in transit and at rest?" },
    { ar: "هل توجد ضوابط للأمن المادي لمراكز البيانات والمناطق الحساسة؟", en: "Are physical security controls in place for data centers and sensitive areas?" },
    { ar: "هل يتم مراقبة العمليات وإدارة السجلات الأمنية؟", en: "Are operations monitored and security logs managed?" },
    { ar: "هل توجد ضوابط لأمن الشبكات والاتصالات؟", en: "Are network and communications security controls in place?" },
    { ar: "هل يُدمج الأمن السيبراني في دورة حياة اقتناء الأنظمة؟", en: "Is cybersecurity integrated into the system acquisition lifecycle?" },
    { ar: "هل توجد خطة موثّقة للاستجابة للحوادث السيبرانية؟", en: "Is there a documented cyber incident response plan?" },
    { ar: "هل يتم اختبار خطط استمرارية الأعمال بشكل دوري؟", en: "Are business continuity plans tested periodically?" },
  ];
  const counts = [3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3];
  const out: Q[] = [];
  let qi = 0;
  counts.forEach((n, dIdx) => {
    for (let k = 0; k < n; k++) {
      const s = seeds[dIdx];
      out.push({
        id: `q${qi++}`,
        domainIdx: dIdx,
        ar: k === 0 ? s.ar : `${s.ar} (${k + 1})`,
        en: k === 0 ? s.en : `${s.en} (${k + 1})`,
        hintAr: s.hintAr,
        hintEn: s.hintEn,
        coverage: {
          NCA: dIdx !== 4,
          SAMA: dIdx < 8,
          ISO: true,
          PDPL: [0, 1, 3, 4, 9].includes(dIdx),
          NIST: dIdx !== 5,
        },
      });
    }
  });
  return out;
}

const QUESTIONS = makeQuestions();
const TOTAL = QUESTIONS.length;

const ANS_WEIGHT: Record<Ans, number> = { YES: 1, PARTIAL: 0.5, DONT_KNOW: 0, NO: 0 };
function scoreFor(answers: Record<string, Ans | undefined>, qIds: string[]): { pct: number; answered: number } {
  let total = 0;
  let answered = 0;
  qIds.forEach((id) => {
    const a = answers[id];
    if (a) {
      answered++;
      total += ANS_WEIGHT[a];
    }
  });
  return { pct: answered ? Math.round((total / answered) * 100) : 0, answered };
}
function statusOf(pct: number) {
  if (pct >= 70) return { key: "good", color: "var(--color-sev-low)" };
  if (pct >= 40) return { key: "mid",  color: "var(--color-sev-medium)" };
  return { key: "low", color: "var(--color-sev-critical)" };
}

/* ───────────────────────── Sub-components ───────────────────────── */

function FrameworkChip({ fw, covered, t }: { fw: typeof FRAMEWORKS[number]; covered: boolean; t: typeof T["ar"] }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px]"
            style={{
              borderColor: covered ? fw.color : "var(--border)",
              background: covered ? `color-mix(in srgb, ${fw.color} 10%, transparent)` : "transparent",
              color: covered ? fw.color : "var(--muted-foreground)",
              opacity: covered ? 1 : 0.6,
              textDecoration: covered ? "none" : "line-through",
            }}
          >
            {covered ? <Check className="size-3" /> : <X className="size-3" />}
            {fw.short}
          </span>
        </TooltipTrigger>
        {!covered && <TooltipContent>{t.notCovered}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

function AnswerButton({
  ans, label, num, selected, onClick, dir,
}: {
  ans: Ans; label: string; num: number; selected: boolean; onClick: () => void; dir: "ltr" | "rtl";
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
      className="group relative w-full text-start rounded-xl border p-4 transition-all bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      style={{
        borderColor: selected ? accent[ans] : "var(--border)",
        background: selected ? `color-mix(in srgb, ${accent[ans]} 8%, var(--card))` : undefined,
        boxShadow: selected ? `0 0 0 1px ${accent[ans]} inset` : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center rounded-md font-mono text-[12px]"
          style={{
            width: 28, height: 28,
            background: selected ? accent[ans] : "var(--muted)",
            color: selected ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
        >
          {num}
        </span>
        <span>{label}</span>
        {selected && <Check className="ms-auto size-4" style={{ color: accent[ans] }} />}
      </div>
    </button>
  );
}

function LiveScoreCard({
  answers, t,
}: { answers: Record<string, Ans | undefined>; t: typeof T["ar"] }) {
  const fwScores = FRAMEWORKS.map((fw) => {
    const ids = QUESTIONS.filter((q) => q.coverage[fw.id]).map((q) => q.id);
    return { fw, ...scoreFor(answers, ids) };
  });
  const answeredCount = Object.values(answers).filter(Boolean).length;
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h4>{t.live}</h4>
        <MBadge appearance="light" color="primary" size="xs" className="ms-auto">
          {t.answeredOf(answeredCount, TOTAL)}
        </MBadge>
      </div>
      <div className="flex flex-col gap-2.5">
        {fwScores.map(({ fw, pct, answered }) => {
          const st = statusOf(pct);
          const stLabel = st.key === "good" ? t.statusGood : st.key === "mid" ? t.statusMid : t.statusLow;
          return (
            <div key={fw.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[12px]">
                <span>{fw.short}</span>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: st.color }}
                  />
                  <span className="text-muted-foreground text-[11px]">{stLabel}</span>
                  <span className="font-mono tabular-nums">{answered ? `${pct}%` : "—"}</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: st.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DomainResultsCard({
  answers, t, domainNames,
}: { answers: Record<string, Ans | undefined>; t: typeof T["ar"]; domainNames: string[] }) {
  const domains = domainNames.map((name, idx) => {
    const ids = QUESTIONS.filter((q) => q.domainIdx === idx).map((q) => q.id);
    const { pct, answered } = scoreFor(answers, ids);
    return { name, idx, pct, answered, total: ids.length, complete: answered === ids.length };
  });
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-4 text-primary" />
        <h4>{t.domainScore}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {domains.map((d) => {
          const st = statusOf(d.pct);
          return (
            <div
              key={d.idx}
              className="rounded-lg border p-2.5 flex flex-col gap-1.5"
              style={{
                borderColor: d.complete ? st.color : "var(--border)",
                background: d.complete ? `color-mix(in srgb, ${st.color} 6%, var(--card))` : "var(--card)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[11px]">{d.name}</span>
                {d.complete && <CheckCircle2 className="size-3" style={{ color: st.color }} />}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-mono tabular-nums text-[12px]"
                  style={{ color: d.complete ? st.color : "var(--muted-foreground)" }}
                >
                  {d.answered ? `${d.pct}%` : "—"}
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  {d.answered}/{d.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestionIndex({
  answers, current, onJump, t,
}: {
  answers: Record<string, Ans | undefined>;
  current: number;
  onJump: (i: number) => void;
  t: typeof T["ar"];
}) {
  const answeredCount = Object.values(answers).filter(Boolean).length;
  return (
    <div className="rounded-xl border border-border bg-card p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h4>{t.index}</h4>
        <span className="text-muted-foreground text-[11px]">{t.indexProgress(answeredCount, TOTAL)}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {QUESTIONS.map((q, i) => {
          const a = answers[q.id];
          const isCur = i === current;
          let bg = "var(--muted)";
          let fg = "var(--muted-foreground)";
          if (a === "YES") { bg = "var(--color-sev-low)"; fg = "var(--primary-foreground)"; }
          else if (a === "PARTIAL") { bg = "var(--color-sev-medium)"; fg = "var(--primary-foreground)"; }
          else if (a === "NO") { bg = "var(--color-sev-critical)"; fg = "var(--primary-foreground)"; }
          else if (a === "DONT_KNOW") { bg = "var(--zinc-400)"; fg = "var(--primary-foreground)"; }
          return (
            <button
              key={q.id}
              onClick={() => onJump(i)}
              className="rounded-md font-mono tabular-nums text-[11px] transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
    </div>
  );
}

/* ───────────────────────── Completion screen ───────────────────────── */
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
      <div
        className="w-full max-w-2xl rounded-xl bg-card border border-border p-8 flex flex-col gap-6"
        style={{ boxShadow: "var(--shadow-xl)" }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "color-mix(in srgb, var(--color-sev-low) 15%, transparent)" }}
          >
            <CheckCircle2 className="size-8" style={{ color: "var(--color-sev-low)" }} />
          </div>
          <h2>{t.doneTitle}</h2>
          <p className="text-muted-foreground" style={{ maxWidth: 480 }}>{t.doneDesc}</p>
        </div>
        <div className="rounded-xl bg-muted p-5 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground text-[12px]">{t.live}</span>
            <span
              className="font-mono tabular-nums text-[32px]"
              style={{ color: statusOf(overall).color, fontWeight: "var(--font-weight-bold)" }}
            >
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

/* ───────────────────────── Main page ───────────────────────── */
export default function QuickAssessment() {
  const navigate = useNavigate();
  const [uiLang, setUiLang] = useState<Lang>("ar");
  const [qLang, setQLang] = useState<Lang>("ar");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Ans | undefined>>({});
  const [exitOpen, setExitOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [showResumed, setShowResumed] = useState(true);
  const [showBaseline, setShowBaseline] = useState(true);
  const [domainToast, setDomainToast] = useState<number | null>(null);

  const t = T[uiLang];
  const dir: "ltr" | "rtl" = uiLang === "ar" ? "rtl" : "ltr";
  const domainNames = uiLang === "ar" ? DOMAINS_AR : DOMAINS_EN;

  const q = QUESTIONS[current];
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = (answeredCount / TOTAL) * 100;
  const allAnswered = answeredCount === TOTAL;
  const minLeft = Math.max(1, Math.round((TOTAL - answeredCount) * 0.5));

  useEffect(() => {
    const id = setTimeout(() => setShowResumed(false), 4000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (answeredCount >= 3) setShowBaseline(false);
  }, [answeredCount]);

  const prevAnswered = useMemo(() => {
    const ids = QUESTIONS.filter((qq) => qq.domainIdx === q.domainIdx).map((qq) => qq.id);
    return ids.every((id) => answers[id]);
  }, [answers, q.domainIdx]);

  useEffect(() => {
    if (prevAnswered) {
      setDomainToast(q.domainIdx);
      const id = setTimeout(() => setDomainToast(null), 2500);
      return () => clearTimeout(id);
    }
  }, [prevAnswered, q.domainIdx]);

  const handleAnswer = useCallback((ans: Ans) => {
    setAnswers((prev) => ({ ...prev, [q.id]: ans }));
    if (!reviewMode) {
      setTimeout(() => {
        setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      }, 350);
    }
  }, [q.id, reviewMode]);

  const goNext = useCallback(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), []);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);

  useEffect(() => {
    if (completed) return;
    const handler = (e: KeyboardEvent) => {
      if (exitOpen) return;
      if (e.key === "1") handleAnswer("YES");
      else if (e.key === "2") handleAnswer("NO");
      else if (e.key === "3") handleAnswer("PARTIAL");
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
        answers={answers}
        t={t}
        lang={uiLang}
        onReview={() => { setReviewMode(true); setCompleted(false); setCurrent(0); }}
        onExit={() => navigate("/")}
      />
    );
  }

  const qText = qLang === "ar" ? q.ar : q.en;
  const qHint = qLang === "ar" ? q.hintAr : q.hintEn;
  const domainLabel = domainNames[q.domainIdx];
  const currentAns = answers[q.id];

  return (
    <div dir={dir}>
      <div className="min-h-screen bg-muted text-foreground flex flex-col">
        {/* TOP BAR */}
        <header
          className="bg-background border-b border-border sticky top-0 flex items-center px-5 gap-3"
          style={{ height: "var(--topbar-height)", zIndex: "var(--z-header)" }}
        >
          <MButton
            variant="ghost"
            size="icon"
            onClick={() => setExitOpen(true)}
            aria-label={t.exit}
          >
            <X />
          </MButton>
          <div className="flex flex-col">
            <h4>{t.title}</h4>
            <span className="text-muted-foreground tabular-nums text-[11px]">
              {t.qCounter(current + 1, TOTAL)}
            </span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="ms-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 text-muted-foreground text-[11px]">
              <Clock className="size-3.5" />
              <span>{t.timeLeft(minLeft)}</span>
            </div>
            <MButton
              variant="outline"
              size="sm"
              onClick={() => setUiLang(uiLang === "ar" ? "en" : "ar")}
            >
              <Languages />
              {uiLang === "ar" ? "EN" : "AR"}
            </MButton>
          </div>
        </header>

        {/* Resume banner */}
        {showResumed && (
          <div
            className="px-5 py-2 text-center border-b border-border text-[12px]"
            style={{
              background: "color-mix(in srgb, var(--color-sev-info) 8%, var(--card))",
              color: "var(--color-sev-info)",
            }}
          >
            <RotateCcw className="inline size-3.5 me-1.5" />
            {t.resumed}
          </div>
        )}

        {/* Review mode banner */}
        {reviewMode && (
          <div
            className="px-5 py-2.5 flex items-center justify-center gap-3 border-b border-border text-[12px]"
            style={{ background: "color-mix(in srgb, var(--color-sev-medium) 12%, var(--card))" }}
          >
            <Edit3 className="size-4" style={{ color: "var(--color-sev-medium)" }} />
            <span>{t.reviewBanner}</span>
            <MButton variant="outline" size="sm" onClick={() => { setReviewMode(false); setCompleted(true); }}>
              {t.exitReview}
            </MButton>
          </div>
        )}

        {/* Mobile progress */}
        <div className="md:hidden px-5 py-2 bg-background border-b border-border">
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* MAIN */}
        <main
          className="flex-1 mx-auto w-full p-5 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* LEFT — question */}
          <div className="flex flex-col gap-4 min-w-0">
            {/* Baseline estimate */}
            {showBaseline && (
              <div
                className="rounded-xl border p-4 flex items-start gap-3"
                style={{
                  background: "color-mix(in srgb, var(--color-sev-info) 6%, var(--card))",
                  borderColor: "color-mix(in srgb, var(--color-sev-info) 30%, transparent)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "color-mix(in srgb, var(--color-sev-info) 15%, transparent)" }}
                >
                  <Sparkles className="size-4" style={{ color: "var(--color-sev-info)" }} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-[12px]" style={{ color: "var(--color-sev-info)" }}>
                    {t.baseline}
                  </span>
                  <span>{t.baselineDesc(62)}</span>
                </div>
                <MButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBaseline(false)}
                  aria-label={t.dismiss}
                >
                  <X />
                </MButton>
              </div>
            )}

            {/* Domain-complete toast */}
            {domainToast !== null && (
              <div
                className="rounded-xl border p-3 flex items-center gap-3"
                style={{
                  background: "color-mix(in srgb, var(--color-sev-low) 10%, var(--card))",
                  borderColor: "var(--color-sev-low)",
                }}
              >
                <CheckCircle2 className="size-4" style={{ color: "var(--color-sev-low)" }} />
                <span>{t.domainDone} — {domainNames[domainToast]}</span>
              </div>
            )}

            {/* Question card */}
            <div
              className="rounded-xl bg-card border border-border p-6 lg:p-8 flex flex-col gap-5"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Domain + lang toggle */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <MBadge appearance="light" color="primary" size="sm">
                  {t.domain}: {domainLabel}
                </MBadge>
                <MButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setQLang(qLang === "ar" ? "en" : "ar")}
                >
                  <Languages />
                  {qLang === "ar" ? "EN" : "ع"}
                </MButton>
              </div>

              {/* Coverage chips */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-muted-foreground self-center text-[11px]">
                  {t.coverage}:
                </span>
                {FRAMEWORKS.map((fw) => (
                  <FrameworkChip key={fw.id} fw={fw} covered={q.coverage[fw.id]} t={t} />
                ))}
              </div>

              {/* Question text */}
              <div className="flex flex-col gap-2" dir={qLang === "ar" ? "rtl" : "ltr"}>
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

              {/* Answer options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ANS_ORDER.map((ans, i) => (
                  <AnswerButton
                    key={ans}
                    ans={ans}
                    label={t.answers[ans]}
                    num={i + 1}
                    selected={currentAns === ans}
                    onClick={() => handleAnswer(ans)}
                    dir={dir}
                  />
                ))}
              </div>

              {/* Keyboard hint */}
              <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                <Keyboard className="size-3.5" />
                <span>{t.kbdHint}</span>
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <MButton variant="outline" onClick={goPrev} disabled={current === 0}>
                  {dir === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                  {t.prev}
                </MButton>
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

            <QuestionIndex answers={answers} current={current} onJump={setCurrent} t={t} />
          </div>

          {/* RIGHT — live + domain */}
          <aside className="flex flex-col gap-4 lg:sticky lg:self-start" style={{ top: "calc(var(--topbar-height) + 16px)" }}>
            <LiveScoreCard answers={answers} t={t} />
            <DomainResultsCard answers={answers} t={t} domainNames={domainNames} />
          </aside>
        </main>

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

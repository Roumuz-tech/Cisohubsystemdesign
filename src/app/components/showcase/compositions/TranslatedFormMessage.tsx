import { AlertCircle } from "lucide-react";

/* ============================================================
 * 6. TranslatedFormMessage — bilingual validation message (AR/EN)
 * ========================================================== */
type TFMProps = {
  ar: string;
  en: string;
  tone?: "error" | "warning" | "info";
};

function TranslatedFormMessage({ ar, en, tone = "error" }: TFMProps) {
  const toneCls =
    tone === "error"
      ? "text-destructive"
      : tone === "warning"
        ? "text-warning"
        : "text-info";
  return (
    <div className={"flex items-start gap-1.5 " + toneCls}>
      <AlertCircle className="size-3.5 mt-px shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col gap-0.5">
        <div className="text-[11px] font-medium" dir="rtl">
          {ar}
        </div>
        <div className="text-[10px] opacity-80" dir="ltr">
          {en}
        </div>
      </div>
    </div>
  );
}

export function TranslatedFormMessageDemo() {
  return (
    <div className="max-w-[420px] flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tfm-email" className="text-[12px] font-medium">
          Email
        </label>
        <input
          id="tfm-email"
          defaultValue="not-an-email"
          className="h-9 px-2.5 rounded-md border border-destructive bg-input text-[12px] outline-none focus:ring-2 focus:ring-destructive/30"
        />
        <TranslatedFormMessage
          ar="البريد الإلكتروني غير صالح"
          en="Email address is invalid"
          tone="error"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tfm-pw" className="text-[12px] font-medium">
          Password
        </label>
        <input
          id="tfm-pw"
          type="password"
          defaultValue="123"
          className="h-9 px-2.5 rounded-md border border-warning bg-input text-[12px] outline-none focus:ring-2 focus:ring-warning/30"
        />
        <TranslatedFormMessage
          ar="كلمة المرور ضعيفة — استخدم 12 رمزاً على الأقل"
          en="Password is weak — use at least 12 characters"
          tone="warning"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tfm-org" className="text-[12px] font-medium">
          Organization ID
        </label>
        <input
          id="tfm-org"
          defaultValue="ACME-001"
          className="h-9 px-2.5 rounded-md border border-input bg-input text-[12px] outline-none focus:ring-2 focus:ring-ring/30"
        />
        <TranslatedFormMessage
          ar="سيتم استخدام هذا المعرّف في جميع التقارير"
          en="This ID will appear on all generated reports"
          tone="info"
        />
      </div>
    </div>
  );
}

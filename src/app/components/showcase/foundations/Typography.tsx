/**
 * Typography showcase — moved from Batch13 during reorganization (Phase 1).
 * Exception: uses arbitrary `text-[Npx]` and inline font-weight/family because
 * its sole purpose is to *demonstrate* the type scale itself.
 */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-lg bg-card p-5 flex flex-col gap-3.5">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] text-muted-foreground font-medium mt-1">
      {children}
    </div>
  );
}

export function DisplayTypeDemo() {
  return (
    <Card>
      <div>
        <div className="text-[40px]" style={{ fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>
          Govern with confidence.
        </div>
        <Label>Hero · 40 / 700 / -0.02em</Label>
      </div>
      <div>
        <div className="text-[26px]" style={{ fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
          Risk assessment dashboard
        </div>
        <Label>Page H1 · 26 / 600 / -0.01em</Label>
      </div>
      <div>
        <div className="text-[22px]" style={{ fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          Recent activity
        </div>
        <Label>H2 · 22 / 600</Label>
      </div>
    </Card>
  );
}

export function BodyTypeDemo() {
  const pangram = "The quick brown fox jumps over the lazy dog";
  return (
    <Card>
      <div>
        <div className="text-[16px]" style={{ fontWeight: 400, lineHeight: 1.5 }}>{pangram} — 16 / 400 lg</div>
        <Label>--text-lg · paragraph lead</Label>
      </div>
      <div>
        <div className="text-[14px]" style={{ fontWeight: 400, lineHeight: 1.5 }}>{pangram} — 14 / 400 md</div>
        <Label>--text-md · form labels, list items</Label>
      </div>
      <div>
        <div className="text-[13px]" style={{ fontWeight: 400, lineHeight: 1.5 }}>{pangram} — 13 / 400 base</div>
        <Label>--text-body-size · default body, table cells</Label>
      </div>
      <div>
        <div className="text-[12px]" style={{ fontWeight: 400, lineHeight: 1.45 }}>{pangram} — 12 / 400 sm</div>
        <Label>--text-sm · captions, hints</Label>
      </div>
      <div>
        <div
          className="text-[11px] text-muted-foreground uppercase"
          style={{ fontWeight: 500, lineHeight: 1.3, letterSpacing: "0.08em" }}
        >
          SECTION · OVERLINE — 11 / 500 caps
        </div>
        <Label>--text-xs · group headers in sidebar</Label>
      </div>
    </Card>
  );
}

export function WeightsTypeDemo() {
  const weights = [
    { v: 300, l: "Light" },
    { v: 400, l: "Regular" },
    { v: 500, l: "Medium" },
    { v: 600, l: "SemiBold" },
    { v: 700, l: "Bold" },
  ];
  return (
    <Card>
      <div className="flex flex-col gap-1.5">
        {weights.map((w) => (
          <div key={w.v} className="flex items-baseline gap-3.5">
            <div className="w-24 text-[11px] text-muted-foreground font-medium">{w.v} · {w.l}</div>
            <div className="text-[18px]" style={{ fontWeight: w.v, lineHeight: 1.3 }}>
              Identity & control assurance
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function MonoTypeDemo() {
  return (
    <Card>
      <div>
        <div
          className="text-[40px]"
          style={{ fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
        >
          $295.7k
        </div>
        <Label>Stat number · 40 / 700 / -0.02em (Inter, tabular)</Label>
      </div>
      <div>
        <div
          className="inline-block bg-muted px-2.5 py-1.5 rounded-md font-mono text-[13px]"
          style={{ fontWeight: 400, lineHeight: 1.5 }}
        >
          GET /api/hub/audit-summary
        </div>
        <Label>Mono · 13 / 400 (code & API paths)</Label>
      </div>
      <div>
        <div className="font-mono text-[12px] text-muted-foreground" style={{ fontWeight: 500, lineHeight: 1.4 }}>
          a1b2c3-d4e5-f6g7-h8i9
        </div>
        <Label>Mono · 12 / 500 (IDs, refs)</Label>
      </div>
    </Card>
  );
}

export function ArabicTypeDemo() {
  return (
    <Card>
      <div dir="rtl" className="flex flex-col gap-3.5">
        <div>
          <div
            className="text-[26px]"
            style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            لوحة تحكم المخاطر
          </div>
          <div dir="ltr"><Label>Page H1 · Cairo 26 / 600</Label></div>
        </div>
        <div>
          <div
            className="text-[14px]"
            style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 400, lineHeight: 1.7 }}
          >
            إطار العمل الامتثالي للأنشطة السيبرانية للجهات الوطنية. التحديث الأخير قبل 12 دقيقة.
          </div>
          <div dir="ltr"><Label>Body · Cairo 14 / 400, line-height 1.7 (Arabic needs extra)</Label></div>
        </div>
        <div>
          <div
            className="inline-block text-[13px] bg-primary/10 text-primary px-2.5 py-1 rounded-md"
            style={{ fontFamily: "Cairo, Inter, sans-serif", fontWeight: 500, lineHeight: 1.5 }}
          >
            قيد المراجعة
          </div>
          <div dir="ltr"><Label>Badge · Cairo 13 / 500 (in light primary badge)</Label></div>
        </div>
      </div>
    </Card>
  );
}

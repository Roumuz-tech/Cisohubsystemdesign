# CISO Hub — Design System & Agent Rules

> **ه
ذا الملف إلزامي لكل وكيل AI يعمل على هذا المشروع.**
>
 قبل أي تعديل: اقرأ `src/styles/theme.css` و `src/app/components/showcase/MetronicButton.tsx` و افهم النظام قبل الكتابة.
>

> الهدف: من
صة CISO Hub — GRC/أمن سيبراني — ثنائية اللغة (Arabic-first RTL + English) — مبنية على React + Tailwind v4 + shadcn/ui (`default` style) + Metronic v9 tokens.

---

## 0. مبادئ عامة (Non-negotiable)

1. **لا تعدّل الملفات المحمية** (انظر §1).
2. **لا تخترع توكنات** (ألوان، spacing، radius، z-index، motion) — كلها معرّفة في `theme.css`.
3. **لا تستخدم Tailwind classes للـ font-size / font-weight / line-height** (مثل `text-2xl`, `font-bold`, `leading-none`) إلا بطلب صريح من المستخدم. تنسيقات `h1..h4`, `body`, `label`, `button`, `input` معرّفة عالمياً في `theme.css`.
4. **لا تستخدم ألوان hex مباشرة** في JSX/TSX. استخدم متغيرات `var(--*)` أو Tailwind tokens (`bg-primary`, `text-muted-foreground`, إلخ).
5. **RTL-first**: استخدم خصائص logical فقط (`ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`, `text-start`/`text-end`, `border-s`/`border-e`).
6. **Body text = 13px** (`--text-body`). لا تتجاوزه للنصوص العادية بدون مبرر.
7. لا تضف تعليقات في الكود إلا إذا كان "لماذا" غير واضح (تعليمات SDK تنطبق).

---

## 1. الملفات المحمية — ممنوع التعديل

| المسار | السبب |
|---|---|
| `src/app/components/ui/*` | shadcn primitives — يُعاد توليدها من CLI |
| `src/styles/theme.css` | التوكنات الأساسية — تعديلها يكسر النظام بالكامل |
| `src/styles/fonts.css` | استيراد الخطوط فقط — لا منطق |
| `src/app/components/figma/ImageWithFallback.tsx` | مكوّن Figma Make الأساسي |
| `__figma__entrypoint__.ts` | يُولَّد تلقائياً |
| أي ملف `src/imports/*` | imports من Figma — استخدمها كما هي |

استثناء وحيد: عند الحاجة لتوكن جديد (مثل z-index طبقة جديدة)، أضفه في `theme.css` في القسم المناسب فقط، **مع توثيقه في الـ Showcase**.

---

## 2. نظام الألوان

### الـ Scale الأساسية
- **Neutral**: `zinc-50 → zinc-950` (لا تستخدم gray/slate/neutral)
- **Primary**: `blue-500` (`#3b82f6`)، hover = `blue-600`
- **Semantic surfaces** عبر متغيرات shadcn (لا hex):
  - `bg-background`, `text-foreground`
  - `bg-card`, `text-card-foreground`
  - `bg-muted`, `text-muted-foreground`
  - `bg-accent`, `text-accent-foreground`
  - `bg-primary`, `text-primary-foreground`
  - `bg-destructive`, `bg-success`, `bg-warning`, `bg-info`
  - `border-border`, `bg-input`, `ring-ring`

### 2.1 استثناء موثَّق — تسمية توكنات الحجم النصي

التوكن السابق `--text-body` أُعيدت تسميته إلى **`--text-body-size`** في كل من `theme.css` و `src/imports/colors_and_type__1_.css` و `src/imports/ui.css` و `src/imports/ui-1.css`.

**السبب**: الاسم `--text-body` غامض الدلالة (قد يُفسَّر كلون أو كحجم). أنظمة تصميم خارجية محتمل استيرادها مستقبلاً تستخدم `--text-body` للإشارة إلى **لون** نص الجسم (يساوي `var(--foreground)`)، بينما نحن نستخدمه للإشارة إلى **حجم** 13px. الدمج العشوائي يكسر النظامين معاً (قاعدة `color: var(--text-body)` تتلقى رقم rem غير صالح كقيمة لون).

**القاعدة العامة المشتقة**: أي توكن نصي يصف خاصية CSS واحدة يجب أن يحمل اسم الخاصية في اسمه:
- `--text-body-size` ✅ (حجم)
- `--text-body-color` ✅ (لون، لو احتجناه لاحقاً)
- `--text-body` ❌ ممنوع — مبهم
- نفس المبدأ يسري على `--radius-*`, `--shadow-*`, `--leading-*` (وهي بالفعل ملتزمة).

**استثناء وحيد عن قاعدة §1 (الملفات المحمية)**: هذا التغيير اقتضى تعديل `theme.css` و ملفات `src/imports/*` بإذن صريح من المستخدم لحماية النظام من تصادمات مستقبلية، لا لإضافة ميزة.

---

### Severity Scale — موحّد (إلزامي)
توكنات مخصّصة في `theme.css` تحت مجموعة `--color-sev-*` (مفصولة عن `--destructive`/`--warning`/`--primary`/`--info` لمنع تبديل المعاني عند تطوّر النظام الدلالي).

| المستوى | التوكن | القيمة | الاستخدام |
|---|---|---|---|
| Critical | `var(--color-sev-critical)` | `#ef4444` | اختراق فعلي / استغلال مؤكد |
| High | `var(--color-sev-high)` | `#f97316` | مخاطر كبيرة / patch خلال 7 أيام |
| Medium | `var(--color-sev-medium)` | `#f59e0b` | معتدل / patch خلال 30 يوم |
| Low | `var(--color-sev-low)` | `#22c55e` | بسيط / مراقبة |
| Info | `var(--color-sev-info)` | `#3b82f6` | معلوماتي / لا إجراء |

متاحة كـ Tailwind utilities عبر `@theme inline`: `bg-sev-critical`, `text-sev-low`, إلخ.

ممنوع: ألوان أخرى للـ severity، أو تبديل المعاني، أو إضافة مستويات (None/Trivial/Catastrophic إلخ).

### Charts palette ثابت
`--chart-1` blue → `--chart-5` red. لا تخترع ألوان للـ recharts.

### الـ Sidebar
خلفية Comply dark `#2a3042` فقط (`bg-sidebar`). نص أبيض/70/40.

---

## 3. Typography

- خط Latin: **Inter** ، خط Arabic: **Cairo** (يتبدّل تلقائياً عبر `[dir="rtl"]`)
- استيراد الخطوط في `src/styles/fonts.css` فقط (لا في أي ملف آخر).
- استخدم العلامات الدلالية (`<h1>`, `<h2>`, `<label>`, `<button>`) — تنسيقها مضبوط.
- للحجم المخصص فقط، استخدم **arbitrary values** بـ px واضح: `text-[11px]`, `text-[13px]`. لا تستخدم Tailwind size classes.

---

## 4. Spacing & Layout

- **سلم spacing**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 px فقط.
- **Radius**:
  - `rounded-sm` 4px ، `rounded-md` 6px ، `rounded-lg` 8px (افتراضي) ، `rounded-xl` 12px
  - بطاقات (Card) = `rounded-xl`. أزرار/inputs = `rounded-md` (افتراضي shadcn).
- **Shadows**: `shadow-xs` → `shadow-xl` فقط من theme.css.
- **Content max-width**: 1320px (`--content-max-width`).
- **Content padding**: 20px.

### Z-index taxonomy (إلزامي بهذا الترتيب)
```
content     0
header      10
sidebar     20
dropdown    30   ← menus, popovers, selects
sticky      40   ← sticky sub-bars, table headers
overlay     50   ← Sheet/Dialog backdrop
modal       60   ← Dialog/Sheet content
toast       70   ← دائماً فوق كل شيء
```
لا تستخدم `z-50` بشكل عشوائي. استخدم متغير المتدرّج (`style={{ zIndex: 'var(--z-modal)' }}`) أو الـ Tailwind class المطابق.

---

## 5. Motion

- Durations: `--duration-fast` 150ms ، `--duration-base` 200ms ، `--duration-slow` 300ms.
- Easing: `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- احترم `prefers-reduced-motion` (مضبوط عالمياً في theme.css).
- للحركات المعقدة استخدم `motion/react` (Motion).

---

## 6. Icons

- **lucide-react فقط**. ممنوع heroicons / tabler / SVG مرسوم يدوياً للأيقونات الشائعة.
- أحجام معيارية ثلاثة:
  - `size-3.5` (14px) — أيقونات inline داخل نص أو شارات
  - `size-4` (16px) — أزرار، قوائم
  - `size-5` (20px) — هيدر، أزرار كبيرة
- `strokeWidth={1.5}` للأيقونات الزخرفية، الافتراضي (2) للوظيفية.

---

## 7. المكوّنات — قواعد الاختيار

### استخدم دائماً
- **`MButton`** من `showcase/MetronicButton` بدل shadcn `Button` المباشر (للحفاظ على تطابق Metronic).
- **`ImageWithFallback`** من `components/figma/` بدل `<img>`.
- **shadcn primitives** للـ Dialog/Sheet/Drawer/Popover/Select/إلخ — لا تبني نسخة موازية.
- **`Sonner`** للـ toasts: `import { toast } from "sonner"`.
- **`Recharts`** للـ charts (line/area/bar/donut).
- **`react-day-picker`** للـ calendar (مغلف في `ui/calendar`).
- **`cmdk`** للـ command palette.
- **`vaul`** للـ Drawer (مغلف في `ui/drawer`).

### ممنوع تثبيتها
- `@mui/material`, `antd`, `chakra-ui`, `mantine`, `react-bootstrap` — نحن على shadcn فقط.
- `konva` (لا يعمل في البيئة) — استخدم HTML canvas مباشرة.
- `react-resizable` — استخدم `re-resizable`.

### إضافة مكتبة جديدة
لا تثبت مكتبة بدون إذن المستخدم. عند الطلب: `pnpm add <pkg>`.

---

## 8. Patterns خاصة بـ CISO Hub

استخدم هذه القوالب بدل اختراع جديد:

| الحالة | المكوّن المرجعي |
|---|---|
| Compliance score | `ComplianceGaugeDemo` (Batch11) — RadialBarChart |
| Control ↔ Framework mapping | `ControlMappingDemo` (Batch11) |
| Evidence file | `EvidenceCardDemo` (Batch11) |
| Risk matrix 5×5 | `RiskMatrixDemo` (Batch9) |
| Severity badge | `SeverityScaleDemo` (Batch11) |
| Page shells | `PageTemplatesDemo` (Batch11) — List/Detail/Dashboard/Settings/Empty/404/500 |
| Audit log | `TimelineDemo` (Batch10) |
| Policy diff | `DiffViewerDemo` (Batch10) |
| Sidebar | `SidebarDemo` (Batch7) — Comply dark `#2a3042` |

---

## 9. هيكل الملفات

```
src/
├── app/
│   ├── App.tsx                          ← الـ entrypoint الوحيد، default export
│   └── components/
│       ├── ui/                          ← shadcn (محمي)
│       ├── figma/ImageWithFallback.tsx  ← محمي
│       └── showcase/
│           ├── _shared/                 ← MetronicButton, MetronicBadge (المصدر الفعلي)
│           ├── foundations/             ← Colors, Typography, Spacing, Radius, Shadows, ZIndex, Motion, Icons
│           ├── primitives/              ← أزرار، inputs، selects، toggles، إلخ (ملف لكل مكوّن)
│           ├── compositions/            ← Sidebar, Header, DataGrid, Timeline, Charts, إلخ
│           ├── ciso-patterns/           ← ComplianceGauge, ControlMapping, EvidenceCard, SeverityScale, RiskMatrix
│           ├── templates/               ← PageTemplatesV1/V2/V3, LayoutOptions
│           ├── MetronicButton.tsx       ← stub re-export → _shared (للتوافق الخلفي)
│           ├── MetronicBadge.tsx        ← stub re-export → _shared
│           └── Batch{N}.tsx             ← يحتوي implementations؛ يُستبدَل تدريجياً بملفات منفصلة
└── styles/
    ├── theme.css                        ← محمي
    ├── fonts.css                        ← @import الخطوط فقط
    └── *.css
```

**قواعد:**
- الـ entrypoint = `src/app/App.tsx` فقط. ممنوع `index.html` أو ملفات HTML أخرى.
- ملفات جديدة كلها `.tsx` (لا `.jsx` ولا `.js`).
- مكوّنات جديدة في `src/app/components/showcase/` أو ملف `Batch{N}.tsx`.

---

## 10. سير العمل لإضافة مكوّنات جديدة (Batch)

1. أنشئ `src/app/components/showcase/Batch{N}.tsx` بمكوّنات مُصدَّرة (`export function`).
2. كل مكوّن مستقل وقابل للاختبار بصرياً.
3. في `App.tsx`:
   - أضف `import { ... } from "./components/showcase/Batch{N}";` بعد آخر import للـ batch.
   - أضف `<Card>` sections قبل `{/* AUTH FLOW */}` بنفس النمط (CardHeader + CardTitle + CardContent).
4. لا تربط مكوّناً في App.tsx بدون إنشاء بطاقة Card له.

---

## 11. RTL & i18n

- كل التخطيط logical:
  - ✅ `ms-2 me-3 ps-4 pe-2 start-0 end-0 text-start border-s`
  - ❌ `ml-2 mr-3 pl-4 pr-2 left-0 right-0 text-left border-l`
- النصوص الإنجليزية تبقى LTR طبيعياً داخل سياق RTL (المتصفح يتولاها).
- لا تستخدم `transform: scaleX(-1)` لقلب الأيقونات الاتجاهية — استخدم `rtl:rotate-180` أو أيقونة بديلة (`ChevronRight` ↔ `ChevronLeft`).

---

## 12. Dark mode

- يُفعَّل عبر إضافة class `dark` على wrapper (انظر `App.tsx`).
- جميع التوكنات تتبدّل تلقائياً عبر `.dark` في `theme.css`.
- لا تكتب `dark:bg-xxx` يدوياً إذا كان التوكن الدلالي (`bg-card`) يتولّى ذلك.

---

## 13. Accessibility (WCAG 2.2 AA)

- Focus ring: `outline-ring/50` مضبوط عالمياً — لا تزله بـ `outline-none` بدون بديل.
- Contrast: text-foreground على bg-background ≥ 7:1، text-muted-foreground ≥ 4.5:1.
- Touch targets ≥ 44×44px للموبايل.
- ARIA: استخدم `aria-label` للأزرار التي تحتوي أيقونة فقط.
- Keyboard: كل عنصر تفاعلي يجب أن يكون قابلاً للوصول بـ Tab.

---

## 14. ممنوعات سريعة (Quick Don'ts)

```diff
- bg-[#3b82f6]              + bg-primary
- text-2xl font-bold        + <h2>
- ml-2 mr-3                 + ms-2 me-3
- <img src="..." />         + <ImageWithFallback src={imported} />
- <Button>                  + <MButton>
- z-50 (عشوائياً)            + z-[var(--z-modal)]
- text-red-500              + text-destructive
- <h1 className="text-4xl"> + <h1>  (الحجم مضبوط)
- نسخة بديلة لـ Dialog       + استخدم shadcn Dialog
- new tailwind.config.js     + Tailwind v4 — لا config file
```

---

## 15. عند الشك

1. **اقرأ `theme.css`** — التوكن موجود غالباً.
2. **ابحث في `Batch6..11.tsx`** — النمط محتمل أنه مُنفّذ.
3. **اسأل المستخدم** قبل إنشاء توكن/نمط جديد.
4. **لا تخترع** — التماثل أهم من الإبداع في design system.

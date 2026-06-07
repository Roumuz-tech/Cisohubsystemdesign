#!/usr/bin/env bash
# CISO Hub Design System — one-shot installer
#
# Usage in a new Figma Make project:
#   curl -fsSL https://raw.githubusercontent.com/<YOU>/<REPO>/main/scripts/init-design-system.sh | bash
#
# Or, if the repo is private, with a GitHub token:
#   curl -fsSL -H "Authorization: token $GH_TOKEN" \
#     https://raw.githubusercontent.com/<YOU>/<REPO>/main/scripts/init-design-system.sh | bash
#
# What it does:
#   1. Downloads CLAUDE.md + DESIGN_SYSTEM_STARTER.md
#   2. Downloads all design-system source files (styles, shadcn ui, figma helper, Metronic wrappers)
#   3. Runs `pnpm add` for every required dependency
#
# Idempotent: re-running overwrites design-system files but leaves your app code alone.

set -euo pipefail

# ============================================================================
# CONFIGURE THESE TWO LINES, then commit + push this script.
# ============================================================================
REPO="Roumuz-tech/Cisohubsystemdesign"
BRANCH="main"
# ============================================================================

RAW="https://raw.githubusercontent.com/$REPO/$BRANCH"

# If the repo is private, export GH_TOKEN before running this script and we'll
# attach it as a header for every curl request.
AUTH_HEADER=()
if [[ -n "${GH_TOKEN:-}" ]]; then
  AUTH_HEADER=(-H "Authorization: token $GH_TOKEN")
fi

fetch() {
  local src="$1"
  local dst="$2"
  mkdir -p "$(dirname "$dst")"
  echo "  ↓ $dst"
  curl -fsSL "${AUTH_HEADER[@]}" "$RAW/$src" -o "$dst"
}

echo "▶ CISO Hub Design System — installing from $REPO@$BRANCH"
echo ""

# --- 1. Root rules files ----------------------------------------------------
echo "▶ Rules & docs"
fetch "src/CLAUDE.md"                  "CLAUDE.md"
fetch "src/DESIGN_SYSTEM_STARTER.md"   "DESIGN_SYSTEM_STARTER.md"

# --- 2. Styles --------------------------------------------------------------
echo ""
echo "▶ Styles"
for f in index.css tailwind.css theme.css fonts.css globals.css; do
  fetch "src/styles/$f" "src/styles/$f"
done

# --- 3. shadcn primitives (full ui/ folder) ---------------------------------
echo ""
echo "▶ shadcn UI primitives (48 files)"
UI_FILES=(
  accordion.tsx alert-dialog.tsx alert.tsx aspect-ratio.tsx avatar.tsx
  badge.tsx breadcrumb.tsx button.tsx calendar.tsx card.tsx carousel.tsx
  chart.tsx checkbox.tsx collapsible.tsx command.tsx context-menu.tsx
  dialog.tsx drawer.tsx dropdown-menu.tsx form.tsx hover-card.tsx
  input-otp.tsx input.tsx label.tsx menubar.tsx navigation-menu.tsx
  pagination.tsx popover.tsx progress.tsx radio-group.tsx resizable.tsx
  scroll-area.tsx select.tsx separator.tsx sheet.tsx sidebar.tsx
  skeleton.tsx slider.tsx sonner.tsx switch.tsx table.tsx tabs.tsx
  textarea.tsx toggle-group.tsx toggle.tsx tooltip.tsx
  use-mobile.ts utils.ts
)
for f in "${UI_FILES[@]}"; do
  fetch "src/app/components/ui/$f" "src/app/components/ui/$f"
done

# --- 4. Figma helper --------------------------------------------------------
echo ""
echo "▶ Figma helper"
fetch "src/app/components/figma/ImageWithFallback.tsx" \
      "src/app/components/figma/ImageWithFallback.tsx"

# --- 5. Metronic wrappers ---------------------------------------------------
echo ""
echo "▶ Metronic wrappers"
fetch "src/app/components/showcase/_shared/MetronicButton.tsx" \
      "src/app/components/showcase/_shared/MetronicButton.tsx"
fetch "src/app/components/showcase/_shared/MetronicBadge.tsx" \
      "src/app/components/showcase/_shared/MetronicBadge.tsx"

# --- 6. Install dependencies ------------------------------------------------
echo ""
echo "▶ Installing npm dependencies (pnpm)"
pnpm add \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-hover-card \
  @radix-ui/react-label @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-popover \
  @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-slot @radix-ui/react-switch \
  @radix-ui/react-tabs @radix-ui/react-toggle-group \
  @radix-ui/react-toggle @radix-ui/react-tooltip \
  class-variance-authority clsx tailwind-merge \
  lucide-react sonner cmdk vaul \
  react-day-picker@8.10.1 react-hook-form@7.55.0 \
  recharts motion \
  date-fns embla-carousel-react input-otp \
  react-resizable-panels tw-animate-css

# --- 7. Done ----------------------------------------------------------------
echo ""
echo "✅ CISO Hub design system installed."
echo ""
echo "Next steps for the agent:"
echo "  1. Read CLAUDE.md — it's mandatory."
echo "  2. Make sure src/app/App.tsx (or your entry CSS) imports 'src/styles/index.css'."
echo "  3. Use <MButton> from showcase/_shared/MetronicButton instead of raw <Button>."
echo "  4. Use semantic tokens (bg-primary, text-muted-foreground) — no hex colors."
echo "  5. Use logical RTL properties (ms-*/me-*/ps-*/pe-*/start-*/end-*)."

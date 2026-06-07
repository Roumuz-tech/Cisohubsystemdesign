# CISO Hub — Design System Starter Kit

A portable bundle to make any new Figma Make project follow this design system.

## What the installer downloads
- `CLAUDE.md` — mandatory agent rules
- `src/styles/*` — 5 CSS files (theme tokens, fonts, tailwind entry)
- `src/app/components/ui/*` — 48 shadcn primitives
- `src/app/components/figma/ImageWithFallback.tsx`
- `src/app/components/showcase/_shared/MetronicButton.tsx` + `MetronicBadge.tsx`

## One-shot install command
```
curl -fsSL https://raw.githubusercontent.com/Roumuz-tech/Cisohubsystemdesign/main/scripts/init-design-system.sh | bash
```

## After install
1. Read `CLAUDE.md` — every rule is mandatory.
2. Use `<MButton>` from `showcase/_shared/MetronicButton` instead of raw `Button`.
3. Use semantic tokens (`bg-primary`, `text-muted-foreground`) — no hex colors.
4. Use logical RTL properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`).
5. Don't create `tailwind.config.js` — Tailwind v4 uses `@theme` in `theme.css`.

## Notes
- The `@ciso-design-system` npm scope is empty — don't try to `pnpm add` from it.
- Font imports go only in `src/styles/fonts.css`.
- Protected files (`ui/*`, `theme.css`, `fonts.css`, `ImageWithFallback`) are read-only after install.

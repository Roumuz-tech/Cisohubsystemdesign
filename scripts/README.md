# One-shot Design System Installer

## Setup (one-time)

1. Push this entire project to a GitHub repo (public is easiest; private works
   too with a token).
2. Open `scripts/init-design-system.sh` and edit the two config lines at the
   top:
   ```
   REPO="your-github-username/your-repo-name"
   BRANCH="main"
   ```
3. Commit and push that change.

## Usage in every new Figma Make project

Tell the agent in the new project to run this one command:

```
curl -fsSL https://raw.githubusercontent.com/<YOU>/<REPO>/main/scripts/init-design-system.sh | bash
```

If your repo is private, first export a token, then run:

```
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
curl -fsSL -H "Authorization: token $GH_TOKEN" \
  https://raw.githubusercontent.com/<YOU>/<REPO>/main/scripts/init-design-system.sh \
  | GH_TOKEN=$GH_TOKEN bash
```

That's it. The script will:

- Download `CLAUDE.md` + `DESIGN_SYSTEM_STARTER.md` to the project root.
- Download all 5 style files into `src/styles/`.
- Download all 48 shadcn primitives into `src/app/components/ui/`.
- Download `ImageWithFallback.tsx` into `src/app/components/figma/`.
- Download `MetronicButton.tsx` + `MetronicBadge.tsx` into
  `src/app/components/showcase/_shared/`.
- Run `pnpm add` for every required dependency.

## Prompt to give the agent in the new project

```
Run this command to install the CISO Hub design system:

  curl -fsSL https://raw.githubusercontent.com/<YOU>/<REPO>/main/scripts/init-design-system.sh | bash

After it finishes, read CLAUDE.md at the project root — those rules are
mandatory for every UI component you build. Confirm install succeeded by
adding a test <MButton variant="primary">Hello</MButton> to App.tsx.
```

## Troubleshooting

- **`curl: (22) The requested URL returned error: 404`** — your `REPO` or
  `BRANCH` value in the script is wrong, or the repo is private and you didn't
  set `GH_TOKEN`.
- **`pnpm: command not found`** — Figma Make environments include pnpm. If a
  non-Figma-Make environment needs it, install Node 20+ and run
  `corepack enable`.
- **Re-running the script** is safe — it overwrites design-system files but
  leaves your application code alone.

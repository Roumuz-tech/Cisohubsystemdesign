import { Link } from "react-router";
import { ArrowRight, Palette, ShieldCheck, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MButton } from "../components/showcase/_shared/MetronicButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <header
        className="bg-background border-b border-border sticky top-0 flex items-center px-5 gap-4"
        style={{ height: "var(--header-height)", zIndex: "var(--z-header)" }}
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
              GRC · Cybersecurity Platform
            </div>
          </div>
        </div>
      </header>

      <main
        className="mx-auto flex flex-col gap-6 p-5 py-10"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div className="flex flex-col gap-2">
          <h1>CISO Hub</h1>
          <p className="text-muted-foreground">
            Bilingual GRC platform — Arabic-first RTL + English. Built on Tailwind v4 + shadcn/ui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="size-5 text-primary" />
                <CardTitle>Design System</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-muted-foreground">
                Foundation tokens, primitives, compositions, CISO patterns, and page templates.
              </p>
              <MButton variant="primary" asChild>
                <Link to="/design-system">
                  Open <ArrowRight className="size-4" />
                </Link>
              </MButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-primary" />
                <CardTitle>Quick Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-muted-foreground">
                Bilingual one-question-at-a-time experience. Get a first compliance baseline across 5 frameworks in minutes.
              </p>
              <div className="flex flex-col gap-2">
                <MButton variant="primary" asChild>
                  <Link to="/quick-assessment">
                    V1 — One-at-a-time <ArrowRight className="size-4" />
                  </Link>
                </MButton>
                <MButton variant="outline" asChild>
                  <Link to="/quick-assessment-v2">
                    V2 — Enterprise layout <ArrowRight className="size-4" />
                  </Link>
                </MButton>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-muted-foreground" />
                <CardTitle>Audit & Evidence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Coming soon — Evidence vault, attestations, audit packs.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

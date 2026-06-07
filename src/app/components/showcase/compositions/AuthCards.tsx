import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { MButton } from "../_shared/MetronicButton";

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-xs w-full max-w-[370px]">
      <div className="p-10">{children}</div>
    </div>
  );
}

function BackLink() {
  return (
    <a className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer">
      <ChevronLeft className="size-3.5" />
      Back to Login
    </a>
  );
}

export function SignUpCard() {
  return (
    <CardShell>
      <div className="mb-5">
        <div className="text-xl font-semibold tracking-tight">Create your account</div>
        <div className="text-sm text-muted-foreground mt-1.5">
          14-day free trial of CISO Hub. No card required.
        </div>
      </div>

      <form className="flex flex-col gap-3.5">
        <Input placeholder="Full name" className="h-[34px]" />
        <Input type="email" placeholder="Work email" className="h-[34px]" />
        <Input type="password" placeholder="Password" className="h-[34px]" />
        <Input type="password" placeholder="Confirm password" className="h-[34px]" />

        <label className="flex items-start gap-2 text-[13px] leading-[1.5] text-muted-foreground cursor-pointer mt-1">
          <Checkbox className="mt-0.5" />
          <span>
            I agree to the <a className="text-primary cursor-pointer hover:underline">Terms</a> and{" "}
            <a className="text-primary cursor-pointer hover:underline">Privacy Policy</a>
          </span>
        </label>

        <MButton type="submit" className="w-full">Create account</MButton>
      </form>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <a className="text-primary cursor-pointer hover:underline">Sign in</a>
      </div>
    </CardShell>
  );
}

export function ResetPasswordCard() {
  return (
    <CardShell>
      <div className="mb-5">
        <div className="text-xl font-semibold tracking-tight">Reset password</div>
        <div className="text-sm text-muted-foreground mt-1.5">
          Enter your email and we'll send a reset link.
        </div>
      </div>
      <form className="flex flex-col gap-3.5">
        <Input type="email" placeholder="Work email" className="h-[34px]" />
        <MButton type="submit" className="w-full">Send reset link</MButton>
      </form>
      <div className="mt-5">
        <BackLink />
      </div>
    </CardShell>
  );
}

export function TwoFactorCard() {
  const [code, setCode] = useState(["8", "3", "9", "", "", ""]);

  function update(i: number, v: string) {
    const next = [...code];
    next[i] = v.slice(0, 1);
    setCode(next);
  }

  return (
    <CardShell>
      <div className="text-center mb-5">
        <div className="text-xl font-semibold tracking-tight">Two-factor verification</div>
        <div className="text-sm text-muted-foreground mt-1.5">
          Enter the 6-digit code sent to your authenticator app.
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-5">
        {code.map((v, i) => {
          const filled = v !== "";
          return (
            <input
              key={i}
              value={v}
              onChange={(e) => update(i, e.target.value)}
              maxLength={1}
              className="w-10 h-10 text-center font-semibold text-lg bg-background text-foreground rounded-md outline-none border"
              style={{
                borderColor: filled ? "var(--primary)" : "var(--border)",
                boxShadow: filled
                  ? "0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent)"
                  : "var(--shadow-xs)",
              }}
            />
          );
        })}
      </div>

      <MButton className="w-full mb-3">Verify</MButton>

      <div className="text-center text-[13px] text-muted-foreground mb-2.5">
        Resend in <strong className="text-foreground font-medium">00:42</strong> ·{" "}
        <a className="text-primary opacity-50 cursor-not-allowed">Resend</a>
      </div>

      <BackLink />
    </CardShell>
  );
}

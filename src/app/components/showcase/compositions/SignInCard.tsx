import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";

export function SignInCard() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-xs w-full max-w-[370px]">
      <div className="p-10">
        <div className="mb-5">
          <div className="text-xl font-semibold tracking-tight">Sign in to CISO Hub</div>
          <div className="text-sm text-muted-foreground mt-1.5">
            Welcome back. Continue to Comply.
          </div>
        </div>

        <Button variant="outline" className="w-full h-[34px] mb-3.5 gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 mb-3.5">
          <div className="flex-1 h-px bg-border" />
          <div className="text-xs font-medium text-muted-foreground">OR</div>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form className="flex flex-col gap-3.5">
          <Input type="email" placeholder="Email" className="h-[34px]" />
          <Input type="password" placeholder="Password" className="h-[34px]" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox />
              <span>Remember me</span>
            </label>
            <a className="text-sm text-primary cursor-pointer hover:underline">Forgot?</a>
          </div>
          <Button type="submit" className="w-full h-[34px]">Sign In</Button>
        </form>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          New here? <a className="text-primary cursor-pointer hover:underline">Create account</a>
        </div>
      </div>
    </div>
  );
}

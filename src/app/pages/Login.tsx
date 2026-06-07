import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Shield, ShieldCheck, Lock, Globe } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";
import { MButton } from "../components/showcase/_shared/MetronicButton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1648415383716-f9828037d2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground grid grid-cols-1 lg:grid-cols-2">
      <aside className="relative hidden lg:block overflow-hidden">
        <ImageWithFallback
          src={HERO_IMAGE}
          alt="Cybersecurity background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(42,48,66,0.92) 0%, rgba(30,58,138,0.85) 60%, rgba(59,130,246,0.75) 100%)",
          }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              C
            </div>
            <div className="text-[12px] text-white/80">CISO Hub Platform</div>
          </div>

          <div className="flex flex-col items-center text-center gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <Shield className="size-10 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-white">CISO Hub</h1>
            <p className="text-white/80 max-w-md">
              منصة متكاملة للحوكمة وإدارة المخاطر والامتثال في الأمن السيبراني
            </p>
            <div className="flex items-center gap-2 text-[11px] text-white/70">
              <ShieldCheck className="size-3.5" />
              <span>معتمدة دولياً</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] text-white/70 flex-wrap">
            <span>ISO 27001</span>
            <span>SOC 2</span>
            <span>NCA ECC</span>
            <span>SAMA CSF</span>
            <span>PDPL</span>
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center p-5 sm:p-10 bg-muted/40">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
              >
                C
              </div>
              <div>
                <div className="font-semibold tracking-tight">CISO Hub</div>
                <div className="text-[11px] text-muted-foreground -mt-0.5">
                  منصة الأمن السيبراني
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground"
            >
              <Globe className="size-3.5" />
              <span>EN</span>
            </button>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="flex flex-col gap-1 text-end">
                <h2>تسجيل الدخول</h2>
                <p className="text-muted-foreground">
                  أدخل بيانات الاعتماد الخاصة بك للوصول إلى المنصة
                </p>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-end">
                    اسم المستخدم
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    dir="ltr"
                    className="text-start"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="text-end">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      dir="ltr"
                      className="text-start pe-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                      className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link to="#" className="text-[12px] text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="cursor-pointer">
                      تذكرني
                    </Label>
                  </div>
                </div>

                <MButton variant="primary" type="submit" className="w-full">
                  تسجيل الدخول
                </MButton>

                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-[11px] text-muted-foreground">أو</span>
                  <Separator className="flex-1" />
                </div>

                <MButton variant="outline" type="button" className="w-full">
                  <Lock className="size-4" />
                  الدخول عبر SSO
                </MButton>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-muted-foreground">
            بحاجة إلى حساب؟{" "}
            <Link to="#" className="text-primary hover:underline">
              تواصل مع المسؤول
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

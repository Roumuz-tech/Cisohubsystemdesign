import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../ui/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 font-medium rounded-md border border-transparent cursor-pointer whitespace-nowrap shadow-xs transition-colors disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]",
        mono: "bg-[var(--mono)] text-[var(--mono-foreground)] hover:bg-zinc-800",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700",
        outline: "bg-background text-foreground border-border hover:bg-accent",
        dashed: "bg-background text-foreground border border-dashed border-zinc-300 dark:border-zinc-600 hover:bg-accent",
        ghost: "bg-transparent shadow-none text-foreground hover:bg-accent",
        dim: "bg-transparent shadow-none text-muted-foreground hover:text-foreground",
        link: "bg-transparent shadow-none text-primary p-0 h-auto rounded-none hover:underline",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-[34px] px-3 text-[13px]",
        lg: "h-10 px-4 text-sm",
        icon: "size-[34px] p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface MButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const MButton = React.forwardRef<HTMLButtonElement, MButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  }
);
MButton.displayName = "MButton";

"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "utils";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      p: "leading-7",
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    size: {
      default: "",
      muted: "text-muted-foreground",
      lg: "text-lg font-semibold",
      sm: "text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    variant: "p",
    size: "default",
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  children?: React.ReactNode;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}

export default function Typography({
  children,
  variant,
  className,
  component,
  size,
}: TypographyProps) {
  const Comp = component ? component : variant ? variant : "h1";
  return (
    <Comp className={cn(typographyVariants({ variant, className, size }))}>
      {children}
    </Comp>
  );
}

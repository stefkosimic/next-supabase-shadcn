"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const ColorCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-8 shrink-0 rounded-full duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 shadow-lg focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      !props.checked && "bg-white" // default background color when unchecked
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-primary")}
    >
      <Check className="size-5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
ColorCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { ColorCheckbox };

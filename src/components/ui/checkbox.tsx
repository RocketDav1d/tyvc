import * as React from "react"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer shrink-0 w-4 h-4 border rounded-sm border-slate-200 border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:data-[state=checked]:text-slate-900 dark:data-[state=checked]:bg-slate-50 dark:focus-visible:ring-slate-300 data-[state=checked]:text-slate-50 data-[state=checked]:bg-slate-900",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex justify-center items-center text-current")}
    >
      <Check className="w-4 h-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

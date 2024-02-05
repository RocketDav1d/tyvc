import * as React from "react"

import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer shrink-0 w-11 h-6 inline-flex items-center border-2 rounded-full border-transparent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "w-5 h-5 block bg-white rounded-full ring-0 shadow-lg transition-transform pointer-events-none dark:bg-slate-950 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

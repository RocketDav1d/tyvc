import * as React from "react"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative w-full flex items-center touch-none select-none",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative grow w-full h-2 overflow-hidden bg-slate-100 rounded-full dark:bg-slate-800">
      <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="w-5 h-5 block bg-white border-2 rounded-full border-slate-900 ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-950 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

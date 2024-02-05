import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-slate-100 rounded-md animate-pulse dark:bg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton }

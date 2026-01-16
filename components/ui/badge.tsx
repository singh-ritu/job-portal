import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-[#3357ac] text-white": variant === "default",
          "bg-gray-100 text-gray-800": variant === "secondary",
          "border border-gray-300 text-gray-800": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }

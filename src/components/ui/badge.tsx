import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 border-2 border-black px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        secondary: "bg-[#f5f5f5] text-black",
        destructive: "bg-[#FF3B30] text-white",
        outline: "bg-white text-black",

        // Status-specific variants
        applied: "bg-[#2979FF] text-white",
        shortlisted: "bg-[#FFE600] text-black",
        finalist: "bg-[#FF6D00] text-white",
        won: "bg-[#00C853] text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md",
        outline:
          "border border-zinc-800 bg-transparent hover:bg-zinc-900 hover:text-zinc-100",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        ghost:
          "hover:bg-zinc-900 hover:text-zinc-100",
        destructive:
          "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        link: "text-indigo-400 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-8 gap-1 rounded-md px-2.5 text-sm",
        lg: "h-10 gap-1.5 px-4",
        icon: "size-9 flex items-center justify-center",
        "icon-xs":
          "size-6 rounded-md flex items-center justify-center",
        "icon-sm":
          "size-8 rounded-md flex items-center justify-center",
        "icon-lg": "size-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

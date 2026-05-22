"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

const DialogContext = React.createContext<{
  open?: boolean
  setOpen?: (open: boolean) => void
}>({})

interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = React.useCallback((val: boolean) => {
    if (!isControlled) {
      setInternalOpen(val)
    }
    if (onOpenChange) {
      onOpenChange(val)
    }
  }, [isControlled, onOpenChange])

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

function DialogTrigger({ className, asChild, children, ...props }: DialogTriggerProps) {
  const { setOpen } = React.useContext(DialogContext)
  
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e)
        setOpen?.(true)
      }
    })
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => setOpen?.(true)}
      {...props}
    >
      {children}
    </button>
  )
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function DialogOverlay() {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <div
      onClick={() => setOpen?.(false)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
    />
  )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean
}

function DialogContent({ className, children, showCloseButton = true, ...props }: DialogContentProps) {
  const { open, setOpen } = React.useContext(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <DialogOverlay />
      <div
        className={cn(
          "relative z-50 w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800/80 p-5 shadow-2xl text-zinc-100 transition-all focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            type="button"
            onClick={() => setOpen?.(false)}
            className="absolute top-4 right-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-left mb-4", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-zinc-100 font-sans",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-5",
        className
      )}
      {...props}
    />
  )
}

function DialogClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <button
      type="button"
      className={className}
      onClick={() => setOpen?.(false)}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogPortal,
  DialogOverlay
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon } from "lucide-react"

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  open?: boolean
  setOpen?: (open: boolean) => void
  label?: string
  setLabel?: (label: string) => void
}>({})

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

function Select({ value, defaultValue, onValueChange, children }: SelectProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [label, setLabel] = React.useState("")
  
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : internalValue

  const handleValueChange = React.useCallback((val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    if (onValueChange) {
      onValueChange(val)
    }
    setInternalOpen(false)
  }, [isControlled, onValueChange])

  return (
    <SelectContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        open: internalOpen,
        setOpen: setInternalOpen,
        label,
        setLabel
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { open, setOpen } = React.useContext(SelectContext)
  
  return (
    <button
      type="button"
      onClick={() => setOpen?.(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-zinc-800 bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 text-left text-zinc-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 opacity-50 text-zinc-400" />
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
}

function SelectValue({ placeholder }: SelectValueProps) {
  const { value, label } = React.useContext(SelectContext)
  return <span className="truncate">{label || value || placeholder}</span>
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { open, setOpen } = React.useContext(SelectContext)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen?.(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl animate-in fade-in-80 duration-100 mt-1 max-h-60 w-full",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function SelectItem({ className, value, children, ...props }: SelectItemProps) {
  const { value: activeValue, onValueChange, setLabel } = React.useContext(SelectContext)
  const isActive = activeValue === value

  React.useEffect(() => {
    if (isActive && children) {
      setLabel?.(String(children))
    }
  }, [isActive, children, setLabel])

  return (
    <div
      onClick={() => onValueChange?.(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-zinc-800 hover:text-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-zinc-300 cursor-pointer",
        isActive && "bg-zinc-800 text-zinc-100 font-medium",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {isActive && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <CheckIcon className="h-4 w-4 text-indigo-400" />
        </span>
      )}
    </div>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }

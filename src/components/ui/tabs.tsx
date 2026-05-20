"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function Tabs({ value, defaultValue, onValueChange, className, ...props }: TabsProps) {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || "")
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : selectedValue

  const handleValueChange = React.useCallback((val: string) => {
    if (!isControlled) {
      setSelectedValue(val)
    }
    if (onValueChange) {
      onValueChange(val)
    }
  }, [isControlled, onValueChange])

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn("flex flex-col gap-2", className)} {...props} />
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "line"
}

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex w-full items-center justify-start rounded-lg bg-zinc-950 p-[3px] text-zinc-400 border border-zinc-800/60",
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = React.useContext(TabsContext)
  const isActive = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onValueChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer flex-1",
        isActive
          ? "bg-zinc-800 text-zinc-100 shadow-sm font-semibold border border-zinc-700/50"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: activeValue } = React.useContext(TabsContext)
  const isActive = activeValue === value

  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      className={cn(
        "mt-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

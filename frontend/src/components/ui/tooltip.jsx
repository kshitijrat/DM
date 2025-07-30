"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"


const TooltipProvider_cus = TooltipPrimitive.Provider

const Tooltip_cus = TooltipPrimitive.Root

const TooltipTrigger_cus = TooltipPrimitive.Trigger

const TooltipContent_cus = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md  bg-[rgba(9,9,20,0.8)] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))

TooltipContent_cus.displayName = TooltipPrimitive.Content.displayName

export { Tooltip_cus, TooltipTrigger_cus, TooltipContent_cus, TooltipProvider_cus }

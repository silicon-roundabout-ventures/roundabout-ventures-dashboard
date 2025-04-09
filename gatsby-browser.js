import "./src/index.css"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./src/components/ui/tooltip"
import { Toaster } from "./src/components/ui/toaster"
import { Toaster as Sonner } from "./src/components/ui/sonner"

const queryClient = new QueryClient()

// Wraps every page with providers
export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {element}
      </TooltipProvider>
    </QueryClientProvider>
  )
} 
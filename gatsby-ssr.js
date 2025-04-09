import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./src/components/ui/tooltip"

const queryClient = new QueryClient()

// Use the same providers for SSR
export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {element}
      </TooltipProvider>
    </QueryClientProvider>
  )
} 
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./src/components/parts/tooltip"
import { AuthProvider } from "./src/context/AuthContext"

const queryClient = new QueryClient()

// Use the same providers for SSR
export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {element}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

// Removed Substack feed config and script injection as we are now using build-time RSS fetching




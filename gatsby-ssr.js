import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./src/components/parts/tooltip"

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

// Inject Substack feed config and script at end of body
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="substack-feed-config"
      dangerouslySetInnerHTML={{ __html: `
        window.SubstackFeedWidget = {
          substackUrl: "blog.siliconroundabout.ventures",
          posts: 8,
          layout: "right",
          colors: {
            primary: "#FFFFFF",
            secondary: "#DBDBDB",
            background: "#000000",
          }
        };
      ` }}
    />,
    <script key="substack-feed" src="https://js.supascribe.com/v1/loader/9HiLKgCn0wTKSjpJwu2fHbigpDx2.js" async />,
  ]);
};




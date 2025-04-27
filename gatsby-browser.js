import "./src/styles/global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./src/components/parts/tooltip"
import { Toaster } from "./src/components/parts/toaster"
import { Toaster as Sonner } from "./src/components/parts/sonner"

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

// Inject Substack feed widget on client entry
export const onClientEntry = () => {
  if (typeof window !== 'undefined') {
    window.SubstackFeedWidget = {
      substackUrl: "blog.siliconroundabout.ventures",
      posts: 8,
      layout: "right",
      colors: {
        primary: "#FFFFFF",
        secondary: "#DBDBDB",
        background: "#000000",
      },
    };
    if (!document.getElementById('substack-embed-script')) {
      const script = document.createElement('script');
      script.id = 'substack-embed-script';
      script.src = 'https://substackapi.com/embeds/feed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }
};
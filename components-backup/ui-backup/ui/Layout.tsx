/**
 * Main layout component for the application
 * Provides consistent structure and error handling for all pages
 */
import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ErrorBoundary from './ErrorBoundary';

/**
 * Props for the Layout component
 */
interface LayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Page title - will be set in <title> and meta tags */
  title?: string
  /** Current location object from Gatsby */
  location: { 
    pathname: string;
  }
}

/**
 * Main Layout component that wraps all pages
 * Provides error boundary, navigation, and footer
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Roundabout Ventures", 
  location 
}) => {
  return (
    <ErrorBoundary fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar location={location} />
        <main className="flex-grow container mx-auto p-4">
          <div className="p-6 bg-card rounded-lg shadow-sm my-8">
            <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
            <p className="mb-4">We encountered an error while rendering this page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Reload page
            </button>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <div className="flex flex-col min-h-screen dark:text-white dark:bg-slate-950">
        <Navbar location={location} />
        <main className="flex-grow my-4 md:my-8">
          <div 
            className="page-transition"
            style={{ 
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Layout
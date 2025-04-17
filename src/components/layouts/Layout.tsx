/**
 * Main layout component for the application
 * Provides consistent structure and error handling for all pages
 */
import React from "react"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import ErrorBoundary from '../common/ErrorBoundary';
import { Helmet } from "react-helmet";

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
      {/* Meta tags for SEO */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Silicon Roundabout Ventures - Community-Driven VC firm backing Deep Tech and Big Data startups" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://siliconroundabout.ventures${location.pathname}`} />
        <meta property="og:description" content="Community-Driven VC firm backing Deep Tech and Big Data startups" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-srv-dark">
        <Navbar location={location} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Layout
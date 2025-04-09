import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Helmet } from "react-helmet"

interface LayoutProps {
  children: React.ReactNode
  title?: string
  location?: {
    pathname: string;
  }
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Roundabout Ventures", location }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Community-Driven VC firm backing Deep Tech and Big Data startups" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar location={location} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout 
import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

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
      <div className="flex flex-col min-h-screen bg-srv-dark">
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
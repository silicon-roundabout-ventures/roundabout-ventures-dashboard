import React, { useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const NotFound = ({ location }) => {
  useEffect(() => {
    // Only log in browser environment
    if (typeof window !== 'undefined') {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <Layout title="404 - Page Not Found | Roundabout Ventures">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-srv-light mb-4">Oops! Page not found</p>
          <Link to="/" className="text-srv-teal hover:text-srv-teal/80 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

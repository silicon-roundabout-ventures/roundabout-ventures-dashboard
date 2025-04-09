import React from 'react';
import { Link } from 'gatsby';
import { Button } from "../components/ui/button";
import ParticleBackground from '../components/common/ParticleBackground';
import { ArrowRight } from 'lucide-react';
import Layout from "../components/common/Layout";

// Actual content component
const IndexContent = () => {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            &lt;Silicon Roundabout Ventures/&gt;
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl">
            Community-Driven VC firm backing{" "}
            <span className="text-srv-teal">Deep Tech and Big Data</span>{" "}
            startups at{" "}
            <span className="text-srv-pink">pre-seed</span> and{" "}
            <span className="text-srv-pink">seed</span>
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/portfolio">
                Our Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/who-we-are">
                About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            &lt;What We Offer/&gt;
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-card">
              <h3 className="text-xl font-bold text-white mb-4">Pre-Seed & Seed Capital</h3>
              <p className="text-white/80">
                Initial investments of £100k-£500k in technical founding teams with strong domain expertise
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="glass-card">
              <h3 className="text-xl font-bold text-white mb-4">Community Access</h3>
              <p className="text-white/80">
                Leverage our network of 15,000+ engineers, entrepreneurs and investors
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="glass-card">
              <h3 className="text-xl font-bold text-white mb-4">Technical Expertise</h3>
              <p className="text-white/80">
                Hands-on support from partners with technical backgrounds who understand your product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the Gatsby entry point for the homepage
const IndexPage = () => {
  return (
    <Layout title="Roundabout Ventures">
      <IndexContent />
    </Layout>
  );
};

export default IndexPage;
export { IndexContent };

// Add SEO metadata for this page using Gatsby's built-in Head API
export const Head = () => (
  <>
    <title>Roundabout Ventures</title>
    <meta name="description" content="Community-Driven VC firm backing Deep Tech and Big Data startups" />
  </>
);

import React from 'react';
import { Link } from 'gatsby';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const ForInvestorsContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-mono">&lt;For Investors/&gt;</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            Join us as a Limited Partner and be part of the next generation of technology investments.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">&lt;Join Our Fund/&gt;</h2>
            <p className="text-white mb-6">
              Silicon Roundabout Ventures offers a unique opportunity for investors to access high-quality deep tech and big data startups from the UK and Europe. Our community-driven approach allows us to source deals that others miss.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">&lt;Key Benefits/&gt;</h3>
            <ul className="list-disc pl-6 mb-8 text-white space-y-3">
              <li>Access to pre-seed and seed stage deep tech investments</li>
              <li>Proprietary deal flow from our 15,000+ community</li>
              <li>Technical due diligence from experts who understand the technology</li>
              <li>Quarterly LP updates and annual LP meetings</li>
              <li>Co-investment opportunities in select portfolio companies</li>
            </ul>
            
            <div className="mt-8 text-center">
              <Link 
                to="/apply" 
                className="bg-white hover:bg-gray-200 text-srv-dark font-medium py-3 px-8 rounded-md transition-colors inline-block"
              >
                Apply to Become an LP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForInvestors = () => {
  return (
    <Layout title="For Investors - Roundabout Ventures">
      <ForInvestorsContent />
    </Layout>
  );
};

export default ForInvestors;

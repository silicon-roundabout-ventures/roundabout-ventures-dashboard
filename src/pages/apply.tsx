import React from 'react';
import ParticleBackground from '@/components/core/ParticleBackground';
import Layout from '@/components/core/Layout';

const ApplyContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16"> {/* Updated padding top to match other pages */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Apply for Funding/&gt;</h1>
            <p className="text-white/90">
              We invest in exceptional founders with innovative ideas. 
              Share your vision and let's build something great.
            </p>
          </div>
          
          <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">
                  Loading application form...
                </div>
              </div>
              <iframe 
                className="airtable-embed relative z-0" 
                src="https://airtable.com/embed/appVGtkUnFhZu4QDG/pageSXiQeh83Jd3Jq/form" 
                frameBorder="0" 
                onWheel={() => {}} 
                width="100%" 
                height="3100" 
                style={{ background: 'transparent' }}
                title="Funding Application Form"
                onLoad={(e) => {
                  // Hide the loading indicator when iframe is loaded
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.firstChild) {
                    (parent.firstChild as HTMLElement).style.display = 'none';
                  }
                }}
              ></iframe>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/90">
              <span className="text-srv-teal mr-1">💬</span>Questions? Connect with us on LinkedIn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Apply = () => {
  return (
    <Layout title="Apply for Funding - Roundabout Ventures">
      <ApplyContent />
    </Layout>
  );
};

export default Apply;

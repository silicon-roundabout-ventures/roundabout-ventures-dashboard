import React from 'react';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

// In Gatsby, the default export is what becomes the page component
const LPEnquiriesPage = () => {
  return (
    <Layout title="Investor Interest - Silicon Roundabout Ventures">
      <div className="min-h-screen pt-28 pb-16">  {/* Updated pt to match other pages */}
        <ParticleBackground />
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Investor Interest/&gt;</h1>
              <p className="text-srv-gray">
                Interested in becoming a Limited Partner with Silicon Roundabout Ventures? 
                Fill out the form below and we'll be in touch.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSftLkGW1_ajVhVJ7462svgRzZgIniF8Hz31DD11ZfQcODvQNg/viewform?embedded=true" 
                width="100%"
                height={1978}
                frameBorder={0} 
                marginHeight={0} 
                marginWidth={0}
                title="LP Interest Form"
              >Loading…</iframe>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-srv-gray">
                For investment-related inquiries, please connect with us on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// This is what Gatsby uses for the page
export default LPEnquiriesPage;

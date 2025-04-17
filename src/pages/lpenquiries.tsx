import React from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';
import Layout from '../components/core/Layout';

// In Gatsby, the default export is what becomes the page component
const LPEnquiriesPage = ({ location = { pathname: '/lpenquiries' } }) => {
  return (
    <Layout title="Investor Interest - Silicon Roundabout Ventures" location={location}>
      <div className="min-h-screen pt-28 pb-16">  {/* Updated pt to match other pages */}
        <ParticleBackground />
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Investor Interest/&gt;</h1>
              <p className="text-white/90">
                Interested in becoming an LP with Silicon Roundabout Ventures? 
                Complete this form to connect with our team.
              </p>
            </div>
            
            <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                  <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">
                    Loading investor form...
                  </div>
                </div>
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSftLkGW1_ajVhVJ7462svgRzZgIniF8Hz31DD11ZfQcODvQNg/viewform?embedded=true" 
                  width="100%"
                  height={1978}
                  frameBorder={0} 
                  marginHeight={0} 
                  marginWidth={0}
                  title="LP Interest Form"
                  className="bg-transparent relative z-0"
                  onLoad={(e) => {
                    // Hide the loading indicator when iframe is loaded
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.firstChild) {
                      (parent.firstChild as HTMLElement).style.display = 'none';
                    }
                  }}
                >Loading…</iframe>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-white/90">
                <span className="text-srv-teal mr-1">👤</span>For investment inquiries, connect with us on LinkedIn.
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

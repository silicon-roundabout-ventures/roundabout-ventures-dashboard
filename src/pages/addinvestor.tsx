import React from 'react';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import Layout from '@/components/layouts/Layout';

const AddInvestorPage = () => {
  return (
    <Layout title="Add Your Firm - Silicon Roundabout Ventures">
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Add Your Firm/&gt;</h1>
              <p className="text-white/90">
                Want to be listed on our Deeptech Investors page?
                Complete this form and our team will review your submission.
              </p>
            </div>

            <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                  <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">
                    Loading form...
                  </div>
                </div>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSc6Vc6qvSATmb99ih_KE0Ravxio11aeZ4ZTx559jYMibdIb1w/viewform?embedded=true"
                  width="100%"
                  height={2202}
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  title="Add Your Firm"
                  className="bg-transparent relative z-0"
                  onLoad={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.firstChild) {
                      (parent.firstChild as HTMLElement).style.display = 'none';
                    }
                  }}
                >Loading…</iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddInvestorPage;

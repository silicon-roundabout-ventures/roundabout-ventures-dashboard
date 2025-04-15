import React from 'react';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const ApplyContent = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Apply for Funding/&gt;</h1>
            <p className="text-srv-gray">
              We're looking for exceptional founders building innovative solutions. 
              Tell us about your startup and how we can help you grow.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
            <iframe 
              className="airtable-embed" 
              src="https://airtable.com/embed/appVGtkUnFhZu4QDG/pageSXiQeh83Jd3Jq/form" 
              frameBorder="0" 
              onWheel={() => {}} 
              width="100%" 
              height="3100" 
              style={{ background: 'transparent', border: '1px solid #ccc' }}
              title="Funding Application Form"
            ></iframe>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-srv-gray">
              For questions, please connect with us on LinkedIn.
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

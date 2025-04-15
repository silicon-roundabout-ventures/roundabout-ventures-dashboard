
import React from 'react';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const CommunityContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Community/&gt;</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
           <h2 className="text-2xl font-bold text-white mb-6">&lt;Upcoming Events/&gt;</h2>
            <p className="text-white mb-6">Connect with like-minded innovators and industry leaders at our upcoming events.</p>
            <h3 className="text-xl font-bold text-white mb-6">Fund & LP Events:</h3>
            <div className="h-[400px] overflow-hidden rounded-lg relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">Loading events calendar...</div>
              </div>
              {/* Embed lu.ma events here */}
              <iframe 
                src="https://lu.ma/embed/calendar/cal-LtL994FHFsKgfPv/events" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ borderRadius: '8px', border: 'none' }}
                allowFullScreen
                title="Silicon Roundabout Events"
                aria-hidden="false"
                tabIndex={0}
                className="relative z-0"
                onLoad={(e) => {
                  // Hide the loading indicator when iframe is loaded
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.firstChild) {
                    (parent.firstChild as HTMLElement).style.display = 'none';
                  }
                }}
                />
            </div>
            <br />
            <h3 className="text-xl font-bold text-white mb-6">Community Events:</h3>
            <div className="h-[400px] overflow-hidden rounded-lg relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">Loading community events...</div>
              </div>
              <iframe 
                src="https://lu.ma/embed/calendar/cal-LbyWro3ZdQSojJX/events" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ borderRadius: '8px', border: 'none' }}
                allowFullScreen
                title="Silicon Roundabout x Frontier Deep Tech Events"
                className="relative z-0"
                onLoad={(e) => {
                  // Hide the loading indicator when iframe is loaded
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.firstChild) {
                    (parent.firstChild as HTMLElement).style.display = 'none';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  return (
    <Layout title="Community - Roundabout Ventures">
      <CommunityContent />
    </Layout>
  );
};

export default Community;

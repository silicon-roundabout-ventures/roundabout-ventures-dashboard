
import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const Community = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Community</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">&lt;Upcoming Events/&gt;</h2>
            <p className="text-white mb-6">Connect with like-minded innovators and industry leaders at our upcoming events.</p>
            
            <div className="h-[600px] overflow-hidden rounded-lg">
              {/* Embed lu.ma events here */}
              <iframe 
                src="https://lu.ma/embed-checkout/evt-IDeEvnIYsqkgKkL" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ borderRadius: '8px', border: 'none' }}
                allowFullScreen
                title="Silicon Roundabout Events"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

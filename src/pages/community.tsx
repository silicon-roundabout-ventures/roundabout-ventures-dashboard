import React, { useState } from 'react';
import { Link } from 'gatsby';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import Layout from '@/components/layouts/Layout';

const CommunityContent = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="mb-16 pt-8">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 px-4 text-center">&lt;Community/&gt;</h1>
          <p className="text-lg text-white max-w-2xl mx-auto px-4 text-center">
            Join a community of thousands of Deep Tech founders, engineers, and VCs.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        
        <div className="max-w-5xl mx-auto">
          {/* Join Community Section */}
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">&lt;Join Our Community/&gt;</h2>
            {!showSubscribe ? (
              <button
                onClick={() => setShowSubscribe(true)}
                className="px-8 py-4 bg-srv-teal hover:bg-srv-teal/80 text-black font-bold rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Join Community
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <div className="flex justify-center">
                {/* Substack embed form: free email subscription only, no paid tiers shown */}
                <iframe
                  src="https://blog.siliconroundabout.ventures/embed"
                  width="480"
                  height="150"
                  frameBorder="0"
                  scrolling="no"
                  title="Subscribe to Silicon Roundabout Ventures"
                  style={{ borderRadius: '8px', border: 'none', maxWidth: '100%' }}
                />
              </div>
            )}

            <div className="text-white text-left mt-16 max-w-3xl mx-auto">
              <p className="font-bold mb-4">Here is what you&apos;ll find inside our community:</p>
              <ul className="space-y-4">
                <li>
                  📅 Invitation-only dinners, roundtables, and events across London and Europe.
                </li>
                <li>
                  🦄 Live webinars and Q&amp;As with leading Deep Tech founders and VCs.
                </li>
                <li>
                  🛠️ A proprietary Investor Directory, hiring frameworks, and other tools we&apos;re launching soon.
                </li>
              </ul>
            </div>
          </div>

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
                src="https://luma.com/embed/calendar/cal-LtL994FHFsKgfPv/events" 
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
            <h3 className="text-xl font-bold text-white mb-8">Community Events:</h3>
            <div className="h-[400px] overflow-hidden rounded-lg relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">Loading community events...</div>
              </div>
              <iframe 
                src="https://luma.com/embed/calendar/cal-LbyWro3ZdQSojJX/events" 
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

          <div className="flex justify-center mb-16">
              <Link
                to="/buildinginpublic"
                className="px-8 py-4 bg-srv-yellow hover:bg-srv-yellow/80 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                Hear about new events through our Build in Public blog
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

          {/* Deeptech Investors Section */}
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">&lt;Deeptech Investors/&gt;</h2>
            <p className="text-white/90 mb-6">
              Explore the deeptech VC firms, angels, and investors in our network. Browse by stage, industry, and geography.
            </p>
            <Link
              to="/investors/"
              className="px-8 py-4 bg-srv-teal hover:bg-srv-teal/80 text-black font-bold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Browse Deeptech Investors
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
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

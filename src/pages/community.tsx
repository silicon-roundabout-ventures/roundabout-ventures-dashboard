import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';
import ImageSlider from '../components/common/ImageSlider';

const CommunityContent = () => {

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      {/* Hero Section with Background Image */}
      <div className="relative mb-16">
        <div className="w-full h-[50vh] overflow-hidden rounded-lg relative">
          {/* Use the reusable ImageSlider component */}
          <ImageSlider 
            imagePathPattern="community\/events"
            transitionSpeed={4000}
            overlayOpacity={50}
          />
          
          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 px-4 text-center">&lt;Community/&gt;</h1>
            <p className="text-lg text-white max-w-2xl mx-auto px-4 text-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        
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
            <h3 className="text-xl font-bold text-white mb-8">Community Events:</h3>
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

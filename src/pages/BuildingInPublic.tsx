
import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { toast } from "sonner";
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    SubstackFeedWidget?: {
      substackUrl: string;
      posts: number;
      layout: string;
      colors: {
        primary: string;
        secondary: string;
        background: string;
      };
    };
  }
}

const BuildingInPublic = () => {
  useEffect(() => {
    // Set up Substack Feed Widget
    window.SubstackFeedWidget = {
      substackUrl: "blog.siliconroundabout.ventures",
      posts: 8,
      layout: "right",
      colors: {
        primary: "#FFFFFF",
        secondary: "#DBDBDB",
        background: "#000000",
      }
    };

    // Load the Substack API script
    const script = document.createElement('script');
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Building our VC firm in Public</h1>
        </div>
        
        <div className="max-w-4xl mx-auto bg-srv-dark bg-opacity-70 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <p className="text-white text-lg mb-6">
            Every month Silicon Roundabout Ventures GP, Francesco Perticarari, sends this public list the (almost identical) update sent to our LPs. Exclusive perks, information, and sensitive information may need to be redacted, but as much as possible is shared publicly. We also, occasionally, share research articles, data on the state of European Deeptech, and tools we used to build our VC firm.
          </p>
          
          <blockquote className="border-l-4 border-srv-yellow pl-4 my-6 italic text-srv-gray">
            <p className="text-white">"Francesco is blazing the trail, so that others can run along the path."</p>
            <footer className="text-srv-gray mt-2">─ Dave Neumann, Molten Ventures FoF Team & Silicon Roundabout Ventures LP</footer>
          </blockquote>
          
          <div className="mb-8 text-center">
            <p className="text-white mb-4">Get the next report in your inbox:</p>
            <a 
              href="https://blog.siliconroundabout.ventures/subscribe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-srv-dark font-medium py-3 px-8 rounded-md transition-colors inline-block"
            >
              Subscribe to Blog Updates
            </a>
          </div>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-6">Posts</h2>
          <div id="substack-feed-embed" className="min-h-[600px] border border-gray-800 rounded-lg p-4 bg-black">
            {/* Substack feed will be loaded here */}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Check out more articles:</h2>
            <a 
              href="https://blog.siliconroundabout.ventures" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-srv-dark font-medium py-3 px-8 rounded-md transition-colors inline-block"
            >
              Visit Our Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingInPublic;

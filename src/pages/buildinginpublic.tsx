
import React, { useEffect } from 'react';
import ParticleBackground from '@/components/core/ParticleBackground';
import { Button } from "@/components/ui/button";
import Layout from '@/components/core/Layout';

const BuildingInPublicContent = () => {
  useEffect(() => {
    // Create Substack feed widget config
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
    script.src = 'https://substackapi.com/embeds/feed.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.SubstackFeedWidget;
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Building in Public/&gt;</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            Sharing our journey as we build Silicon Roundabout Ventures.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/70 backdrop-blur-sm border border-white/10 p-8 rounded-lg mb-12">
            <p className="text-xl text-white mb-6 text-center">
              Every month Silicon Roundabout Ventures GP, Francesco Perticarari, sends this public list the (almost identical) 
              update sent to our LPs. Exclusive perks, information, and sensitive information may need to be redacted, 
              but as much as possible is shared publicly.
            </p>
            
            <div className="italic text-center border-l-4 border-srv-yellow pl-4 py-2 my-8 text-white">
              <p className="mb-2">"Francesco is blazing the trail, so that others can run along the path."</p>
              <p className="text-srv-gray">─ Dave Neumann, Molten Ventures FoF Team & Silicon Roundabout Ventures LP</p>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-white mb-4">Get the next report in your inbox:</p>
              <a 
                href="https://blog.siliconroundabout.ventures/subscribe" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="default" size="lg" className="bg-srv-yellow text-black hover:bg-srv-yellow/80">
                  New Articles Release Signup
                </Button>
              </a>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-6 text-center">&lt;Latest Posts/&gt;</h2>
            
            {/* Substack Feed */}
            <div id="substack-feed-embed" className="h-[600px] overflow-auto mb-8"></div>
            
            <div className="text-center mt-12">
              <p className="text-white mb-6">Check out more articles:</p>
              <a 
                href="https://blog.siliconroundabout.ventures" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="lg" className="border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black">
                  View All Posts
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BuildingInPublic = () => {
  return (
    <Layout title="Building in Public - Roundabout Ventures">
      <BuildingInPublicContent />
    </Layout>
  );
};

export default BuildingInPublic;

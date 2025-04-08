
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ParticleBackground from '../components/ParticleBackground';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <div className="relative z-10 pt-20 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4">
          <div className="h-[85vh] flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Silicon Roundabout Ventures
              </h1>
              
              <div className="font-mono text-xl md:text-2xl mb-8 text-white">
                <p className="mb-1">Connecting (</p>
                <p className="mb-1 ml-4"><span className="text-srv-yellow">Capital</span>) &#123;</p>
                <p className="mb-1 ml-8"><span className="text-srv-pink">with</span></p>
                <p className="mb-1 ml-12">Next-Generation.<span className="text-srv-yellow">Technologies</span></p>
                <p className="mb-1 ml-8"><span className="text-srv-pink">in</span> Computer & Physical</p>
                <p className="mb-1 ml-12"><span className="text-srv-yellow">Science</span></p>
                <p className="mb-1 ml-4">&#125;</p>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://airtable.com/shrWqbcCtbPaXXfQ3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-white/90 text-black px-6 py-3 rounded-md font-mono transition-all"
                >
                  <span>Apply for Funding</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Who We Are Section */}
        <div className="bg-black/70 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-10 font-mono">&lt;Who we are/&gt;</h2>
              
              <p className="text-xl text-white mb-12">
                We are a Community-Driven VC firm backing{" "}
                <span className="text-srv-yellow">Deep Tech and Big Data</span>{" "}
                startups at{" "}
                <span className="text-srv-pink">pre-seed</span> and{" "}
                <span className="text-srv-pink">seed</span>,
                leveraging our community of 15,000 founders and engineers and
                our live pitching competitions that over the years featured
                winners now worth over £6 Billion.
              </p>
              
              <div className="flex flex-wrap justify-around gap-10 mb-16">
                <div className="w-full md:w-auto rounded-full h-32 w-32 bg-srv-dark border border-white/20 flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <div className="w-full md:w-auto rounded-full h-32 w-32 bg-srv-dark border border-white/20 flex items-center justify-center">
                  <span className="text-4xl">🔬</span>
                </div>
                <div className="w-full md:w-auto rounded-full h-32 w-32 bg-srv-dark border border-white/20 flex items-center justify-center">
                  <span className="text-4xl">🌐</span>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/who-we-are">
                  <Button variant="outline" className="border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Mission Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-10 font-mono">&lt;Our Mission/&gt;</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-card">
                  <div className="text-srv-yellow text-2xl mb-4">⚙️</div>
                  <p className="text-white text-lg">
                    We are building a new kind of financial institution at the intersection of{" "}
                    <span className="text-srv-pink">Venture, Science and Community</span>. 
                    We provide investment capital, community connections and hands-on support to seed founders.
                  </p>
                </div>
                
                <div className="glass-card">
                  <div className="text-srv-yellow text-2xl mb-4">💪</div>
                  <p className="text-white text-lg">
                    Our mission is to help technical founding teams building solutions based on{" "}
                    <span className="text-srv-pink">computer</span> or{" "}
                    <span className="text-srv-pink">physical sciences</span>{" "}
                    that are solving large-scale global problems.
                  </p>
                </div>
              </div>
              
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8 font-mono">&lt;We write 1st cheques in Next-Generation technology startups/&gt;</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="glass-card">
                    <h4 className="text-xl font-bold mb-3">[ <span className="text-srv-pink">Technical</span> ]</h4>
                    <p className="text-white">Leveraging in-house science and engineering expertise to challenge the status-quo</p>
                  </div>
                  
                  <div className="glass-card">
                    <h4 className="text-xl font-bold mb-3">&#123; <span className="text-srv-pink">Infrastructural</span> &#125;</h4>
                    <p className="text-white">They solve large scale global problems at a "picks and shovel" infrastructure level</p>
                  </div>
                  
                  <div className="glass-card">
                    <h4 className="text-xl font-bold mb-3">· <span className="text-srv-pink">Defensible</span> ·</h4>
                    <p className="text-white">They build fundamental hardware or low level software tech with a strong IP moat against challengers</p>
                  </div>
                  
                  <div className="glass-card">
                    <h4 className="text-xl font-bold mb-3">/ <span className="text-srv-pink">Trend-Setting</span> /</h4>
                    <p className="text-white">Disrupt internationally the way an industry operates (1B+ potential revenue in 10+ years)</p>
                  </div>
                  
                  <div className="glass-card">
                    <h4 className="text-xl font-bold mb-3">&lt; <span className="text-srv-pink">Global Impact</span> &gt;</h4>
                    <p className="text-white">Focused on solving key infrastructural challenges in areas like Computing, Climate or Health, and Defence</p>
                  </div>
                  
                  <div className="glass-card flex items-center justify-center p-10">
                    <Link to="/portfolio">
                      <Button className="bg-srv-yellow text-black hover:bg-srv-yellow/80">
                        View Our Portfolio
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
